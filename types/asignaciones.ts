export type Asigancion = {
    asignacion: {
        id: string,
        brigadistaId: string,
        contratoId: string,
        createdAt: string
    },
    contrato: {
        id: string,
        nroContrato: string,
        usuarioId: string,
        predioId: string,
        medidorId: string,
        estado: boolean,
        createdAt: string,
        updatedAt: string
    },
    predio: {
        id: string,
        distritoId: string,
        direccion: string,
        latitud: string,
        longitud: string,
        createdAt: string
    },
    distrito: {
        id: string,
        nombre: string,
        codigo: string
    },
    medidor: {
        id: string,
        nroMedidor: string,
        contratoId: string,
        createdAt: string
    }
}