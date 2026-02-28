
import { View, Text, StyleSheet, ScrollView, useColorScheme, Share, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import QRCode from 'react-native-qrcode-svg';
import { IconSymbol } from "@/components/IconSymbol";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: 30,
    borderRadius: 20,
    width: '100%',
  },
  appIcon: {
    width: 160,
    height: 160,
    borderRadius: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  qrDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  aboutSection: {
    width: '100%',
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  aboutText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
    textAlign: 'center',
  },
  missionText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
  qrAppIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginBottom: 12,
  },
});

export default function ProfileScreen() {
  console.log('🦅 ProfileScreen: Rendering profile with app icon');
  const colorScheme = useColorScheme();
  const appDeepLink = 'raven-app://';

  const handleShare = async () => {
    console.log('User tapped Share button');
    try {
      const result = await Share.share({
        message: `Check out the Raven app - Your guide to suicide awareness training in Ireland.\n\n${appDeepLink}`,
        title: 'Share Raven App',
      });
      
      if (result.action === Share.sharedAction) {
        console.log('App shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/app-icon-rcb.png')}
            style={styles.appIcon}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Raven</Text>
          <Text style={styles.tagline}>Supporting Mental Health Awareness</Text>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.aboutText}>
            Raven brings together all suicide awareness training resources available in Ireland, making it easier to find the support and education you need.
          </Text>
          <Text style={styles.missionText}>
            "Every conversation can save a life. Every training makes a difference."
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Share the App</Text>
          <View style={styles.qrContainer}>
            <Image 
              source={require('@/assets/images/app-icon-rcb.png')}
              style={styles.qrAppIcon}
              resizeMode="contain"
            />
            <QRCode
              value={appDeepLink}
              size={200}
              backgroundColor="white"
              color={colors.primary}
            />
            <Text style={styles.qrDescription}>
              Scan this QR code to open the Raven app
            </Text>
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={handleShare}
              activeOpacity={0.7}
            >
              <IconSymbol 
                ios_icon_name="square.and.arrow.up" 
                android_material_icon_name="share"
                size={20}
                color="white"
              />
              <Text style={styles.shareButtonText}>Share App</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
