import Colors from "@/constants/Colors"
import { useColorScheme } from "react-native"

export const useThemeColor = () => {
    const theme = useColorScheme()
    const colors = Colors[theme ?? "dark"] || Colors.light
    return colors 
}