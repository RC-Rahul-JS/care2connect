import React from 'react';
import {
  StyleSheet, View, Text, Image, ScrollView, 
  TouchableOpacity, Dimensions, StatusBar, ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const UserProfileScreen = ({ navigation }) => {
  // User Data (Rahul)
  const userData = {
    name: 'Rahul',
    email: 'rahulrc7089@gmail.com',
    phone: '+91 98765 43210',
    location: 'Bhopal, Madhya Pradesh',
    memberSince: 'Jan 2026',
    pic: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  const MenuOption = ({ icon, title, subtitle, onPress, color = "#FFF" }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={styles.menuTextCol}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSub}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.5)" />
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/7d/92/38/7d923880728193337fe46ec6c8e26184.jpg' }} 
      style={styles.container}
      blurRadius={15} 
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassIconBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity style={styles.glassIconBtn}>
            <Ionicons name="create-outline" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* 1. PROFILE CARD */}
          <View style={styles.glassProfileCard}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: userData.pic }} style={styles.profilePic} />
              <View style={styles.onlineBadge} />
            </View>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNum}>12</Text>
                <Text style={styles.statLabel}>Visits</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNum}>04</Text>
                <Text style={styles.statLabel}>Reports</Text>
              </View>
            </View>
          </View>

          {/* 2. GENERAL DETAILS */}
          <Text style={styles.sectionTitle}>General Details</Text>
          <View style={styles.glassMenuCard}>
            <MenuOption icon="call-outline" title="Phone Number" subtitle={userData.phone} />
            <View style={styles.lineDivider} />
            <MenuOption icon="location-outline" title="Address" subtitle={userData.location} />
            <View style={styles.lineDivider} />
            <MenuOption icon="calendar-outline" title="Member Since" subtitle={userData.memberSince} />
          </View>

          {/* 3. HISTORY & ACTIVITY */}
          <Text style={styles.sectionTitle}>Medical History</Text>
          <View style={styles.glassMenuCard}>
            <MenuOption icon="time-outline" title="Appointment History" subtitle="View all past bookings" />
            <View style={styles.lineDivider} />
            <MenuOption icon="document-text-outline" title="Medical Reports" subtitle="Prescriptions & Lab results" />
          </View>

          {/* 4. SETTINGS & SUPPORT */}
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.glassMenuCard}>
            <MenuOption icon="notifications-outline" title="Notifications" />
            <View style={styles.lineDivider} />
            <MenuOption icon="shield-checkmark-outline" title="Privacy & Security" />
            <View style={styles.lineDivider} />
            <MenuOption icon="help-circle-outline" title="Help & Support" />
            <View style={styles.lineDivider} />
            <MenuOption 
              icon="log-out-outline" 
              title="Logout" 
              color="#FF5252" 
              onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })} 
            />
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { height: 60, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: '600' },
  glassIconBtn: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 12 },
  
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  // Profile Card
  glassProfileCard: { 
    alignItems: 'center', 
    padding: 25, 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 30, 
    marginTop: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  },
  avatarWrapper: { position: 'relative' },
  profilePic: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)' },
  onlineBadge: { position: 'absolute', bottom: 5, right: 5, width: 20, height: 20, borderRadius: 10, backgroundColor: '#4CAF50', borderWidth: 3, borderColor: 'rgba(255,255,255,0.2)' },
  userName: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginTop: 15 },
  userEmail: { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  
  statsRow: { flexDirection: 'row', marginTop: 25, alignItems: 'center' },
  statItem: { alignItems: 'center', paddingHorizontal: 30 },
  statNum: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },

  // Sections
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#FFF', marginTop: 30, marginBottom: 15, marginLeft: 10 },
  glassMenuCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
    borderRadius: 25, 
    padding: 10,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  iconCircle: { width: 45, height: 45, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  menuTextCol: { flex: 1, marginLeft: 15 },
  menuTitle: { fontSize: 15, fontWeight: '600', color: '#FFF' },
  menuSub: { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  
  lineDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: 15 },
  bottomSpacer: { height: 20 }
});

export default UserProfileScreen;