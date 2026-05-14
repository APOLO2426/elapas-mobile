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


export type LecturaRuta = {
    contrato: {
        id: string
        nroContrato: string
        usuarioId: string
        predioId: string
        medidorId: string
        estado: string
        createdAt: string
        updatedAt: string
    }
    distrito: {
        id: string
        nombre: string
        codigo: string
    }
    predio: {
        id: string
        distritoId: string
        direccion: string
        latitud: string
        longitud: string
        createdAt: string
    }
    medidor: {
        id: string
        nroMedidor: string
        contratoId: string
        createdAt: string
    }
    estadoLectura: "pendiente" | "leido"
    ultimaLectura: number
}
