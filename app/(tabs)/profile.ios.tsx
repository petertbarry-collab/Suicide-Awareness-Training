
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { colors } from "@/styles/commonStyles";

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Profile',
          headerLargeTitle: true,
        }} 
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.content}>
          <Text style={styles.text}>Profile Screen</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
});
