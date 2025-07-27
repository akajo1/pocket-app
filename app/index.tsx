import React, { useState } from 'react';
import AuthGuard from '@/components/guards/AuthGuard';
import { Redirect } from 'expo-router';

export default function Index() {
  return (
    <AuthGuard>
      <Redirect href="/(tabs)" />
    </AuthGuard>
  );
}