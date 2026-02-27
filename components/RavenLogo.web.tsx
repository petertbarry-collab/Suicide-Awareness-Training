
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface RavenLogoProps {
  size?: number;
  color?: string;
}

export default function RavenLogo({ size = 120, color = '#2C5F7C' }: RavenLogoProps) {
  console.log('RavenLogo (Web) rendering with size:', size, 'color:', color);
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
        {/* Raven body */}
        <path
          d="M60 25C45 25 35 35 35 50C35 58 38 65 43 70L40 85C40 85 50 80 60 80C70 80 80 85 80 85L77 70C82 65 85 58 85 50C85 35 75 25 60 25Z"
          fill={color}
        />
        
        {/* Wings - spread in welcoming gesture */}
        <path
          d="M35 55C35 55 20 50 15 55C10 60 12 65 18 68C24 71 35 65 35 65"
          fill={color}
          opacity="0.9"
        />
        <path
          d="M85 55C85 55 100 50 105 55C110 60 108 65 102 68C96 71 85 65 85 65"
          fill={color}
          opacity="0.9"
        />
        
        {/* Friendly eyes - large and expressive */}
        <circle cx="50" cy="48" r="6" fill="white" />
        <circle cx="70" cy="48" r="6" fill="white" />
        <circle cx="51" cy="49" r="3" fill="#1a1a1a" />
        <circle cx="71" cy="49" r="3" fill="#1a1a1a" />
        
        {/* Eye highlights for warmth */}
        <circle cx="52" cy="47" r="1.5" fill="white" opacity="0.8" />
        <circle cx="72" cy="47" r="1.5" fill="white" opacity="0.8" />
        
        {/* Gentle smile/beak */}
        <path
          d="M60 58C58 58 56 59 56 60C56 61 58 62 60 62C62 62 64 61 64 60C64 59 62 58 60 58Z"
          fill="#F4A460"
        />
        <path
          d="M56 60C56 61 58 63 60 63C62 63 64 61 64 60"
          stroke="#F4A460"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Tail feathers */}
        <path
          d="M55 85C55 85 50 95 48 100C48 100 52 98 55 95"
          fill={color}
          opacity="0.8"
        />
        <path
          d="M60 85C60 85 60 96 60 102C60 102 62 99 62 95"
          fill={color}
          opacity="0.8"
        />
        <path
          d="M65 85C65 85 70 95 72 100C72 100 68 98 65 95"
          fill={color}
          opacity="0.8"
        />
        
        {/* Head feathers/crest - adds character */}
        <path
          d="M55 30C55 30 52 25 50 23C50 23 53 26 55 28"
          fill={color}
          opacity="0.7"
        />
        <path
          d="M60 28C60 28 60 22 60 20C60 20 61 24 61 27"
          fill={color}
          opacity="0.7"
        />
        <path
          d="M65 30C65 30 68 25 70 23C70 23 67 26 65 28"
          fill={color}
          opacity="0.7"
        />
        
        {/* Small heart near the raven - symbolizing care and support */}
        <path
          d="M95 35C95 35 93 32 90 32C87 32 85 34 85 37C85 40 90 45 90 45C90 45 95 40 95 37C95 34 93 32 90 32Z"
          fill="#E74C3C"
          opacity="0.8"
        />
        <path
          d="M90 32C93 32 95 34 95 37C95 40 90 45 90 45"
          fill="#E74C3C"
          opacity="0.8"
        />
      </svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
