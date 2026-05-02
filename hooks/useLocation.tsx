import { Cordinates } from "@/types/cordinates"
import * as Location from "expo-location"
import { useCallback, useState } from "react"

export const useLocation = () => {
    const [cords, setCords] = useState<Cordinates | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchLocation = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            // 2. Verificar permisos actuales de ubicación
            const { status, canAskAgain } = await Location.getForegroundPermissionsAsync();

            // En caso de que el usuario ya lo haya rechazado definitivamente
            if (status === Location.PermissionStatus.DENIED && !canAskAgain) {
                setError("Permiso permanentemente denegado en ajustes")
                setLoading(false)
                return;
            }

            // 3. Si no tenemos el permiso aún, lo SOLICITAMOS (request)
            if (status !== Location.PermissionStatus.GRANTED) {
                const { status: newStatus } = await Location.requestForegroundPermissionsAsync();

                if (newStatus !== Location.PermissionStatus.GRANTED) {
                    setError("Permiso denegado por el usuario")
                    setLoading(false)
                    return;
                }
            }

            // 4. Obtención de las coordenadas exactas del GPS
            const { coords } = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced // Balancea precisión y velocidad
            });

            // Guardamos como números (asumiendo que tu interfaz Cordinates usa numbers)
            setCords({
                latitude: String(coords.latitude),
                longitud: String(coords.longitude)
            })

        } catch (e) {
            console.warn(e)
            setError("Error al intentar obtener la ubicación")
        } finally {
            setLoading(false) // 5. Finalizamos la carga (pase lo que pase)
        }
    }, [])

    return {
        cords,
        error,
        loading,
        fetchLocation
    }
}