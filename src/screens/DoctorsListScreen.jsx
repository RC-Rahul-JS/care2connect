import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, View, Text, Image, TextInput, 
  ScrollView, TouchableOpacity, Dimensions,
  StatusBar
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import your custom components
import BottomNavBar from './BottomNavBar'; 
import BannerCarousel from './BannerCarousel';
import SpecialitySection from './SpecialitySection';
import CommunityQA from './CommunityQA';
import PlatformStats from './PlatformStats';
import ServiceQuickLinks from './ServiceQuickLinks'; // Added this import

const { width } = Dimensions.get('window');

const bannerData = [
  { id: '1', title: 'Affordable Procedures\nby Expert Doctors', subTitle: 'Piles, Pregnancy, Knee...', color: '#4A90E2', image: 'https://cdn-icons-png.flaticon.com/512/2785/2785482.png', screen: 'FindDoctorsScreen' },
  { id: '2', title: 'Full Body Checkup', subTitle: '80+ tests included', color: '#383981', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png', screen: 'FindDoctorsScreen' },
];

const DoctorsListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [location, setLocation] = useState("Bhopal");

  useEffect(() => {
    if (route.params?.selectedCity) {
      setLocation(route.params.selectedCity);
    }
  }, [route.params?.selectedCity]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* 1. HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#383981" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.locationContainer}
              onPress={() => navigation.navigate('LocationSelection')} 
            >
              <Ionicons name="location-sharp" size={22} color="#383981" />
              <Text style={styles.locationText}>{location}</Text>
              <Ionicons name="chevron-down" size={18} color="#383981" />
            </TouchableOpacity>
          </View>

          {/* 2. SEARCH BAR */}
          <View style={styles.searchRow}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#8A96AB" style={styles.searchIcon} />
              <TextInput 
                style={styles.searchInput} 
                placeholder="Search for doctors" 
                placeholderTextColor="#8A96AB" 
              />
            </View>
            <TouchableOpacity style={styles.careAiBtn}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2913/2913446.png' }} style={styles.aiLogoIcon} />
              <Text style={styles.aiText}>Ask{"\n"}Care Ai</Text>
            </TouchableOpacity>
          </View>

          {/* 3. SERVICE QUICK LINKS (The UI you requested) */}
          <ServiceQuickLinks />

          {/* 4. MAIN CONSULTATION BANNERS */}
          <View style={styles.bannerRow}>
            <TouchableOpacity 
              style={[styles.banner, { backgroundColor: '#E3F2FD' }]}
              onPress={() => navigation.navigate('FindDoctorsScreen')}
            >
              <Text style={styles.bannerTitle}>In-Person{"\n"}Consultation</Text>
              <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.bannerDoctorImg} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.banner, { backgroundColor: '#F0F4F8' }]}
              onPress={() => navigation.navigate('OnlineConsultScreen')}
            >
              <Text style={styles.bannerTitle}>Video{"\n"}Consultation</Text>
              <View style={styles.phoneFrame}>
                  <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.doctorInPhone} />
              </View>
            </TouchableOpacity>
          </View>

          {/* 5. AUTO-SLIDING BANNER */}
          <BannerCarousel 
            data={bannerData} 
            onBannerPress={(item) => navigation.navigate(item.screen)} 
          />

          {/* 6. SPECIALITIES GRID */}
          <SpecialitySection />

          {/* 7. Q&A SECTION */}
          <CommunityQA />

          {/* 8. STATS SECTION */}
          <PlatformStats />

        </ScrollView>

        {/* BOTTOM NAVIGATION */}
        <BottomNavBar activeTab="Home" navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFC' },
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 110 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, marginTop: 5 },
  backBtn: { padding: 5, marginRight: 10 },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', marginHorizontal: 5 },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  searchContainer: { 
    flex: 1, flexDirection: 'row', backgroundColor: '#FFF', 
    borderRadius: 15, alignItems: 'center', height: 55, 
    paddingHorizontal: 15, elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 5
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#1A1A1A' },
  careAiBtn: { 
    marginLeft: 12, width: 80, height: 55, borderRadius: 15, 
    backgroundColor: '#FFF', elevation: 2, alignItems: 'center', 
    justifyContent: 'center', borderWidth: 1, borderColor: '#E8EDF2' 
  },
  aiLogoIcon: { width: 22, height: 22, tintColor: '#4A90E2' },
  aiText: { color: '#4A90E2', fontSize: 10, fontWeight: '800', textAlign: 'center' },
  bannerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 10 },
  banner: { width: (width - 55) / 2, height: 140, borderRadius: 20, padding: 15, overflow: 'hidden' },
  bannerTitle: { fontSize: 15, fontWeight: '700', color: '#1A1A1A' },
  bannerDoctorImg: { position: 'absolute', bottom: 0, right: 0, width: 80, height: 100, resizeMode: 'contain' },
  phoneFrame: { 
    position: 'absolute', bottom: 10, right: 10, width: 45, height: 80, 
    borderRadius: 8, borderWidth: 2, borderColor: '#333', overflow: 'hidden' 
  },
  doctorInPhone: { width: '100%', height: '100%' },
});

export default DoctorsListScreen;