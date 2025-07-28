import AuthGuard from '@/components/guards/AuthGuard';
import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
  return (
    <AuthGuard>
      <Redirect href="/(tabs)" />
    </AuthGuard>
  );
}