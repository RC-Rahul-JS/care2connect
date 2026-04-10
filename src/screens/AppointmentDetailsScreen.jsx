import React from 'react';
import { 
  StyleSheet, View, Text, ImageBackground, 
  ScrollView, TouchableOpacity, Dimensions, StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const AppointmentDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { appointmentData } = route.params;

  const InfoRow = ({ label, value, icon }) => (
    <View style={styles.infoRow}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={20} color="#5CF08C" />
      </View>
      <View style={styles.textColumn}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/7d/92/38/7d923880728193337fe46ec6c8e26184.jpg' }} 
      style={styles.container}
      blurRadius={15}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassIconBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
          <TouchableOpacity style={styles.glassIconBtn}>
            <Ionicons name="share-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* 1. PATIENT INFORMATION CARD */}
          <View style={styles.glassCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="person-circle-outline" size={24} color="#FFF" />
              <Text style={styles.sectionTitle}>Patient Information</Text>
            </View>
            <View style={styles.divider} />
            
            <InfoRow label="PATIENT NAME" value={appointmentData.patientName} icon="person-outline" />
            <InfoRow label="FATHER'S NAME" value={appointmentData.fatherName} icon="people-outline" />
            
            <View style={styles.horizontalGroup}>
              <View style={{ flex: 1 }}>
                <InfoRow label="GENDER" value={appointmentData.gender} icon="male-female-outline" />
              </View>
              <View style={{ flex: 1 }}>
                <InfoRow label="D.O.B" value={appointmentData.dob} icon="calendar-outline" />
              </View>
            </View>
          </View>

          {/* 2. MEDICAL CONTEXT / APPOINTMENT CARD */}
          <View style={[styles.glassCard, { marginTop: 20 }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="medical-outline" size={24} color="#FFF" />
              <Text style={styles.sectionTitle}>Medical Context</Text>
            </View>
            <View style={styles.divider} />
            
            <InfoRow label="PRESCRIBING DOCTOR" value={appointmentData.doctorName} icon="medkit-outline" />
            <InfoRow label="APPOINTMENT DATE" value={appointmentData.date} icon="calendar-clear-outline" />
            
            {/* Added Time Slot here as requested */}
            <InfoRow label="TIME SLOT" value={appointmentData.time} icon="time-outline" />
            
            <InfoRow label="ORDER ID" value={`ORD-${appointmentData.id}882`} icon="barcode-outline" />
            <InfoRow label="CURRENT STATUS" value={appointmentData.status} icon="stats-chart-outline" />
          </View>

          {/* 3. VIEW PRESCRIPTION BUTTON */}
          <TouchableOpacity style={styles.prescriptionBtn} activeOpacity={0.8}>
            <Ionicons name="document-text-outline" size={22} color="#383981" />
            <Text style={styles.prescriptionBtnText}>View Uploaded Prescription</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFF' },
  glassIconBtn: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 12 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  glassCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 35, 
    padding: 20, 
    borderWidth: 1.5, 
    borderColor: 'rgba(255, 255, 255, 0.25)' 
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 20 },
  
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  iconCircle: { width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  textColumn: { marginLeft: 15 },
  labelText: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5 },
  valueText: { color: '#FFF', fontSize: 16, fontWeight: '600', marginTop: 2 },
  
  horizontalGroup: { flexDirection: 'row' },
  
  prescriptionBtn: { 
    marginTop: 30, 
    backgroundColor: '#FFF', 
    height: 65, 
    borderRadius: 25, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8
  },
  prescriptionBtnText: { color: '#383981', fontSize: 16, fontWeight: 'bold', marginLeft: 10 }
});

export default AppointmentDetailsScreen;