import { Stack } from "expo-router/stack";

export default function ChildrenLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="confirmationScreen"
                options={{ headerShown: false,}}
            />
            <Stack.Screen
                name="receiptScreen"
                options={{ headerShown: false,}}
            />
        </Stack>
    );
}
