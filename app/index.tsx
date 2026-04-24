import ButtonComponent from "@/components/Button"
import InputComponent from "@/components/Input"
import InputPassword from "@/components/Input-password"
import { useAuth } from "@/hooks/useAuth"
import { useThemeColor } from "@/hooks/useThemeColor"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const Login = () => {
    //hooks
    const colors = useThemeColor()
    const { login } = useAuth()
    const router = useRouter()
    //variables 
    const [username, setUsername] = useState("test@example.com")
    const [password, setPassword] = useState("password123")
    const [security, setSecurity] = useState(true)
    const [isLoading, setIsLoadiong] = useState(false)
    const [error, setError] = useState('')

    async function handleLogin() {
        setIsLoadiong(true)
        try {
            await login({ email: username, password })
            router.replace('/(tabs)')
        } catch (e) {
            setError(String(e))
        }
        finally {
            setIsLoadiong(false)
        }
    }
    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps={'handled'}
            enableOnAndroid
            contentContainerStyle={{ flex: 1 }}
            scrollEnabled>

            <View style={[{ backgroundColor: colors.background }, styles.conteiner]}>

                <View style={[styles.card]}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('@/assets/images/elapas.png')} />
                        <Text style={[styles.name, [{ color: colors.text }]]}>
                            Elapas
                        </Text>
                    </View>
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
                        disable={isLoading}
                    />
                    {
                        !!error && (
                            <View style={[styles.message, { backgroundColor: colors.error }]}>
                                <Text style={[{ color: "#FFF" }]}>
                                    {error}
                                </Text>
                            </View>)
                    }
                </View>

            </View>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 14,
    },
    card: {
        width: '100%',
        backgroundColor: "#FFF",
        borderRadius: 7,
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    message: {
        padding: 7,
        borderRadius: 7,
        alignItems: 'center'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 26
    }
})

export default Login