import { config } from "@/config/apis";
import { UNAUTHORIZED } from "@/constants/APIErrors";
import { Corte, CorteCreate } from "@/types/corte";

export async function service_post_cortes(corte: CorteCreate, token: string): Promise<Corte> {
    const formData = new FormData()

    if (corte.foto) {
        const file = {
            uri: corte.foto.uri,
            type: corte.foto.type,
            name: corte.foto.name,
        }
        formData.append('foto', file as any)
    }
    formData.append('contratoId', corte.contratoId)
    formData.append('motivo', corte.motivo)
    formData.append('latitud', corte.latitud)
    formData.append('longitud', corte.longitud)

    try {
        const request = await fetch(`${config.apiUrl}/api/cortes`, {
            headers: {
                'Cookie': `${token}`
            },
            method: 'POST',
            body: formData
        })
        const response = await request.json()
        if (request.status == 403) {
            throw new Error(response.error.message || UNAUTHORIZED)
        }
        if (!request.ok) {
            throw new Error(response.error.message)
        }

        return (response.data ?? response) as Corte
    } catch (error: any) {
        console.error('Error en service_post_cortes:', error.message)
        throw error
    }
}
