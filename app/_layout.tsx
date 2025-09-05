import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (<Tabs>
          <Tabs.Screen
        name="contador"
        options={{
          title: 'Contador',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="sort-numeric-asc" color={color} />,
        }}
        />
        <Tabs.Screen
        name="index"
        options={{
          title: 'Tarjetas',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="print" color={color} />,
        }}
        />
        <Tabs.Screen
        name="Perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
        />
        </Tabs>);
}
