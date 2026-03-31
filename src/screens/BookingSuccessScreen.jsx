import React from 'react';
import { 
  StyleSheet, View, Text, ImageBackground, TouchableOpacity, 
  StatusBar, Dimensions, ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const BookingSuccessScreen = ({ route }) => {
  const navigation = useNavigation();
  
  // Data coming from the Appointment/Payment page
  const { 
    doctorName = "Dr. Anurag Tiwari", 
    patientName = "Rahul", 
    date = "2026-03-31", 
    time = "10:00 AM - 11:00 AM",
    age = "25 Years",
    gender = "Male"
  } = route.params || {};

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/7d/92/38/7d923880728193337fe46ec6c8e26184.jpg' }} 
      style={styles.container}
      blurRadius={15}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* 1. SUCCESS ANIMATION ICON */}
          <View style={styles.successIconContainer}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                <Ionicons name="checkmark-done" size={60} color="#5CF08C" />
              </View>
            </View>
            <Text style={styles.successTitle}>Appointment Booked!</Text>
            <Text style={styles.successSub}>Your booking has been confirmed</Text>
          </View>

          {/* 2. GLASS DETAILS CARD */}
          <View style={styles.glassCard}>
            <Text style={styles.cardHeader}>Booking Details</Text>
            
            <DetailRow label="DOCTOR" value={doctorName} />
            <DetailRow label="PATIENT" value={patientName} />
            <DetailRow label="DATE" value={date} />
            <DetailRow label="TIME SLOT" value={time} />
            
            <View style={styles.row}>
                <DetailRow label="AGE" value={age} style={{ flex: 1 }} />
                <DetailRow label="GENDER" value={gender} style={{ flex: 1 }} />
            </View>

            <View style={styles.divider} />
            
            <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Payment Status</Text>
                <View style={styles.paidBadge}>
                    <Text style={styles.paidText}>PAID</Text>
                </View>
            </View>
          </View>

          {/* 3. BUTTONS */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.downloadBtn} onPress={() => alert('Downloading Invoice...')}>
              <Ionicons name="download-outline" size={20} color="#383981" />
              <Text style={styles.downloadBtnText}> Download Invoice</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.homeBtn} 
                onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.homeBtnText}>Back to Home</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

// Small Helper Component for Rows
const DetailRow = ({ label, value, style }) => (
    <View style={[styles.detailItem, style]}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: { padding: 25, alignItems: 'center' },

  successIconContainer: { alignItems: 'center', marginVertical: 30 },
  outerCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(92, 240, 140, 0.1)', justifyContent: 'center', alignItems: 'center' },
  innerCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(255, 255, 255, 0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#5CF08C' },
  successTitle: { color: '#FFF', fontSize: 26, fontWeight: 'bold', marginTop: 20 },
  successSub: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 5 },

  glassCard: { 
    width: '100%', 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 30, 
    padding: 25, 
    borderWidth: 1.5, 
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 30 
  },
  cardHeader: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  detailItem: { marginBottom: 15 },
  detailLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  detailValue: { color: '#FFF', fontSize: 16, fontWeight: '500', marginTop: 4 },
  row: { flexDirection: 'row' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 10 },
  
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  statusLabel: { color: '#FFF', fontSize: 14 },
  paidBadge: { backgroundColor: '#5CF08C', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  paidText: { color: '#1A1A1A', fontWeight: 'bold', fontSize: 12 },

  buttonContainer: { width: '100%', gap: 15 },
  downloadBtn: { 
    flexDirection: 'row',
    backgroundColor: '#FFF', 
    padding: 18, 
    borderRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  downloadBtnText: { color: '#383981', fontWeight: 'bold', fontSize: 16 },
  homeBtn: { 
    padding: 18, 
    borderRadius: 20, 
    borderWidth: 1.5, 
    borderColor: '#FFF', 
    alignItems: 'center' 
  },
  homeBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});

export default BookingSuccessScreen;