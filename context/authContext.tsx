import { service_login, service_logout } from "@/services/auth"
import { Auth, ResponseAuth } from "@/types/auth"
import { createContext, ReactNode, useState } from "react"

type AuthContextType = {
    user: ResponseAuth | null
    isAuthenticate: boolean
    login: (data_auth: Auth) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticate: false,
    login: async (data_auth: Auth) => { },
    logout: async () => { }
})


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<ResponseAuth | null>(null)

    const login = async (data_auth: Auth) => {
        const data = await service_login(data_auth)
        setUser(data)
    }

    const logout = async () => {
        await service_logout()
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticate: !!user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}