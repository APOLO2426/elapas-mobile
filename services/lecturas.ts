import { config } from "@/config/apis";
import { UNAUTHORIZED } from "@/constants/APIErrors";
import { Lectura, LecturaCreate } from "@/types/lectura";

export async function service_post_lectura(lectura: LecturaCreate, token: string): Promise<Lectura> {
    const formData = new FormData()

    if (lectura.foto) {
        const file = {
            uri: lectura.foto.uri,
            type: lectura.foto.type,
            name: lectura.foto.name
        };
        formData.append('foto', file as any);
    }
    formData.append('contratoId', lectura.contratoId)
    formData.append('latitud', lectura.latitud)
    formData.append('longitud', lectura.longitud)
    formData.append('valorLectura', String(lectura.valorLectura))

    try {
        const request = await fetch(`${config.apiUrl}:3000/api/lecturas`, {
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

        return response as Lectura
    } catch (error: any) {
        console.error('Error en service_post_lectura:', error.message);
        throw error;
    }
}