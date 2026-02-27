
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, ScrollView, useColorScheme, Share, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { colors } from "@/styles/commonStyles";
import QRCode from 'react-native-qrcode-svg';
import { IconSymbol } from "@/components/IconSymbol";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Deep link to the app
  const appLink = 'raven-app://';
  
  // For production, you would use your actual app store links:
  // iOS: https://apps.apple.com/app/id[YOUR_APP_ID]
  // Android: https://play.google.com/store/apps/details?id=com.raven.app
  const appStoreLink = 'https://apps.apple.com/app/raven';
  const playStoreLink = 'https://play.google.com/store/apps/details?id=com.raven.app';
  
  const handleShare = async () => {
    console.log('User tapped Share QR Code button');
    try {
      await Share.share({
        message: `Check out the Raven app - Suicide Awareness Training Resources for Ireland\n\nDeep Link: ${appLink}\niOS: ${appStoreLink}\nAndroid: ${playStoreLink}`,
        title: 'Share Raven App',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Share',
          headerLargeTitle: true,
        }} 
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Share Raven</Text>
            <Text style={styles.subtitle}>Scan this QR code to open the app</Text>
          </View>

          <View style={[styles.qrContainer, isDark && styles.qrContainerDark]}>
            <QRCode
              value={appLink}
              size={250}
              color={isDark ? '#FFFFFF' : '#000000'}
              backgroundColor={isDark ? '#1C1C1E' : '#FFFFFF'}
              logo={require('@/assets/images/app-icon-fvp.png')}
              logoSize={50}
              logoBackgroundColor='transparent'
            />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <IconSymbol 
                ios_icon_name="link"
                android_material_icon_name="link" 
                size={20} 
                color={colors.text} 
              />
              <Text style={styles.infoText}>Deep Link: {appLink}</Text>
            </View>
            
            <Text style={styles.description}>
              Share this QR code to help others discover suicide awareness training resources available in Ireland.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <IconSymbol 
              ios_icon_name="square.and.arrow.up"
              android_material_icon_name="share" 
              size={20} 
              color="#FFFFFF" 
            />
            <Text style={styles.shareButtonText}>Share QR Code</Text>
          </TouchableOpacity>

          <View style={styles.storeLinksContainer}>
            <Text style={styles.storeLinksTitle}>App Store Links</Text>
            <Text style={styles.storeLinkText}>iOS: {appStoreLink}</Text>
            <Text style={styles.storeLinkText}>Android: {playStoreLink}</Text>
            <Text style={styles.noteText}>
              Note: Update these links when your app is published to the App Store and Play Store
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    opacity: 0.7,
  },
  qrContainer: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  qrContainerDark: {
    backgroundColor: '#1C1C1E',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 30,
    width: '100%',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  storeLinksContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 20,
  },
  storeLinksTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  storeLinkText: {
    fontSize: 13,
    color: colors.text,
    opacity: 0.7,
    marginBottom: 8,
  },
  noteText: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.5,
    fontStyle: 'italic',
    marginTop: 8,
  },
});
