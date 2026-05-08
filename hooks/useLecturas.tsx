import { service_post_lectura } from "@/services/lecturas"
import { formatImageUpload } from "@/utils/formatImage"
import { CameraCapturedPicture } from "expo-camera"
import { useState } from "react"
import { useAuth } from "./useAuth"
import { useLocation } from "./useLocation"

export const useLecturas = () => {
    const [contratoId, setContratoId] = useState("")
    const [valor, setValor] = useState("")
    const [onModal, setOnModal] = useState(false)
    const [error, setError] = useState("")
    const [capture, setCapture,] = useState<CameraCapturedPicture | null>(null)
    const [loadiong, setLoadiong] = useState(false)

    //hooks
    const { user } = useAuth()
    const { cords, error: errorPermission, fetchLocation } = useLocation();

    // Estados para capturar errores de validación local
    const [errors, setErrors] = useState<{ contratoId?: string; valor?: string, photo?: any }>({});

    const validateForm = (): boolean => {
        const localErrors: { contratoId?: string; valor?: string, photo?: any } = {};
        // Validar ID de Contrato
        if (!contratoId.trim()) {
            localErrors.contratoId = "El código del contrato es obligatorio.";
        }
        // Validar Valor de la Lectura
        if (!valor.trim()) {
            localErrors.valor = "El valor de la lectura es obligatorio.";
        } else if (isNaN(Number(valor)) || Number(valor) <= 0) {
            localErrors.valor = "Ingresa un valor numérico válido y mayor a 0.";
        }
        if (!capture) {
            localErrors.photo = "La foto es obligatoria."
            console.warn("La foto es obligatoria.")
        }
        setErrors(localErrors)
        return Object.keys(localErrors).length === 0
    }

    const handleCreateLectura = async () => {
        setLoadiong(true)
        if (!validateForm()) return;
        try {
            await service_post_lectura(
                {
                    contratoId: contratoId,
                    foto: formatImageUpload(capture),
                    latitud: cords?.latitude || "",
                    longitud: cords?.longitud || "",
                    valorLectura: Number(valor)
                },
                user?.token || ""
            )
        } catch (e) {
            console.error(e)
        } finally {
            setLoadiong(false)
        }
    }
    return {
        contratoId,
        valor,
        onModal,
        error,
        capture,
        errors,
        errorPermission,
        loadiong,
        setContratoId, setValor, setOnModal, setError, setCapture,
        fetchLocation, handleCreateLectura, setErrors
    }
}