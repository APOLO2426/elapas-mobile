import ButtonComponent from "@/components/Button";
import { CameraModule } from "@/components/camera";
import InputComponent from "@/components/Input";
import { ModalConfirm } from "@/components/Modal";
import { useLecturas } from "@/hooks/useLecturas";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LecturaRuta } from "@/types/lectura";
import { ArrowLeft } from "lucide-react-native";
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    asignacion: LecturaRuta;
    onBack: () => void;
}

const LecturaForm: FC<Props> = ({ asignacion, onBack }) => {
    const colors = useThemeColor();
    const [camera, setCamera] = useState(false);

    const {
        valor,
        error,
        errors,
        onModal,
        loadiong,
        setValor,
        setOnModal,
        setErrors,
        setCapture,
        fetchLocation,
        handleCreateLectura,
    } = useLecturas(asignacion.contrato.id);

    useEffect(() => {
        fetchLocation();
    }, []);

    return (
        <View style={styles.container}>
            {/* Botón volver */}
            <TouchableOpacity style={styles.backRow} onPress={onBack}>
                <ArrowLeft size={20} color={colors.accent} />
                <Text style={[styles.backText, { color: colors.accent }]}>
                    Volver a asignaciones
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
                {asignacion.ultimaLectura !== null && (
                    <Text style={[styles.infoSub, { color: colors.muted }]}>
                        Última lectura: {asignacion.ultimaLectura}
                    </Text>
                )}
            </View>

            <InputComponent
                title="Valor de la lectura"
                value={valor}
                palceHodler="Ingresa el valor de la lectura"
                onChange={(text) => {
                    setValor(text);
                    if (errors.valor) setErrors({ ...errors, valor: undefined });
                }}
                error={errors.valor}
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
                text="Registrar lectura"
                loading={loadiong}
                onPress={handleCreateLectura}
            />

            <ModalConfirm
                title={error ? "Error" : "Éxito"}
                message={
                    error ? error : "La lectura fue registrada de manera correcta."
                }
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

export default LecturaForm;
