import { Stack } from 'expo-router/stack';

export default function ProfileLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>

            <Stack.Screen
                name="personal"
                options={{
                    title: 'Informations personnelles',
                    headerBackTitle: 'Retour'
                }}
            />
            <Stack.Screen
                name="security"
                options={{
                    title: 'Sécurité',
                    headerBackTitle: 'Retour'
                }}
            />
            <Stack.Screen
                name="notifications"
                options={{
                    title: 'Notifications',
                    headerBackTitle: 'Retour'
                }}
            />

            <Stack.Screen
                name="help"
                options={{
                    title: 'Centre d\'aide',
                    headerBackTitle: 'Retour'
                }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    title: 'Paramètres',
                    headerBackTitle: 'Retour'
                }}
            />
        </Stack>
    );
}