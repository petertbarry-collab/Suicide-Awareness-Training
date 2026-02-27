
import React from 'react';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  console.log('TabLayout (iOS): Initializing native tabs');
  
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(home)">
        <Label>Training</Label>
        <Icon sf={{ default: 'heart', selected: 'heart.fill' }} drawable="favorite" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(support)">
        <Label>Support</Label>
        <Icon sf={{ default: 'person.3', selected: 'person.3.fill' }} drawable="group" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
