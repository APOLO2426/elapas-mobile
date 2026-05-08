import { config } from "@/config/apis";
import { UNAUTHORIZED } from "@/constants/APIErrors";
import { Corte, CorteCreate } from "@/types/corte";

export async function service_post_cortes(lectura: CorteCreate, token: string): Promise<Corte> {

    const request = await fetch(`${config.apiUrl}/api/cortes`, {
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

    return response as Corte
}