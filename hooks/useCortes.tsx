import { service_post_cortes } from "@/services/cortes"
import { formatImageUpload } from "@/utils/formatImage"
import { CameraCapturedPicture } from "expo-camera"
import { useState } from "react"
import { useAuth } from "./useAuth"
import { useLocation } from "./useLocation"

export const useCortes = (initialContratoId: string = "") => {
    const [contratoId] = useState(initialContratoId)
    const [motivo, setMotivo] = useState("")
    const [onModal, setOnModal] = useState(false)
    const [error, setError] = useState("")
    const [capture, setCapture] = useState<CameraCapturedPicture | null>(null)
    const [loading, setLoading] = useState(false)

    const { user } = useAuth()
    const { cords, fetchLocation } = useLocation()

    const [errors, setErrors] = useState<{ motivo?: string; photo?: string }>({})

    const validateForm = (): boolean => {
        const localErrors: { motivo?: string; photo?: string } = {}

        if (!motivo.trim()) {
            localErrors.motivo = "El motivo del corte es obligatorio."
        }
        if (!capture) {
            localErrors.photo = "La foto es obligatoria."
        }

        setErrors(localErrors)
        return Object.keys(localErrors).length === 0
    }

    const handleCreateCorte = async () => {
        setLoading(true)
        if (!validateForm()) {
            setLoading(false)
            return
        }
        try {
            await service_post_cortes(
                {
                    contratoId,
                    motivo,
                    foto: formatImageUpload(capture),
                    latitud: cords?.latitude || "",
                    longitud: cords?.longitud || "",
                },
                user?.token || ""
            )
            setError("")
            setOnModal(true)
        } catch (e: any) {
            setError(e.message || "Error al registrar el corte.")
            setOnModal(true)
        } finally {
            setLoading(false)
        }
    }

    return {
        motivo,
        onModal,
        error,
        capture,
        errors,
        loading,
        setMotivo,
        setOnModal,
        setCapture,
        setErrors,
        fetchLocation,
        handleCreateCorte,
    }
}
