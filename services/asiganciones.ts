
// export async function service_get_asoganciones(token: string, id: string): Promise<Asigancion[]> {

//     const request = await fetch(`${config.apiUrl}/api/asignaciones/brigadista/${id}`, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Cookie': `${token}`
//         },
//         method: 'GET',
//     })
//     const response = await request.json()
//     if (request.status == 403) {
//         throw new Error(response.error.message || UNAUTHORIZED)
//     }
//     if (!request.ok) {
//         throw new Error(response.error.message)
//     }

//     return response as Asigancion[]
// }