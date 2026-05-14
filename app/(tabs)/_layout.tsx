import { useThemeColor } from '@/hooks/useThemeColor';
import { Tabs } from 'expo-router';
import { BookSearch, HouseIcon } from 'lucide-react-native';

export default function TabLayout() {
    const colors = useThemeColor();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.tint,
            }}
        >
            <Tabs.Screen
                name="lecturas"
                options={{
                    title: 'Asignaciones',
                    headerTitle: 'Mis asignaciones',
                    tabBarIcon: ({ color }) => <BookSearch color={color} />,
                    headerStyle: { backgroundColor: colors.border },
                    headerTitleStyle: { color: colors.textDefault },
                }}
            />
            <Tabs.Screen
                name="resumen"
                options={{
                    title: 'Resumen',
                    headerTitle: 'Resumen',
                    tabBarIcon: ({ color }) => <HouseIcon color={color} />,
                    headerStyle: { backgroundColor: colors.border },
                    headerTitleStyle: { color: colors.textDefault },
                }}
            />
            <Tabs.Screen
                name="cortes"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
