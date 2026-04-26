import { useThemeColor } from "@/hooks/useThemeColor"
import { ReactNode } from "react"
import { StyleSheet, View } from "react-native"

const DefaultScreen = ({ children }: { children: ReactNode }) => {
    //hooks
    const colors = useThemeColor()

    return (
        <View style={[
            styles.body,
            { backgroundColor: colors.background }
        ]}>
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: 14
    }
})
export default DefaultScreen