import { useThemeColor } from "@/hooks/useThemeColor"
import { CameraCapturedPicture, CameraView } from "expo-camera"
import { Camera } from "lucide-react-native"
import { FC, useRef } from "react"
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ButtonComponent from "./Button"

interface Props {
    setPhoto: (photo: CameraCapturedPicture) => void
    visible: boolean
    setVisible: (state: boolean) => void
}
export const CameraModule: FC<Props> = ({ setPhoto, visible, setVisible }) => {
    const cameraRef = useRef<CameraView>(null)
    const colors = useThemeColor()

    //fucniones 
    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync()
            setPhoto(photo)
            setVisible(false)
        }
    }
    return (
        <View style={{ flex: 1 }}>
            {
                !visible ? (
                    <TouchableOpacity style={[
                        styles.button,
                        { borderColor: colors.border }
                    ]}
                        onPress={() => setVisible(true)}>
                        <Camera size={26} />
                        <Text style={[
                            styles.button_text,
                            { color: colors.text, fontWeight: 'bold' }
                        ]}>
                            Tomar fotograía
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <Modal visible={visible}>
                        <CameraView
                            ref={cameraRef}
                            style={{ flex: 1 }} />
                        <ButtonComponent
                            text="Tomar foto"
                            onPress={takePicture}
                        />

                        <ButtonComponent
                            text="Cerrar"
                            onPress={() => setVisible(false)}
                        />
                    </Modal>
                )
            }
        </View >
    )
}
const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderStyle: 'dashed',
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 7
    },
    button_text: {

    }
})