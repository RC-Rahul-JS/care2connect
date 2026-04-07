import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Image, ScrollView,
  TouchableOpacity, Dimensions, StatusBar, ImageBackground, FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const AppointmentHistoryScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const appointments = [
    {
      id: '1',
      doctorName: 'Dr. Anurag Tiwari',
      specialty: 'Orthopaedics',
      date: '2026-04-10',
      time: '10:00 AM - 11:00 AM',
      status: 'Upcoming',
      doctorPic: 'https://randomuser.me/api/portraits/men/15.jpg',
      // In a real app, these details would come from your database
      patientName: 'Rahul',
      fatherName: 'Mr. Sharma',
      gender: 'Male',
      dob: '15/08/1995'
    },
    {
      id: '2',
      doctorName: 'Dr. Smita Patil',
      specialty: 'Cardiologist',
      date: '2026-03-25',
      time: '02:00 PM - 03:00 PM',
      status: 'Completed',
      doctorPic: 'https://randomuser.me/api/portraits/women/12.jpg',
    }
  ];

  const filteredAppointments = appointments.filter(item => item.status === activeTab);

  const renderAppointmentCard = ({ item }) => (
    <View style={styles.glassCard}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.doctorPic }} style={styles.doctorImg} />
        <View style={styles.doctorInfo}>
          <Text style={styles.nameText}>{item.doctorName}</Text>
          <Text style={styles.specialtyText}>{item.specialty}</Text>
        </View>
        <View style={[styles.statusBadge, 
          item.status === 'Completed' ? styles.statusSuccess : 
          item.status === 'Cancelled' ? styles.statusDanger : styles.statusInfo]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.cardFooter}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={16} color="#FFF" />
          <Text style={styles.footerText}>{item.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color="#FFF" />
          <Text style={styles.footerText}>{item.time}</Text>
        </View>
      </View>
      
      {item.status === 'Upcoming' && (
        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => navigation.navigate('AppointmentBooking', {
            isRescheduling: true,
            doctorName: item.doctorName,
            doctorPic: item.doctorPic,
            doctorDegree: item.specialty,
            existingPatientName: item.patientName,
            existingFatherName: item.fatherName,
            existingGender: item.gender,
            existingDob: item.dob
          })}
        >
          <Text style={styles.actionBtnText}>Reschedule</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/7d/92/38/7d923880728193337fe46ec6c8e26184.jpg' }} 
      style={styles.container}
      blurRadius={15}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassIconBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Appointments</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.tabContainer}>
          {['Upcoming', 'Completed', 'Cancelled'].map((tab) => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.tabBtn, activeTab === tab && styles.activeTabBtn]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.id}
          renderItem={renderAppointmentCard}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={80} color="rgba(255,255,255,0.3)" />
              <Text style={styles.emptyText}>No {activeTab} found.</Text>
            </View>
          }
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between' },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFF' },
  glassIconBtn: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 12 },
  tabContainer: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 15, padding: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', marginBottom: 20 },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  activeTabBtn: { backgroundColor: '#FFF' },
  tabText: { color: 'rgba(255,255,255,0.7)', fontWeight: '600', fontSize: 13 },
  activeTabText: { color: '#383981' },
  listContent: { paddingHorizontal: 20, paddingBottom: 30 },
  glassCard: { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 25, padding: 15, marginBottom: 15, borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  doctorImg: { width: 60, height: 60, borderRadius: 18 },
  doctorInfo: { marginLeft: 12, flex: 1 },
  nameText: { fontSize: 17, fontWeight: '700', color: '#FFF' },
  specialtyText: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusInfo: { backgroundColor: 'rgba(92, 240, 140, 0.2)' },
  statusSuccess: { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
  statusDanger: { backgroundColor: 'rgba(255, 100, 100, 0.3)' },
  statusText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  footerText: { color: '#FFF', fontSize: 12, marginLeft: 6 },
  actionBtn: { backgroundColor: '#FFF', marginTop: 15, padding: 10, borderRadius: 12, alignItems: 'center' },
  actionBtnText: { color: '#383981', fontWeight: '700', fontSize: 14 },
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: 'rgba(255,255,255,0.5)', marginTop: 10, fontSize: 16 }
});

export default AppointmentHistoryScreen;