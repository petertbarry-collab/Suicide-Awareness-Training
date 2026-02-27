
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  console.log('TabLayout: Initializing tab navigation');
  
  // Define the tabs configuration
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'favorite',
      label: 'Training',
    },
    {
      name: '(support)',
      route: '/(tabs)/(support)/',
      icon: 'group',
      label: 'Support',
    },
  ];

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen key="home" name="(home)" />
        <Stack.Screen key="support" name="(support)" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
