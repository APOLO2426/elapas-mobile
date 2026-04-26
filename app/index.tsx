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
    //funciones 
    async function handleLogin() {
        setIsLoadiong(true)
        try {
            await login({ email: username, password })
            router.replace('/(tabs)/resumen')
        } catch (e) {
            setError(String(e))
        }
        finally {
            setIsLoadiong(false)
            setUsername('')
            setPassword('')
        }
    }
    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps={'handled'}
            enableOnAndroid
            contentContainerStyle={{ flex: 1 }}
            scrollEnabled>

            <View style={[
                styles.conteiner,
                { backgroundColor: colors.background }
            ]}>

                <View style={{ alignItems: 'center' }}>
                    <Image source={require('@/assets/images/elapas.png')} />
                    <Text style={[
                        styles.name,
                        { color: colors.text }
                    ]}>
                        Elapas
                    </Text>
                    <Text style={[
                        styles.description,
                        { color: colors.accent }
                    ]}>
                        Acceso Brigadista
                    </Text>
                </View>

                <View style={[
                    styles.card,
                    {
                        borderColor: colors.border2,
                    }
                ]}>
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
                        loading={isLoading}
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
        paddingHorizontal: 14,
    },
    card: {
        borderWidth: 0.5,
        width: '100%',
        gap: 7,
        borderRadius: 7,
        paddingHorizontal: 20,
        paddingVertical: 40,
        marginVertical: 40
    },
    message: {
        padding: 7,
        borderRadius: 7,
        alignItems: 'center'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 26
    },
    description: {
        fontWeight: 'medium',
        fontSize: 20
    }
})

export default Login