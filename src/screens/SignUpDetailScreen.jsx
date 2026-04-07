import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity, 
  StatusBar, ImageBackground, Dimensions, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// Corrected GlassInput Component
const GlassInput = ({ icon, placeholder, value, onChange }) => (
  <View style={styles.glassInputContainer}>
    <Ionicons name={icon} size={20} color="rgba(255,255,255,0.6)" style={styles.icon} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="rgba(255,255,255,0.4)"
      value={value}
      onChangeText={onChange}
      autoCorrect={false}
      underlineColorAndroid="transparent"
    />
  </View>
);

const SignUpDetailScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male',
  });

  const handleFinish = () => {
    if (!formData.fullName.trim()) {
      Alert.alert("Required", "Please enter your full name to continue.");
      return;
    }
    // Navigate to Landing and pass the gender for the Navbar avatar
    navigation.replace('Landing', { userGender: formData.gender });
  };

  const updateField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/7d/92/38/7d923880728193337fe46ec6c8e26184.jpg' }} 
      style={styles.container}
      blurRadius={15} 
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        
        <View style={styles.contentWrapper}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Create Profile</Text>
            <Text style={styles.subtitle}>Welcome to Care2Connect</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>Full Name</Text>
            <GlassInput 
              icon="person-outline" 
              placeholder="Enter your name" 
              value={formData.fullName} 
              onChange={(t) => updateField('fullName', t)} 
            />

            <Text style={[styles.label, { marginTop: 20 }]}>Gender</Text>
            <View style={styles.genderRow}>
              {['Male', 'Female', 'Other'].map((g) => (
                <TouchableOpacity 
                  key={g}
                  style={[styles.genderBtn, formData.gender === g && styles.genderBtnActive]}
                  onPress={() => updateField('gender', g)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.genderText, formData.gender === g && styles.textDark]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.submitBtn} 
              onPress={handleFinish}
              activeOpacity={0.8}
            >
              <Text style={styles.submitBtnText}>Finish Setup</Text>
              <Ionicons name="arrow-forward-circle" size={24} color="#383981" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  contentWrapper: { flex: 1, paddingHorizontal: 25, justifyContent: 'center' },
  headerContainer: { marginBottom: 30, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 8 },
  formCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 35, 
    padding: 25, 
    borderWidth: 1.5, 
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  label: { color: '#FFF', fontSize: 14, fontWeight: '700', marginBottom: 12, marginLeft: 5 },
  glassInputContainer: { 
    flexDirection: 'row', 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    borderRadius: 20, 
    height: 60, 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 5 
  },
  icon: { marginRight: 12 },
  input: { flex: 1, color: '#FFF', fontSize: 16, height: '100%' },
  genderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  genderBtn: { 
    width: '31%', 
    height: 50, 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)' 
  },
  genderBtnActive: { backgroundColor: '#FFF' },
  genderText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  textDark: { color: '#383981' },
  submitBtn: { 
    backgroundColor: '#FFF', 
    height: 60, 
    borderRadius: 22, 
    marginTop: 35, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 4
  },
  submitBtnText: { color: '#383981', fontSize: 18, fontWeight: 'bold', marginRight: 10 }
});

export default SignUpDetailScreen;