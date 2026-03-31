import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity, 
  ScrollView, StatusBar, ImageBackground, Dimensions, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width } = Dimensions.get('window');

// --- KEEPING COMPONENT OUTSIDE TO FIX TYPING FOCUS ISSUE ---
const GlassInput = ({ icon, placeholder, value, onChange, keyboardType = 'default' }) => (
  <View style={styles.glassInputContainer}>
    <Ionicons name={icon} size={20} color="rgba(255,255,255,0.6)" style={styles.icon} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="rgba(255,255,255,0.4)"
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
      autoCorrect={false}
      spellCheck={false}
    />
  </View>
);

const SignUpDetailScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    dob: null,
    gender: 'Male',
    email: '',
    address: ''
  });
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [ageDisplay, setAgeDisplay] = useState('');

  // --- LOGIC: AGE CALCULATION (YEARS, MONTHS, DAYS) ---
  const calculateDetailedAge = (birthDate) => {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    setAgeDisplay(`${years}y ${months}m ${days}d`);
  };

  const handleConfirmDate = (date) => {
    setFormData(prev => ({ ...prev, dob: date }));
    calculateDetailedAge(date);
    setDatePickerVisibility(false);
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
        
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Complete Profile</Text>
            <Text style={styles.subtitle}>Welcome to Care2Connect, Rahul</Text>
          </View>

          {/* GLASS FORM CARD */}
          <View style={styles.formCard}>
            
            <Text style={styles.label}>Basic Details</Text>
            
            <GlassInput 
              icon="person-outline" 
              placeholder="Full Name" 
              value={formData.fullName} 
              onChange={(t) => updateField('fullName', t)} 
            />

            <GlassInput 
              icon="people-outline" 
              placeholder="Father's Name" 
              value={formData.fatherName} 
              onChange={(t) => updateField('fatherName', t)} 
            />

            {/* --- DATE OF BIRTH PICKER --- */}
            <TouchableOpacity 
              style={styles.glassInputContainer} 
              onPress={() => setDatePickerVisibility(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="calendar-outline" size={20} color="rgba(255,255,255,0.6)" style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.input, { color: formData.dob ? '#FFF' : 'rgba(255,255,255,0.4)', paddingTop: Platform.OS === 'ios' ? 0 : 15 }]}>
                  {formData.dob ? formData.dob.toLocaleDateString('en-GB') : 'Select Date of Birth'}
                </Text>
              </View>
              {ageDisplay !== '' && (
                <View style={styles.ageBadge}>
                  <Text style={styles.ageBadgeText}>{ageDisplay}</Text>
                </View>
              )}
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={() => setDatePickerVisibility(false)}
              maximumDate={new Date()} 
              themeVariant="dark"
            />

            {/* GENDER SELECTOR */}
            <Text style={[styles.label, { marginTop: 20 }]}>Gender</Text>
            <View style={styles.genderRow}>
              {['Male', 'Female'].map((g) => (
                <TouchableOpacity 
                  key={g}
                  style={[styles.genderBtn, formData.gender === g && styles.genderBtnActive]}
                  onPress={() => updateField('gender', g)}
                >
                  <Ionicons name={g.toLowerCase()} size={20} color={formData.gender === g ? "#383981" : "#FFF"} />
                  <Text style={[styles.genderText, formData.gender === g && styles.textDark]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* CONTACT DETAILS */}
            <Text style={[styles.label, { marginTop: 20 }]}>Other Details</Text>
            
            <GlassInput 
              icon="mail-outline" 
              placeholder="Email Address" 
              value={formData.email} 
              onChange={(t) => updateField('email', t)} 
              keyboardType="email-address" 
            />

            <GlassInput 
              icon="location-outline" 
              placeholder="Full Address" 
              value={formData.address} 
              onChange={(t) => updateField('address', t)} 
            />

            {/* SUBMIT BUTTON */}
            <TouchableOpacity 
              style={styles.submitBtn} 
              onPress={() => navigation.replace('Landing')}
            >
              <Text style={styles.submitBtnText}>Finish Setup</Text>
              <Ionicons name="chevron-forward-circle" size={24} color="#383981" />
            </TouchableOpacity>

          </View>
          <View style={{height: 40}} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  headerContainer: { marginTop: 40, marginBottom: 30, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 8 },
  formCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 30, 
    padding: 25, 
    borderWidth: 1.5, 
    borderColor: 'rgba(255, 255, 255, 0.3)' 
  },
  label: { color: '#FFF', fontSize: 14, fontWeight: '700', marginBottom: 12, marginLeft: 5 },
  glassInputContainer: { 
    flexDirection: 'row', 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    borderRadius: 20, 
    height: 55, 
    alignItems: 'center', 
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  icon: { marginRight: 12 },
  input: { flex: 1, color: '#FFF', fontSize: 15 },
  ageBadge: { backgroundColor: '#FFF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: '#383981' },
  ageBadgeText: { color: '#383981', fontSize: 10, fontWeight: 'bold' },
  genderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  genderBtn: { flexDirection: 'row', width: '48%', height: 50, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  genderBtnActive: { backgroundColor: '#FFF' },
  genderText: { color: '#FFF', marginLeft: 10, fontWeight: '600' },
  textDark: { color: '#383981' },
  submitBtn: { 
    backgroundColor: '#FFF', 
    height: 60, 
    borderRadius: 20, 
    marginTop: 30, 
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5
  },
  submitBtnText: { color: '#383981', fontSize: 18, fontWeight: 'bold', marginRight: 10 }
});

export default SignUpDetailScreen;