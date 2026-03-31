import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity, 
  Animated, Dimensions, StatusBar, ImageBackground, Keyboard, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [mode, setMode] = useState('Login'); // 'Login' or 'SignUp'
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);

  // Animations
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Handle Mode Switch (Login <-> SignUp)
  const toggleMode = (newMode) => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      setMode(newMode);
      setIsOtpSent(false);
      setPhone('');
      setOtp('');
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    });
  };

  const handleAction = () => {
    if (phone === '7089449249') {
      setIsOtpSent(true);
      setTimer(30);
    } else if (phone.length === 10) {
      navigation.navigate('SignUpDetail');
    } else {
      alert("Please enter a valid number");
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      if (otp === '123456') {
        setTimeout(() => navigation.replace('Landing'), 500);
      } else {
         alert("Invalid OTP");
         setOtp('');
      }
    }
  }, [otp]);

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/7d/92/38/7d923880728193337fe46ec6c8e26184.jpg' }} 
      style={styles.container}
      blurRadius={15} 
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* 1. BRANDING */}
          <View style={styles.logoContainer}>
            <Text style={styles.brandText}>care<Text style={styles.boldTwo}>2</Text>connect</Text>
            <Text style={styles.tagline}>{mode === 'Login' ? 'Welcome Back!' : 'Create New Account'}</Text>
          </View>

          {/* 2. TOGGLE TABS */}
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => toggleMode('Login')} style={[styles.tab, mode === 'Login' && styles.activeTab]}>
              <Text style={[styles.tabText, mode === 'Login' && styles.activeTabText]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleMode('SignUp')} style={[styles.tab, mode === 'SignUp' && styles.activeTab]}>
              <Text style={[styles.tabText, mode === 'SignUp' && styles.activeTabText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* 3. DYNAMIC FORM */}
          <Animated.View style={[styles.formCard, { opacity: fadeAnim }]}>
            
            {mode === 'SignUp' && !isOtpSent && (
              <>
                <View style={styles.glassInput}>
                  <Ionicons name="person-outline" size={20} color="rgba(255,255,255,0.6)" />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Full Name" 
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
                <View style={[styles.glassInput, { marginTop: 15 }]}>
                  <Ionicons name="mail-outline" size={20} color="rgba(255,255,255,0.6)" />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Email Address" 
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                </View>
                <View style={{ height: 15 }} />
              </>
            )}

            {!isOtpSent ? (
              <View style={styles.glassInput}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Mobile Number" 
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            ) : (
              <View style={styles.otpContainer}>
                <Text style={styles.otpTitle}>Verify OTP sent to {phone}</Text>
                <View style={styles.glassInput}>
                   <TextInput 
                    style={[styles.input, { textAlign: 'center', letterSpacing: 10, fontSize: 22 }]} 
                    placeholder="••••••" 
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                  />
                </View>
                <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
              </View>
            )}

            <TouchableOpacity style={styles.primaryBtn} onPress={isOtpSent ? null : handleAction}>
              <Text style={styles.btnText}>{isOtpSent ? 'Verifying...' : mode === 'Login' ? 'Login' : 'Sign Up'}</Text>
            </TouchableOpacity>
          </Animated.View>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 25 },
  
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  brandText: { fontSize: 32, color: '#FFF', fontWeight: '300', letterSpacing: 2 },
  boldTwo: { fontWeight: '900', color: '#00E5FF' },
  tagline: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 8 },

  tabContainer: { 
    flexDirection: 'row', 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 15, 
    padding: 5, 
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: 'rgba(255,255,255,0.2)' },
  tabText: { color: 'rgba(255,255,255,0.5)', fontWeight: '600' },
  activeTabText: { color: '#FFF' },

  formCard: { 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    borderRadius: 30, 
    padding: 25, 
    borderWidth: 1.5, 
    borderColor: 'rgba(255,255,255,0.2)' 
  },
  glassInput: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 18, 
    height: 55, 
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  countryCode: { color: '#FFF', fontWeight: 'bold', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.2)', paddingRight: 10, marginRight: 10 },
  input: { flex: 1, color: '#FFF', fontSize: 16 },

  primaryBtn: { 
    backgroundColor: '#FFF', 
    height: 55, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5
  },
  btnText: { color: '#383981', fontSize: 16, fontWeight: 'bold' },

  otpContainer: { alignItems: 'center' },
  otpTitle: { color: '#FFF', fontSize: 13, marginBottom: 15, opacity: 0.8 },
  timerText: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 15 }
});

export default LoginScreen;