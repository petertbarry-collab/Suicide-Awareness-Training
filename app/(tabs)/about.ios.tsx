
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView } from 'react-native';
import { colors } from '@/styles/commonStyles';

export default function AboutScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity, transform: [{ translateY }] }]}>
        <View style={styles.content}>
          <Text style={styles.title}>About</Text>
          <View style={styles.divider} />
          <Text style={styles.body}>
            In 2024 our family lost a wonderful son, brother, and uncle to suicide.
          </Text>
          <Text style={styles.body}>
            We wanted to do something but rather than set up another organisation we decided to focus on the resources that are already there and raise awareness of those.
          </Text>
          <View style={styles.paragraphSpacer} />
          <Text style={styles.body}>
            Why Raven? Nicky had a tattoo of a Raven on his forearm which he was very proud of. In many cultures the Raven is a symbol of the Watcher or Gatekeeper and is a perfect symbol for what we are hoping to achieve here.
          </Text>
          <View style={styles.paragraphSpacer} />
          <Text style={styles.body}>
            The more people who undertake the training, the more Gatekeepers in our community who are trained to be more aware of what to look out for, say and do to support someone thinking of suicide or engaging in self-harm.
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 100,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
    marginBottom: 16,
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginBottom: 32,
  },
  body: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 28,
    marginBottom: 20,
  },
  paragraphSpacer: {
    height: 16,
  },
});
