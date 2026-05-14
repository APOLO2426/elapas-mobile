import AsignacionCard from "@/components/AsignacionCard";
import CorteForm from "@/components/CorteForm";
import DefaultScreen from "@/components/Default-screen";
import LecturaForm from "@/components/LecturaForm";
import { useAuth } from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { service_get_mi_ruta } from "@/services/lecturas";
import { LecturaRuta } from "@/types/lectura";
import { ScissorsIcon, Zap } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
   ActivityIndicator,
   FlatList,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";

type Vista = "lista" | "seleccion" | "lectura" | "corte";

export default function LecturasScreen() {
   const { user } = useAuth();
   const colors = useThemeColor();

   const [asignaciones, setAsignaciones] = useState<LecturaRuta[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [selected, setSelected] = useState<LecturaRuta | null>(null);
   const [vista, setVista] = useState<Vista>("lista");

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
         setError(e.message || "Error al cargar las asignaciones.");
      } finally {
         setLoading(false);
      }
   };

   const handleSelectCard = (asignacion: LecturaRuta) => {
      setSelected(asignacion);
      setVista("seleccion");
   };

   const handleBack = () => {
      setSelected(null);
      setVista("lista");
   };

   // Vista: formulario lectura
   if (vista === "lectura" && selected) {
      return (
         <DefaultScreen>
            <LecturaForm
               asignacion={selected}
               onBack={() => setVista("seleccion")}
            />
         </DefaultScreen>
      );
   }

   // Vista: formulario corte
   if (vista === "corte" && selected) {
      return (
         <DefaultScreen>
            <CorteForm
               asignacion={selected}
               onBack={() => setVista("seleccion")}
            />
         </DefaultScreen>
      );
   }

   // Vista: selección corte o lectura
   if (vista === "seleccion" && selected) {
      return (
         <DefaultScreen>
            {/* Botón volver */}
            <TouchableOpacity
               style={styles.backRow}
               onPress={handleBack}
            >
               <Text style={[styles.backText, { color: colors.accent }]}>
                  Volver a asignaciones
               </Text>
            </TouchableOpacity>

            {/* Info contrato */}
            <View style={[styles.infoBox, { borderColor: colors.border2 }]}>
               <Text style={[styles.infoTitle, { color: colors.text }]}>
                  Contrato #{selected.contrato.nroContrato}
               </Text>
               <Text style={[styles.infoSub, { color: colors.muted }]}>
                  {selected.predio.direccion} — {selected.distrito.nombre}
               </Text>
            </View>

            <Text style={[styles.seleccionLabel, { color: colors.muted }]}>
               ¿Qué deseas registrar?
            </Text>

            {/* Opción Lectura */}
            <TouchableOpacity
               style={[styles.opcionCard, { borderColor: colors.border }]}
               onPress={() => setVista("lectura")}
               activeOpacity={0.75}
            >
               <View style={[styles.opcionIcon, { backgroundColor: colors.accent }]}>
                  <Zap size={28} color={colors.textDefault} />
               </View>
               <View style={styles.opcionTexts}>
                  <Text style={[styles.opcionTitle, { color: colors.text }]}>
                     Registrar lectura
                  </Text>
                  <Text style={[styles.opcionSub, { color: colors.muted }]}>
                     Ingresa el valor del medidor y toma una foto
                  </Text>
               </View>
            </TouchableOpacity>

            {/* Opción Corte */}
            <TouchableOpacity
               style={[styles.opcionCard, { borderColor: colors.border }]}
               onPress={() => setVista("corte")}
               activeOpacity={0.75}
            >
               <View style={[styles.opcionIcon, { backgroundColor: "#dc2626" }]}>
                  <ScissorsIcon size={28} color="#fff" />
               </View>
               <View style={styles.opcionTexts}>
                  <Text style={[styles.opcionTitle, { color: colors.text }]}>
                     Registrar corte
                  </Text>
                  <Text style={[styles.opcionSub, { color: colors.muted }]}>
                     Indica el motivo del corte y toma una foto
                  </Text>
               </View>
            </TouchableOpacity>
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
                     onPress={handleSelectCard}
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
   loadingText: { fontSize: 14 },
   errorText: { fontSize: 14, textAlign: "center" },
   emptyText: { fontSize: 14, textAlign: "center" },
   list: { paddingBottom: 20 },
   backRow: {
      marginBottom: 16,
   },
   backText: {
      fontSize: 14,
      fontWeight: "600",
   },
   infoBox: {
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      marginBottom: 24,
      gap: 4,
   },
   infoTitle: {
      fontSize: 15,
      fontWeight: "700",
   },
   infoSub: {
      fontSize: 13,
   },
   seleccionLabel: {
      fontSize: 13,
      fontWeight: "600",
      marginBottom: 12,
      textTransform: "uppercase",
      letterSpacing: 0.5,
   },
   opcionCard: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
      gap: 14,
   },
   opcionIcon: {
      width: 52,
      height: 52,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
   },
   opcionTexts: {
      flex: 1,
      gap: 4,
   },
   opcionTitle: {
      fontSize: 15,
      fontWeight: "700",
   },
   opcionSub: {
      fontSize: 13,
   },
});
