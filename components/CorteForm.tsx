import ButtonComponent from "@/components/Button";
import { CameraModule } from "@/components/camera";
import InputComponent from "@/components/Input";
import { ModalConfirm } from "@/components/Modal";
import { useCortes } from "@/hooks/useCortes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LecturaRuta } from "@/types/lectura";
import { ArrowLeft } from "lucide-react-native";
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    asignacion: LecturaRuta;
    onBack: () => void;
}

const CorteForm: FC<Props> = ({ asignacion, onBack }) => {
    const colors = useThemeColor();
    const [camera, setCamera] = useState(false);

    const {
        motivo,
        error,
        errors,
        onModal,
        loading,
        setMotivo,
        setOnModal,
        setErrors,
        setCapture,
        fetchLocation,
        handleCreateCorte,
    } = useCortes(asignacion.contrato.id);

    useEffect(() => {
        fetchLocation();
    }, []);

    return (
        <View style={styles.container}>
            {/* Botón volver */}
            <TouchableOpacity style={styles.backRow} onPress={onBack}>
                <ArrowLeft size={20} color={colors.accent} />
                <Text style={[styles.backText, { color: colors.accent }]}>
                    Volver
                </Text>
            </TouchableOpacity>

            {/* Info del contrato */}
            <View style={[styles.infoBox, { borderColor: colors.border2 }]}>
                <Text style={[styles.infoTitle, { color: colors.text }]}>
                    Contrato #{asignacion.contrato.nroContrato}
                </Text>
                <Text style={[styles.infoSub, { color: colors.muted }]}>
                    Medidor: {asignacion.medidor.nroMedidor}
                </Text>
                <Text style={[styles.infoSub, { color: colors.muted }]}>
                    {asignacion.predio.direccion} — {asignacion.distrito.nombre}
                </Text>
            </View>

            <InputComponent
                title="Motivo del corte"
                value={motivo}
                palceHodler="Ingresa el motivo del corte"
                onChange={(text) => {
                    setMotivo(text);
                    if (errors.motivo) setErrors({ ...errors, motivo: undefined });
                }}
                error={errors.motivo}
            />

            <CameraModule
                setPhoto={setCapture}
                visible={camera}
                setVisible={setCamera}
            />

            {errors.photo && (
                <Text style={[styles.photoError, { color: colors.error }]}>
                    {errors.photo}
                </Text>
            )}

            <ButtonComponent
                text="Registrar corte"
                loading={loading}
                onPress={handleCreateCorte}
            />

            <ModalConfirm
                title={error ? "Error" : "Éxito"}
                message={error ? error : "El corte fue registrado de manera correcta."}
                action={() => {
                    setOnModal(false);
                    if (!error) onBack();
                }}
                visible={onModal}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
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
        marginBottom: 16,
        gap: 4,
    },
    infoTitle: {
        fontSize: 15,
        fontWeight: "700",
    },
    infoSub: {
        fontSize: 13,
    },
    photoError: {
        fontSize: 12,
        marginTop: -4,
        marginBottom: 4,
    },
});

export default CorteForm;
