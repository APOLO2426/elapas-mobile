export type Corte = {
    id: string,
    contratoId: string,
    brigadistaId: string,
    motivo: string,
    foto: string,
    latitud: string
    longitud: string
    fechaCorte: string
    estado: string
    createAt: string
}

export type CorteCreate = Omit<Corte, "id" | "brigadistaId" | "fechaCorte" | "estado" | "createAt" | "foto"> & {
    foto: {
        uri: string
        name: string
        type: string
    } | null
}