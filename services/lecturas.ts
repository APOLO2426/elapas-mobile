import { UNAUTHORIZED } from "@/constants/APIErrors";
import { Lectura, LecturaCreate } from "@/types/lectura";

export async function service_post_lectura(lectura: LecturaCreate, token: string): Promise<Lectura> {

    const request = await fetch('http://192.168.0.12:3000/api/lecturas', {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${token}`
        },
        method: 'POST',
        body: JSON.stringify(lectura)
    })
    const response = await request.json()
    if (request.status == 403) {
        throw new Error(response.error.message || UNAUTHORIZED)
    }
    if (!request.ok) {
        throw new Error(response.error.message)
    }

    return response as Lectura
}