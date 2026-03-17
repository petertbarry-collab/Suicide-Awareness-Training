import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/styles/commonStyles';
import { getDeviceId } from '@/utils/deviceId';

const API_BASE = 'https://ge9b88sf4pvcjhqzxh2swdt58rwvyfpk.app.specular.dev';
const REGISTERED_KEY = 'raven_training_registered';

function SkeletonPulse({ width, height }: { width: number | string; height: number }) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius: height / 2,
        backgroundColor: colors.border,
        opacity,
      }}
    />
  );
}

export default function TrainingCounterCard() {
  const [count, setCount] = useState<number>(0);
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const countRef = useRef(0);

  // Animate count up from old value to new value
  const animateCountTo = useCallback((from: number, to: number) => {
    if (from === to) {
      setDisplayCount(to);
      return;
    }
    const duration = 600;
    const steps = Math.min(Math.abs(to - from), 30);
    const interval = duration / steps;
    let current = from;
    const step = to > from ? Math.ceil((to - from) / steps) : -Math.ceil((from - to) / steps);

    const timer = setInterval(() => {
      current += step;
      const clamped = to > from ? Math.min(current, to) : Math.max(current, to);
      setDisplayCount(clamped);
      if (clamped === to) {
        clearInterval(timer);
      }
    }, interval);
  }, []);

  // Load persisted registered state + fetch count on mount
  useEffect(() => {
    async function init() {
      try {
        const [storedRegistered, countResponse] = await Promise.all([
          AsyncStorage.getItem(REGISTERED_KEY),
          fetch(`${API_BASE}/api/training/count`),
        ]);

        console.log('[TrainingCounter] GET /api/training/count — status:', countResponse.status);

        if (storedRegistered === 'true') {
          setRegistered(true);
        }

        if (countResponse.ok) {
          const data = await countResponse.json();
          const fetched = Number(data.count ?? data.total ?? 0);
          countRef.current = fetched;
          setCount(fetched);
          animateCountTo(0, fetched);
        } else {
          const errText = await countResponse.text();
          console.warn('[TrainingCounter] Failed to fetch count:', countResponse.status, errText);
        }
      } catch (err) {
        console.warn('[TrainingCounter] Error fetching count:', err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [animateCountTo]);

  const handleRegister = useCallback(async () => {
    if (registered || registering) return;
    console.log('[TrainingCounter] User tapped "I\'ve completed training" button');
    setRegistering(true);

    try {
      const deviceId = await getDeviceId();
      console.log('[TrainingCounter] POST /api/training/register — device_id:', deviceId);

      const response = await fetch(`${API_BASE}/api/training/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id: deviceId }),
      });

      console.log('[TrainingCounter] POST /api/training/register — status:', response.status);

      if (!response.ok) {
        const errText = await response.text();
        console.warn('[TrainingCounter] Register failed:', response.status, errText);
        setRegistering(false);
        return;
      }

      const data = await response.json();
      console.log('[TrainingCounter] Register response:', data);

      const alreadyRegistered = data.already_registered === true;
      const newCount = Number(data.count ?? data.total ?? count + 1);

      setRegistered(true);
      await AsyncStorage.setItem(REGISTERED_KEY, 'true');

      if (!alreadyRegistered) {
        const prev = countRef.current;
        countRef.current = newCount;
        setCount(newCount);
        animateCountTo(prev, newCount);
      }
    } catch (err) {
      console.warn('[TrainingCounter] Error registering:', err);
    } finally {
      setRegistering(false);
    }
  }, [registered, registering, count, animateCountTo]);

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleAnim]);

  const buttonBg = registered ? colors.success : colors.accent;
  const buttonLabel = registering ? 'Registering...' : registered ? '✓ Registered' : "I've completed training";
  const isDisabled = registered || registering;

  const displayCountFormatted = displayCount.toLocaleString();

  return (
    <View style={styles.card}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <Text style={styles.headerIcon}>👥</Text>
        <Text style={styles.headerTitle}>Community Training Counter</Text>
      </View>

      {/* Count display */}
      <View style={styles.countContainer}>
        {loading ? (
          <View style={styles.skeletonContainer}>
            <SkeletonPulse width={100} height={52} />
            <View style={styles.skeletonLabelRow}>
              <SkeletonPulse width={220} height={14} />
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.countNumber}>{displayCountFormatted}</Text>
            <Text style={styles.countLabel}>people have completed training</Text>
          </>
        )}
      </View>

      {/* Register button */}
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, isDisabled && styles.disabledWrapper]}>
        <Pressable
          style={[styles.button, { backgroundColor: buttonBg }]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleRegister}
          disabled={isDisabled}
          accessibilityRole="button"
          accessibilityLabel={buttonLabel}
        >
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </Pressable>
      </Animated.View>

      {/* Already registered note */}
      {registered && (
        <Text style={styles.registeredNote}>You're already counted!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  headerIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.2,
  },
  countContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  countNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
    lineHeight: 56,
  },
  countLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  skeletonContainer: {
    alignItems: 'center',
    gap: 12,
  },
  skeletonLabelRow: {
    alignItems: 'center',
  },
  button: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disabledWrapper: {
    opacity: 0.85,
  },
  registeredNote: {
    fontSize: 13,
    color: colors.success,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '500',
  },
});
