import ButtonComponent from '@/components/Button';
import DefaultScreen from '@/components/Default-screen';
import { useAuth } from '@/hooks/useAuth';
import { useThemeColor } from '@/hooks/useThemeColor';
import { service_get_mi_ruta } from '@/services/lecturas';
import { LecturaRuta } from '@/types/lectura';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function ResumenScreen() {
    const { user, logout } = useAuth();
    const colors = useThemeColor();

    const [asignaciones, setAsignaciones] = useState<LecturaRuta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRuta();
    }, []);

    const fetchRuta = async () => {
        if (!user) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await service_get_mi_ruta(user.token);
            setAsignaciones(data);
        } catch (e: any) {
            setError(e.message || "Error al cargar el resumen.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (e) {
            console.log(e);
        }
    };

    const realizadas = asignaciones.filter(a => a.estadoLectura === "leido").length;
    const pendientes = asignaciones.filter(a => a.estadoLectura === "pendiente").length;

    return (
        <DefaultScreen>
            {/* Tarjetas de resumen */}
            {!loading && !error && asignaciones.length > 0 && (
                <View style={styles.statsRow}>
                    <View style={[styles.statCard, { backgroundColor: colors.accent }]}>
                        <Text style={[styles.statNumber, { color: colors.textDefault }]}>
                            {asignaciones.length}
                        </Text>
                        <Text style={[styles.statLabel, { color: colors.textDefault }]}>
                            Total
                        </Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: "#16a34a" }]}>
                        <Text style={[styles.statNumber, { color: "#fff" }]}>
                            {realizadas}
                        </Text>
                        <Text style={[styles.statLabel, { color: "#fff" }]}>
                            Realizadas
                        </Text>
                    </View>
                    <View style={[styles.statCard, { backgroundColor: "#f59e0b" }]}>
                        <Text style={[styles.statNumber, { color: "#fff" }]}>
                            {pendientes}
                        </Text>
                        <Text style={[styles.statLabel, { color: "#fff" }]}>
                            Pendientes
                        </Text>
                    </View>
                </View>
            )}

            {/* Lista */}
            {loading && (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color={colors.accent} />
                    <Text style={[styles.loadingText, { color: colors.muted }]}>
                        Cargando resumen...
                    </Text>
                </View>
            )}

            {!loading && error && (
                <View style={styles.centered}>
                    <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
                </View>
            )}

            {!loading && !error && asignaciones.length > 0 && (
                <FlatList
                    data={asignaciones}
                    keyExtractor={(item) => item.contrato.id}
                    renderItem={({ item }) => (
                        <View style={[styles.row, { borderColor: colors.border2 }]}>
                            <View style={styles.rowInfo}>
                                <Text style={[styles.rowTitle, { color: colors.text }]}>
                                    #{item.contrato.nroContrato}
                                </Text>
                                <Text style={[styles.rowSub, { color: colors.muted }]} numberOfLines={1}>
                                    {item.predio.direccion}
                                </Text>
                            </View>
                            <View style={[
                                styles.badge,
                                { backgroundColor: item.estadoLectura === "leido" ? "#16a34a" : "#f59e0b" }
                            ]}>
                                <Text style={styles.badgeText}>{item.estadoLectura}</Text>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                />
            )}

            {!loading && !error && asignaciones.length === 0 && (
                <View style={styles.centered}>
                    <Text style={[styles.emptyText, { color: colors.muted }]}>
                        No hay asignaciones para mostrar.
                    </Text>
                </View>
            )}

            <ButtonComponent
                text="Cerrar sesión"
                onPress={handleLogout}
            />
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
    statsRow: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 16,
    },
    statCard: {
        flex: 1,
        borderRadius: 10,
        padding: 12,
        alignItems: "center",
        gap: 4,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: "800",
    },
    statLabel: {
        fontSize: 12,
        fontWeight: "600",
    },
    loadingText: { fontSize: 14 },
    errorText: { fontSize: 14, textAlign: "center" },
    emptyText: { fontSize: 14, textAlign: "center" },
    list: { paddingBottom: 16 },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    rowInfo: {
        flex: 1,
        gap: 2,
        marginRight: 8,
    },
    rowTitle: {
        fontSize: 14,
        fontWeight: "700",
    },
    rowSub: {
        fontSize: 12,
    },
    badge: {
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    badgeText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "600",
    },
});
