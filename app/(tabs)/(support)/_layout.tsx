
import { Stack } from 'expo-router';
import React from 'react';

export default function SupportLayout() {
  console.log('SupportLayout: Initializing support groups stack');
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
