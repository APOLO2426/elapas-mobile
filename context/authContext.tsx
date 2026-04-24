import { User } from "@/models/auth"
import { createContext, ReactNode, useState } from "react"

type AuthContextType = {
    user: User | null
    isAuthenticate: boolean
    login: () => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticate: false,
    login: async () => { },
    logout: async () => { }
})


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = async () => { }
    const logout = async () => { }

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