
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Linking,
  Pressable,
} from 'react-native';
import { Stack } from 'expo-router';
import { Mail } from 'lucide-react-native';
import { colors } from '@/styles/commonStyles';

const EMAIL = 'petertbarry@gmail.com';
const MAILTO = 'mailto:petertbarry@gmail.com';

export default function ContactScreen() {
  // Staggered entrance animations
  const headerAnim = useRef(new Animated.Value(0)).current;
  const storyAnim = useRef(new Animated.Value(0)).current;
  const card1Anim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const card2Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const makeAnim = (val: Animated.Value, delay: number) =>
      Animated.timing(val, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      });

    Animated.stagger(80, [
      makeAnim(headerAnim, 0),
      makeAnim(storyAnim, 0),
      makeAnim(card1Anim, 0),
      makeAnim(buttonAnim, 0),
      makeAnim(card2Anim, 0),
    ]).start();
  }, [headerAnim, storyAnim, card1Anim, buttonAnim, card2Anim]);

  const makeAnimatedStyle = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0],
        }),
      },
    ],
  });

  // AnimatedPressable for the Send Email button
  const scale = useRef(new Animated.Value(1)).current;
  const animateIn = () =>
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  const animateOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();

  const handleSendEmail = () => {
    console.log('Contact: Send Email button pressed');
    Linking.openURL(MAILTO).catch((err) =>
      console.error('Contact: Failed to open mailto link', err)
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Contact' }} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Header */}
        <Animated.View style={[styles.header, makeAnimatedStyle(headerAnim)]}>
          <View style={styles.iconCircle}>
            <Mail size={28} color="#FFFFFF" strokeWidth={2} />
          </View>
          <Text style={styles.heading}>Get in Touch</Text>
          <Text style={styles.subtitle}>We'd love to hear from you.</Text>
        </Animated.View>

        {/* Story invite */}
        <Animated.View style={[styles.storyCard, makeAnimatedStyle(storyAnim)]}>
          <Text style={styles.storyText}>
            We'd love to hear your story. Whether it was a personal challenge that led you to this training, or a moment where you put it into practice — your experience matters and could inspire others.
          </Text>
          <Text style={styles.storySubText}>
            Drop us a message and tell us what brought you here.
          </Text>
        </Animated.View>

        {/* Email card */}
        <Animated.View style={[styles.card, makeAnimatedStyle(card1Anim)]}>
          <View style={styles.emailRow}>
            <Mail size={20} color={colors.primary} strokeWidth={2} />
            <Text selectable style={styles.emailText}>
              {EMAIL}
            </Text>
          </View>
        </Animated.View>

        {/* Send Email button */}
        <Animated.View style={[styles.buttonWrapper, makeAnimatedStyle(buttonAnim)]}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <Pressable
              onPressIn={animateIn}
              onPressOut={animateOut}
              onPress={handleSendEmail}
              style={styles.sendButton}
            >
              <Text style={styles.sendButtonText}>Send Email</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>


      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  emailText: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
    flexShrink: 1,
  },
  buttonWrapper: {
    marginBottom: 12,
  },
  sendButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  messageText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 23,
  },
  storyCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  storyText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 10,
  },
  storySubText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 21,
    fontStyle: 'italic',
  },
});
