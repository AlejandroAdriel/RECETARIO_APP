import { Tabs } from "expo-router";
import { COLORS } from "../../src/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          backgroundColor: COLORS.paper,
          borderTopColor: COLORS.honey,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritos",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Cuenta",
        }}
      />
    </Tabs>
  );
}
