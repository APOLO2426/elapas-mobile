import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { useThemeColor } from '@/hooks/useThemeColor';
import { BookSearch, HouseIcon, ScissorsIcon } from 'lucide-react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colors = useThemeColor();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
      }}>
      <Tabs.Screen
        name="lecturas"
        options={{
          title: 'Lecturas',
          headerTitle: 'Registrar lecturas',
          tabBarIcon: ({ color }) => <BookSearch color={color} />,
          headerRight: () => (<></>),
          headerStyle: { backgroundColor: colors.border },
          headerTitleStyle: { color: colors.textDefault }

        }}
      />
      <Tabs.Screen
        name="resumen"
        options={{
          headerTitle: "Resumen",
          title: 'Resumen',
          tabBarIcon: ({ color }) => <HouseIcon color={color} />,
          headerRight: () => (<></>),
          headerStyle: { backgroundColor: colors.border },
          headerTitleStyle: { color: colors.textDefault }
        }}
      />
      <Tabs.Screen
        name="cortes"
        options={{
          headerTitle: "Resgitrar cortes",
          title: 'Cortes',
          tabBarIcon: ({ color }) => <ScissorsIcon color={color} />,
          headerRight: () => (<></>),
          headerStyle: { backgroundColor: colors.border },
          headerTitleStyle: { color: colors.textDefault }
        }}
      />

    </Tabs>
  );
}
