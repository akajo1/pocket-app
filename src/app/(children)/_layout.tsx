import { Stack } from "expo-router/stack";

export default function ChildrenLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="createChildren"
        options={{
          title: "Ajouter un dependant",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
