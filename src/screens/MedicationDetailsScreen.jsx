import React from 'react';
import { 
  StyleSheet, View, Text, ImageBackground, 
  ScrollView, TouchableOpacity, Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MedicationDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { orderData } = route.params;

  // Static Patient Data (In a real app, this comes from your database/auth)
  const patientInfo = {
    name: "Rahul Choudhary",
    fatherName: "Mr. S.P. Choudhary",
    gender: "Male",
    dob: "15/08/1998",
  };

  const InfoRow = ({ label, value, icon }) => (
    <View style={styles.infoRow}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={20} color="#5CF08C" />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
          <TouchableOpacity onPress={() => Alert.alert("Exporting", "Generating PDF Report...")}>
            <Ionicons name="share-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* PATIENT INFO CARD */}
          <View style={styles.glassCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="person-circle-outline" size={24} color="#FFF" />
              <Text style={styles.cardTitle}>Patient Information</Text>
            </View>
            <View style={styles.separator} />
            
            <InfoRow label="Patient Name" value={patientInfo.name} icon="person-outline" />
            <InfoRow label="Father's Name" value={patientInfo.fatherName} icon="people-outline" />
            <View style={styles.horizontalRow}>
              <View style={{flex: 1}}><InfoRow label="Gender" value={patientInfo.gender} icon="male-female-outline" /></View>
              <View style={{flex: 1}}><InfoRow label="D.O.B" value={patientInfo.dob} icon="calendar-clear-outline" /></View>
            </View>
          </View>

          {/* APPOINTMENT/ORDER INFO CARD */}
          <View style={[styles.glassCard, { marginTop: 20 }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="medical-outline" size={24} color="#FFF" />
              <Text style={styles.cardTitle}>Medical Context</Text>
            </View>
            <View style={styles.separator} />
            
            <InfoRow label="Prescribing Doctor" value={orderData.drName} icon="medkit-outline" />
            <InfoRow label="Appointment Date" value={orderData.date} icon="time-outline" />
            <InfoRow label="Order ID" value={orderData.id} icon="barcode-outline" />
            <InfoRow label="Current Status" value={orderData.status} icon="stats-chart-outline" />
          </View>

          {/* PRESCRIPTION PREVIEW BUTTON */}
          <TouchableOpacity style={styles.prescriptionBtn} activeOpacity={0.8}>
            <Ionicons name="document-text-outline" size={24} color="#383981" />
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
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  backBtn: { padding: 5 },
  scrollContent: { padding: 20 },
  
  glassCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 30, 
    padding: 20, 
    borderWidth: 1.5, 
    borderColor: 'rgba(255, 255, 255, 0.25)' 
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  cardTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  separator: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 15 },
  
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  iconWrapper: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  textWrapper: { marginLeft: 15 },
  label: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  value: { color: '#FFF', fontSize: 16, fontWeight: '600', marginTop: 2 },
  
  horizontalRow: { flexDirection: 'row' },
  
  prescriptionBtn: { 
    marginTop: 30, 
    backgroundColor: '#FFF', 
    height: 60, 
    borderRadius: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 5
  },
  prescriptionBtnText: { color: '#383981', fontSize: 16, fontWeight: 'bold', marginLeft: 10 }
});

export default MedicationDetailsScreen;