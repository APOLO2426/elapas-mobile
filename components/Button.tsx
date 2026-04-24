import { useThemeColor } from "@/hooks/useThemeColor"
import { FC } from "react"
import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native"

interface Props {
    text: string
    onPress: () => void
    disable?: boolean
    loading?: boolean
    style?: StyleProp<ViewStyle>
}

const ButtonComponent: FC<Props> = ({ text, onPress, loading, disable, style }) => {
    const colors = useThemeColor()

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disable || loading}
            style={[
                styles.body,
                { backgroundColor: colors.muted },
                style
            ]}
        >
            {
                loading ? (
                    <ActivityIndicator color={colors.icon} />
                ) : (
                    <Text style={
                        [
                            styles.tetx,
                            { color: "#FFF" }
                        ]
                    }>
                        {text}
                    </Text>
                )
            }
        </TouchableOpacity >
    )
}
const styles = StyleSheet.create({
    body: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 7,
        paddingVertical: 10,
        marginVertical: 7
    },
    tetx: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})
export default ButtonComponent