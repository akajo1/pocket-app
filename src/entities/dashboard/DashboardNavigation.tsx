import { pallete } from "@/src/utils/pallete";
import { Tabs } from "expo-router";
import { HistoryIcon, User, Users, Wallet } from "lucide-react-native";

export default function DashboardNavigation() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: pallete.blue,
        tabBarInactiveTintColor: pallete.grey,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Portemonnaie",
          tabBarIcon: ({ size, color }) => <Wallet size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="children"
        options={{
          title: "Dépendant",
          tabBarIcon: ({ size, color }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Mes depenses",
          tabBarIcon: ({ size, color }) => (
            <HistoryIcon size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
