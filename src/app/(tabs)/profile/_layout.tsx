import { Stack } from 'expo-router/stack';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Profil',
          headerShown: false 
        }} 
      />
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
        name="cards" 
        options={{ 
          title: 'Mes cartes',
          headerBackTitle: 'Retour'
        }} 
      />
      <Stack.Screen 
        name="subwallets" 
        options={{ 
          title: 'Sous-portefeuilles',
          headerBackTitle: 'Retour'
        }} 
      />
      <Stack.Screen 
        name="mobile" 
        options={{ 
          title: 'Paiements mobiles',
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