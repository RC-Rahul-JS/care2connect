import React, { useEffect, useRef } from 'react';
import { 
  StyleSheet, View, Text, Image, Animated, Easing, 
  Dimensions, TouchableOpacity, SafeAreaView, StatusBar 
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 1. IMPORT THE HOOK

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Orbital items configuration
const orbitalItems = [
  { type: 'img', uri: 'https://randomuser.me/api/portraits/women/44.jpg', r: 110, a: -90, size: 70 },
  { type: 'img', uri: 'https://randomuser.me/api/portraits/men/32.jpg',   r: 160, a: -30, size: 65 },
  { type: 'img', uri: 'https://randomuser.me/api/portraits/men/51.jpg',   r: 170, a: -150, size: 60 },
  { type: 'img', uri: 'https://randomuser.me/api/portraits/women/68.jpg', r: 230, a: -175, size: 55 },
  { type: 'img', uri: 'https://randomuser.me/api/portraits/women/72.jpg', r: 210, a: 15, size: 65 },
  { type: 'img', uri: 'https://randomuser.me/api/portraits/men/75.jpg',   r: 230, a: 155, size: 55 },
  { type: 'img', uri: 'https://randomuser.me/api/portraits/men/22.jpg',   r: 240, a: 45, size: 50 },
  { type: 'arr', char: '✦', r: 140, a: -110 },
  { type: 'arr', char: '•', r: 190, a: 65 },
  { type: 'arr', char: '✦', r: 150, a: -165 },
];

const WelcomeScreen = () => {
  // 2. INITIALIZE NAVIGATION
  const navigation = useNavigation(); 

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef(orbitalItems.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.stagger(60, scaleAnims.map(anim => 
        Animated.timing(anim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        })
      ))
    ]).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
          Animated.timing(floatAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
        ])
      ).start();
    });
  }, []);

  const getPos = (r, a) => {
    const rad = (a * Math.PI) / 180;
    return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.mainContent}>
        <View style={styles.orbitWrapper}>
          
          {/* BACKGROUND RINGS */}
          <View style={[styles.ring, { width: 240, height: 240, borderRadius: 120 }]} />
          <View style={[styles.ring, { width: 420, height: 420, borderRadius: 210 }]} />
          <View style={[styles.ring, { width: 560, height: 560, borderRadius: 280, opacity: 0.3 }]} />

          {/* CENTER GROUP */}
          <Animated.View style={[styles.centerGroup, { opacity: fadeAnim }]}>
            <View style={styles.logoContainer}>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2913/2913446.png' }} 
                style={styles.logoIcon} 
              />
            </View>
            <Text style={styles.title}>
              <Text style={styles.blueText}>Health Blooms</Text> is the
            </Text>
            <Text style={styles.subtitle}>platform for health{"\n"}and wellness</Text>
          </Animated.View>

          {/* ORBITAL ITEMS */}
          {orbitalItems.map((item, i) => {
            const pos = getPos(item.r, item.a);
            const translateY = floatAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [pos.y, pos.y - 15] 
            });

            return (
              <Animated.View 
                key={i} 
                style={[
                  styles.absolute, 
                  {
                    opacity: scaleAnims[i],
                    transform: [
                      { translateX: pos.x },
                      { translateY: translateY },
                      { scale: scaleAnims[i] }
                    ],
                    marginLeft: item.type === 'img' ? -(item.size / 2) : -10,
                    marginTop: item.type === 'img' ? -(item.size / 2) : -10,
                  }
                ]}
              >
                {item.type === 'img' ? (
                  <View style={[styles.avatarBorder, { width: item.size, height: item.size, borderRadius: item.size / 2 }]}>
                    <Image source={{ uri: item.uri }} style={{ flex: 1, borderRadius: item.size / 2 }} />
                  </View>
                ) : (
                  <Text style={styles.arrowText}>{item.char}</Text>
                )}
              </Animated.View>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.linkText}>Why are our doctors the best?</Text>
        </TouchableOpacity>
      <TouchableOpacity 
  style={styles.mainBtn} 
  activeOpacity={0.8}
  onPress={() => {
    // Check if navigation exists and is ready
    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('DoctorsList');
    }
  }}
>
  <Text style={styles.btnText}>Choose a doctor</Text>
</TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFC' },
  mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  orbitWrapper: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: -140, 
    width: SCREEN_WIDTH,
    height: 500,
  },
  ring: { 
    position: 'absolute', 
    borderWidth: 1.5, 
    borderColor: '#E8EDF2', 
  },
  centerGroup: { 
    alignItems: 'center', 
    zIndex: 10, 
    position: 'absolute', 
    width: SCREEN_WIDTH 
  },
  logoContainer: {
    width: 86, height: 86, borderRadius: 43, backgroundColor: '#FFF', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
    shadowColor: '#4A90E2', 
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15, 
    shadowRadius: 15, 
    elevation: 10
  },
  logoIcon: { width: 44, height: 44, tintColor: '#4A90E2' },
  title: { fontSize: 26, fontWeight: '800', color: '#1A1A1A', textAlign: 'center', lineHeight: 32 },
  blueText: { color: '#4A90E2' },
  subtitle: { fontSize: 26, fontWeight: '800', color: '#1A1A1A', textAlign: 'center', lineHeight: 32 },
  absolute: { position: 'absolute' },
  avatarBorder: { 
    padding: 3.5, 
    backgroundColor: '#FFF', 
    elevation: 6, 
    shadowColor: '#000',
    shadowOpacity: 0.1, 
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }
  },
  arrowText: { color: '#D0D9E2', fontSize: 24, fontWeight: 'bold' },
  footer: { paddingHorizontal: 25, paddingBottom: 50, alignItems: 'center' },
  linkText: { color: '#9BA6B5', fontSize: 15, marginBottom: 25, textDecorationLine: 'underline' },
  mainBtn: { backgroundColor: '#4A90E2', width: '100%', paddingVertical: 20, borderRadius: 18, alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: '700' }
});

export default WelcomeScreen;