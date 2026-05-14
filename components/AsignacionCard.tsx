import { useThemeColor } from "@/hooks/useThemeColor";
import { LecturaRuta } from "@/types/lectura";
import { Hash, Layers, MapPin } from "lucide-react-native";
import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    asignacion: LecturaRuta;
    onPress: (asignacion: LecturaRuta) => void;
}

const AsignacionCard: FC<Props> = ({ asignacion, onPress }) => {
    const colors = useThemeColor();

    const estadoActivo = asignacion.contrato.estado === "ACTIVO";
    const lecturaRealizada = asignacion.estadoLectura === "leido";

    return (
        <TouchableOpacity
            style={[styles.card, { borderColor: colors.border2, backgroundColor: colors.background }]}
            onPress={() => onPress(asignacion)}
            activeOpacity={0.75}
        >
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.accent }]}>
                <Text style={[styles.headerText, { color: colors.textDefault }]}>
                    Contrato #{asignacion.contrato.nroContrato}
                </Text>
                <View style={[
                    styles.badge,
                    { backgroundColor: lecturaRealizada ? "#16a34a" : "#f59e0b" }
                ]}>
                    <Text style={styles.badgeText}>
                        {asignacion.estadoLectura}
                    </Text>
                </View>
            </View>

            {/* Body */}
            <View style={styles.body}>
                <View style={styles.row}>
                    <MapPin size={16} color={colors.muted} />
                    <Text style={[styles.label, { color: colors.muted }]}>Dirección:</Text>
                    <Text style={[styles.value, { color: colors.text }]} numberOfLines={1}>
                        {asignacion.predio.direccion}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Layers size={16} color={colors.muted} />
                    <Text style={[styles.label, { color: colors.muted }]}>Distrito:</Text>
                    <Text style={[styles.value, { color: colors.text }]}>
                        {asignacion.distrito.nombre} ({asignacion.distrito.codigo})
                    </Text>
                </View>

                <View style={styles.row}>
                    <Hash size={16} color={colors.muted} />
                    <Text style={[styles.label, { color: colors.muted }]}>Medidor:</Text>
                    <Text style={[styles.value, { color: colors.text }]}>
                        {asignacion.medidor.nroMedidor}
                    </Text>
                </View>

                {asignacion.ultimaLectura !== null && (
                    <View style={styles.row}>
                        <Text style={[styles.label, { color: colors.muted }]}>Última lectura:</Text>
                        <Text style={[styles.value, { color: colors.text }]}>
                            {asignacion.ultimaLectura}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 12,
        overflow: "hidden",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 15,
        fontWeight: "700",
    },
    badge: {
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    badgeText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "600",
    },
    body: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        gap: 6,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
    },
    value: {
        fontSize: 13,
        flexShrink: 1,
    },
});

export default AsignacionCard;
