import AsignacionCard from "@/components/AsignacionCard";
import DefaultScreen from "@/components/Default-screen";
import LecturaForm from "@/components/LecturaForm";
import { useAuth } from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { service_get_mi_ruta } from "@/services/lecturas";
import { LecturaRuta } from "@/types/lectura";
import { useEffect, useState } from "react";
import {
   ActivityIndicator,
   FlatList,
   StyleSheet,
   Text,
   View,
} from "react-native";

export default function LecturasScreen() {
   const { user } = useAuth();
   const colors = useThemeColor();

   const [asignaciones, setAsignaciones] = useState<LecturaRuta[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [selected, setSelected] = useState<LecturaRuta | null>(null);

   useEffect(() => {
      fetchRuta();
   }, []);

   const fetchRuta = async () => {
      if (!user) {
         setLoading(false);
         setError("No hay sesión activa.");
         return;
      }
      setLoading(true);
      setError(null);
      try {
         const data = await service_get_mi_ruta(user.token);
         setAsignaciones(data);
      } catch (e: any) {
         console.error("fetchRuta error:", e.message);
         setError(e.message || "Error al cargar las asignaciones.");
      } finally {
         setLoading(false);
      }
   };

   // Vista: formulario de lectura
   if (selected) {
      return (
         <DefaultScreen>
            <LecturaForm
               asignacion={selected}
               onBack={() => setSelected(null)}
            />
         </DefaultScreen>
      );
   }

   // Vista: lista de asignaciones
   return (
      <DefaultScreen>
         {loading && (
            <View style={styles.centered}>
               <ActivityIndicator size="large" color={colors.accent} />
               <Text style={[styles.loadingText, { color: colors.muted }]}>
                  Cargando asignaciones...
               </Text>
            </View>
         )}

         {!loading && error && (
            <View style={styles.centered}>
               <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            </View>
         )}

         {!loading && !error && asignaciones.length === 0 && (
            <View style={styles.centered}>
               <Text style={[styles.emptyText, { color: colors.muted }]}>
                  No tienes asignaciones pendientes.
               </Text>
            </View>
         )}

         {!loading && !error && asignaciones.length > 0 && (
            <FlatList
               data={asignaciones}
               keyExtractor={(item) => item.contrato.id}
               renderItem={({ item }) => (
                  <AsignacionCard
                     asignacion={item}
                     onPress={(a) => setSelected(a)}
                  />
               )}
               showsVerticalScrollIndicator={false}
               contentContainerStyle={styles.list}
            />
         )}
      </DefaultScreen>
   );
}

const styles = StyleSheet.create({
   centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
   },
   loadingText: {
      fontSize: 14,
   },
   errorText: {
      fontSize: 14,
      textAlign: "center",
   },
   emptyText: {
      fontSize: 14,
      textAlign: "center",
   },
   list: {
      paddingBottom: 20,
   },
});
