import ButtonComponent from '@/components/Button';
import DefaultScreen from '@/components/Default-screen';
import { useAuth } from '@/hooks/useAuth';
import { StyleSheet } from 'react-native';


export default function TabTwoScreen() {

    //hooks
    const { logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <DefaultScreen>
            <ButtonComponent
                text='Cerrar sesión'
                onPress={handleLogout}
            />
        </DefaultScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
