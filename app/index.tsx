import ButtonComponent from "@/components/Button"
import InputComponent from "@/components/Input"
import InputPassword from "@/components/Input-password"
import { useThemeColor } from "@/hooks/useThemeColor"
import { AuthService } from "@/services/auth"
import { useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"

const Login = () => {
    const colors = useThemeColor()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [security, setSecurity] = useState(true)
    async function handleLogin() {
        AuthService({ email: "alvaro@gmail.com", password: "password123" })
    }
    return (
        <View style={[{ backgroundColor: colors.background }, styles.conteiner]}>

            <View style={{alignItems:'center'}}>
                <Image source={require('@/assets/images/elapas.png')} />
                <Text style={[styles.name, [{ color: colors.text }]]}>
                    Elapas
                </Text>
            </View>
            <View style={[{ width: '100%', backgroundColor: "#FFF", borderRadius: 7, padding: 20 }]}>
                <InputComponent
                    title="Email"
                    value={username}
                    onChange={setUsername}
                    palceHodler="Ingrese su usuario"
                />

                <InputPassword
                    title="Password"
                    value={password}
                    onChange={setPassword}
                    palceHodler="Ingrese su contraseña"
                    security={security}
                    changeSecurity={setSecurity}
                />

                <ButtonComponent
                    text="Ingresar"
                    loading={false}
                    onPress={handleLogin}
                />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical:50,
        gap:24
    },
    name: {
        fontWeight: 'bold',
        fontSize: 26
    }
})

export default Login