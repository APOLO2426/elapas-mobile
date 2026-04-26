
import { useThemeColor } from "@/hooks/useThemeColor"
import { FC, useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

interface Props {
    title: string
    palceHodler: string
    value: string
    onChange: (value: string) => void
    error?: string
}
const InputComponent: FC<Props> = ({ title, palceHodler, value, error, onChange }) => {
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
            <TextInput
                style={[
                    styles.input,
                    { borderColor: colors.border, color: colors.text },
                    isFocused && { borderColor: colors.border },
                    !!error && { borderColor: colors.error }
                ]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={palceHodler}
                placeholderTextColor={colors.muted}
                value={value}
                onChangeText={onChange}
            />
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


export default InputComponent