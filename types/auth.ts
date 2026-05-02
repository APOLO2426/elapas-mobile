export type Auth = {
    email: string
    password: string
}

export type User = {
    name: string,
    email: string,
    emailVerified: boolean,
    image: null,
    createdAt: string,
    updatedAt: string,
    role: string,
    estado: boolean,
    id: string
}

export type ResponseAuth = {
    redirect: boolean,
    token: string,
    user: User
}