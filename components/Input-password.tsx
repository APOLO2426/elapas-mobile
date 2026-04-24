import { useThemeColor } from "@/hooks/useThemeColor"
import { EyeClosed, EyeIcon } from "lucide-react-native"
import { FC, useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

interface Props {
    title: string
    palceHodler: string
    value: string
    onChange: (value: string) => void
    error?: string
    security: boolean
    changeSecurity: (state: boolean) => void
}
const InputPassword: FC<Props> = ({ title, palceHodler, value, error, security = true, onChange, changeSecurity }) => {
    const [isFocused, setIsFocused] = useState(false)
    const colors = useThemeColor()

    return (
        <View style={[
            styles.body
        ]}>
            <Text
                style={[
                    styles.title,
                    { color: colors.text }
                ]}>
                {title}
            </Text>
            <View style={[
                styles.input,
                { borderColor: colors.accent, },
                isFocused && { borderColor: colors.accent, },
                !!error && { borderColor: colors.error }
            ]}>
                <TextInput style={{ color: colors.text, flex: 1 }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={palceHodler}
                    placeholderTextColor={colors.muted}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={security}
                />
                <TouchableOpacity onPress={() => { changeSecurity(!security) }}>
                    {
                        security ? (<EyeClosed color={colors.icon} />) : (<EyeIcon color={colors.icon} />)
                    }
                </TouchableOpacity>
            </View>
            {
                !!error &&
                <Text style={[
                    styles.errorText,
                    { color: colors.error }
                ]}>
                    {error}
                </Text>
            }

        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 0,
        width: '100%',
        marginVertical: 7
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 7

    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 7
    },
    errorText: {
        fontWeight: '600'
    }
})


export default InputPassword