import { Stack } from 'expo-router/stack';

export default function SendMoneyLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="sendMoneyToWallet"
                options={{
                    title: "Envoie d'argent",
                    headerBackTitle: 'Retour'
                }}
            />
            <Stack.Screen
                name="loadWallet"
                options={{
                    title: "Approvisionnement",
                    headerBackTitle: 'Retour'
                }}
            />
            <Stack.Screen
                name="withdrawCash"
                options={{
                    title: "Retrait",
                    headerBackTitle: 'Retour'
                }}
            />
        </Stack>
    );
}