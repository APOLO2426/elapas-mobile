export type Lectura = {
    id: string
    contratoId: string
    brigadistaId: string
    valorLectura: number
    foto: any
    latitud: string
    longitud: string
    fechaLectura: string
    createAt: string
}

export type LecturaCreate = Omit<Lectura, "id" | "brigadistaId" | "fechaLectura" | "createAt">



