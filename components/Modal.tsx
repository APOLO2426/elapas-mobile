import { useThemeColor } from "@/hooks/useThemeColor"
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface Props {
    title: string,
    message: string
    visible: boolean
    action: () => void
}

export const ModalConfirm = ({ title, message, visible, action }: Props) => {
    const colors = useThemeColor()
    return (
        <Modal visible={visible} transparent>
            <View style={styles.body}>
                <View style={
                    [
                        styles.card,
                        { backgroundColor: colors.accent }
                    ]
                }>
                    <Text style={[
                        styles.title,
                        { color: colors.textDefault }
                    ]}>
                        {title}
                    </Text>
                    <Text style={[
                        styles.message,
                        { color: colors.textDefault }
                    ]}>
                        {message}
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: "#fff" }
                        ]}
                        onPress={action}>
                        <Text>
                            Aceptar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    card: {
        flex: 0,
        flexDirection: 'column',
        height: '40%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal:14,
        borderTopLeftRadius: 14,
        borderEndStartRadius: 14,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16
    },
    message: {
        fontSize: 16,
        fontWeight: 'medium',
        marginBottom: 16,
        textAlign:'center'
    },
    button: {
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 300,
        padding: 7,
    }
})