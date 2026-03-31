import React from 'react';
import {
  StyleSheet, View, Text, Image, ScrollView, 
  TouchableOpacity, Dimensions, Share, StatusBar, ImageBackground, Linking, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const DoctorProfileScreen = ({ navigation, route }) => {
  // 1. DATA (Prioritizing route params, falling back to static data)
  const doctor = route.params?.doctorData || {
    name: 'Dr. Anurag Tiwari',
    specs: 'Orthopedic surgeon, Joint Replacement Surgeon, Trauma Surgeon',
    degrees: 'MS - Orthopaedics, MBBS, DNB - Orthopedics',
    exp: '16 Years overall experience',
    likes: '100%',
    stories: '18 Patient Stories',
    pic: 'https://randomuser.me/api/portraits/men/15.jpg',
    hospital: 'Paliwal Hospital',
    location: 'Habib Ganj, Bhopal',
    fee: '₹ 500 fee',
    lat: 23.2333,
    lng: 77.4333,
    about: 'Dr. Anurag Tiwari is a highly skilled Orthopedic surgeon in Bhopal. He specializes in Joint Replacement and complex trauma surgeries with over 16 years of clinical excellence.',
    services: ['Spinal Fusion', 'Joint Pain Treatment', 'Arthroscopy', 'Spine Surgery', 'ACL Reconstruction']
  };

  // 2. NATIVE ACTIONS
  const onShare = async () => {
    try {
      await Share.share({ message: `Check out ${doctor.name} on Care2Connect!` });
    } catch (e) { console.log(e); }
  };

  const openMaps = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const url = `${scheme}${doctor.lat},${doctor.lng}(${doctor.hospital})`;
    Linking.openURL(url);
  };

  const goToBooking = () => {
    navigation.navigate('AppointmentBooking', { 
      doctorName: doctor.name,
      doctorPic: doctor.pic,
      doctorDegree: doctor.degrees || doctor.degree,
      doctorAddress: doctor.location || doctor.address
    });
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/7d/92/38/7d923880728193337fe46ec6c8e26184.jpg' }} 
      style={styles.container}
      blurRadius={15} 
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        
        {/* GLASS HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassIconBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Doctor Profile</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={onShare} style={styles.glassIconBtn}>
              <Ionicons name="share-social-outline" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          
          {/* 1. PROFILE TOP SECTION */}
          <View style={styles.glassCardTop}>
            <Image source={{ uri: doctor.pic }} style={styles.avatar} />
            <View style={styles.topInfo}>
              <Text style={styles.name}>{doctor.name}</Text>
              <Text style={styles.specs}>{doctor.specs}</Text>
              <Text style={styles.degrees}>{doctor.degrees}</Text>
              <View style={styles.ratingRow}>
                <View style={styles.glassBadge}>
                   <Ionicons name="thumbs-up" size={14} color="#FFF" />
                   <Text style={styles.badgeText}> {doctor.likes}</Text>
                </View>
                <View style={[styles.glassBadge, {marginLeft: 10}]}>
                   <Text style={styles.badgeText}>{doctor.exp}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* 2. CLINIC BOOKING CARD (REPLACED CALL WITH BOOK) */}
          <View style={styles.bookingCard}>
            <View style={styles.cardHeader}>
               <Ionicons name="calendar" size={18} color="#FFF" />
               <Text style={styles.cardHeaderTitle}>Clinic Appointment</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.hospitalRow}>
                 <View style={{flex: 1}}>
                    <Text style={styles.hospitalName}>{doctor.hospital}</Text>
                    <Text style={styles.hospitalLoc}>{doctor.location}</Text>
                 </View>
                 <Text style={styles.feeText}>{doctor.fee}</Text>
              </View>
              <TouchableOpacity style={styles.primaryBtn} onPress={goToBooking}>
                <Ionicons name="bookmark" size={18} color="#FFF" />
                <Text style={styles.primaryBtnText}> Book Clinic Visit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 3. PATIENT STORIES STATS */}
          <View style={styles.glassSection}>
            <Text style={styles.sectionTitle}>{doctor.stories}</Text>
            <Text style={styles.sectionDesc}>Based on patient experiences and feedback.</Text>
            <View style={styles.statsContainer}>
              <Ionicons name="checkmark-circle" size={30} color="#FFF" />
              <View style={{marginLeft: 15}}>
                <Text style={styles.percentText}>100% Recommendation</Text>
                <Text style={styles.statsSub}>Patients recommend visiting this doctor</Text>
              </View>
            </View>
          </View>

          {/* 4. MAP SECTION */}
          <View style={styles.glassSection}>
            <Text style={styles.sectionTitle}>Clinic Location</Text>
            <TouchableOpacity onPress={openMaps} style={styles.mapBox}>
               <Image 
                  source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=23.2333,77.4333&zoom=15&size=600x300&markers=color:red%7C23.2333,77.4333&key=YOUR_KEY' }} 
                  style={styles.mapImg}
               />
               <View style={styles.mapOverlay}><Text style={styles.mapLabel}>Open Google Maps</Text></View>
            </TouchableOpacity>
          </View>

          {/* 5. ABOUT & SERVICES */}
          <View style={styles.glassSection}>
            <Text style={styles.sectionTitle}>About the Doctor</Text>
            <Text style={styles.aboutText}>{doctor.about}</Text>
            
            <Text style={[styles.sectionTitle, {marginTop: 25}]}>Service & Procedures</Text>
            <View style={styles.serviceGrid}>
              {doctor.services.map((s, i) => (
                <View key={i} style={styles.serviceTag}>
                  <Text style={styles.serviceText}>{s}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* 6. FOOTER FOOTER (REPLACED CALL WITH BOOK) */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.bookNowBtn} onPress={goToBooking}>
            <Text style={styles.bookNowText}>Book Appointment Now</Text>
          </TouchableOpacity>
        </View>
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
  headerRight: { flexDirection: 'row' },
  
  scroll: { flex: 1, paddingHorizontal: 20 },
  
  glassCardTop: { flexDirection: 'row', padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 30, marginTop: 10, borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' },
  avatar: { width: 85, height: 85, borderRadius: 20 },
  topInfo: { flex: 1, marginLeft: 15 },
  name: { fontSize: 22, fontWeight: '700', color: '#FFF' },
  specs: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  degrees: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  glassBadge: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: '600' },

  bookingCard: { marginVertical: 20, borderRadius: 30, backgroundColor: 'rgba(255, 255, 255, 0.25)', overflow: 'hidden', borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' },
  cardHeader: { backgroundColor: 'rgba(255,255,255,0.15)', padding: 15, flexDirection: 'row', alignItems: 'center' },
  cardHeaderTitle: { fontSize: 14, fontWeight: '700', color: '#FFF', marginLeft: 8 },
  cardBody: { padding: 20 },
  hospitalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  hospitalName: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  hospitalLoc: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  feeText: { fontSize: 18, fontWeight: '800', color: '#FFF' },
  
  primaryBtn: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 20, padding: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FFF' },
  primaryBtnText: { color: '#FFF', fontWeight: '700', fontSize: 15 },

  glassSection: { padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 30, marginBottom: 15, borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#FFF', marginBottom: 10 },
  sectionDesc: { fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 18, marginBottom: 15 },
  statsContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: 15, borderRadius: 20 },
  percentText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  statsSub: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },

  mapBox: { height: 150, borderRadius: 20, overflow: 'hidden', marginTop: 10 },
  mapImg: { width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.1)' },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.1)', justifyContent: 'center', alignItems: 'center' },
  mapLabel: { backgroundColor: '#FFF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 10, fontSize: 12, fontWeight: '700', color: '#383981' },

  aboutText: { fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 22 },
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  serviceTag: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginRight: 8, marginBottom: 8 },
  serviceText: { color: '#FFF', fontSize: 12 },

  footer: { padding: 20, backgroundColor: 'transparent' },
  bookNowBtn: { backgroundColor: '#FFF', padding: 18, borderRadius: 25, alignItems: 'center', elevation: 5 },
  bookNowText: { color: '#383981', fontWeight: '800', fontSize: 16 },
  bottomSpacer: { height: 20 }
});

export default DoctorProfileScreen;