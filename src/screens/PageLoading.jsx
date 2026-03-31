import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, View, Text, Animated, Easing, 
  StatusBar 
} from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const LoadingScreen = () => {
  const infinityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Smooth Infinity Flow
    Animated.loop(
      Animated.timing(infinityValue, {
        toValue: 1,
        duration: 2200,
        easing: Easing.bezier(0.45, 0.05, 0.55, 0.95),
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const strokeDashoffset = infinityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [280, 0], 
  });

  const infinityPath = "M35,35 C35,14 63,14 70,35 C77,56 105,56 105,35 C105,14 77,14 70,35 C63,56 35,56 35,35";

  return (
    <View style={styles.loaderContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0E17" />
      
      <View style={styles.canvas}>
        <Svg width="175" height="84" viewBox="0 0 140 70">
          <Defs>
            <LinearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#00E5FF" stopOpacity="0.2" />
              <Stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" /> 
              <Stop offset="100%" stopColor="#4A90E2" stopOpacity="0.2" />
            </LinearGradient>
          </Defs>
          
          {/* Subtle Background Track */}
          <Path 
            d={infinityPath} 
            stroke="rgba(255, 255, 255, 0.03)" 
            strokeWidth="3" 
            fill="none" 
          />
          
          {/* The "Shimmer" Glow Trail */}
          <AnimatedPath
            d={infinityPath}
            stroke="url(#glowGrad)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="60, 220"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />

          {/* Core Light Point */}
          <AnimatedPath
            d={infinityPath}
            stroke="#FFF"
            strokeWidth="2"
            fill="none"
            strokeDasharray="1, 279"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>
      </View>
      
      <Text style={styles.footerText}>CONNECTING</Text>
    </View>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <View style={styles.main}>
      {/* App Content Goes Here */}
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: { 
    flex: 1, 
    backgroundColor: '#0A0E17', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  canvas: {
    width: 175,
    height: 84,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  footerText: {
    position: 'absolute',
    bottom: 40,
    color: 'rgba(255,255,255,0.15)',
    fontSize: 8,
    letterSpacing: 5,
  },
  main: { 
    flex: 1, 
    backgroundColor: '#0A0E17', 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});