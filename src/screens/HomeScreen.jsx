import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, View, Text, ImageBackground, Image, 
  ScrollView, TouchableOpacity, StatusBar, Dimensions 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// FIXED IMPORT
import BannerCarousel from './BannerCarousel'; 

const { width } = Dimensions.get('window');

// UPDATED DATA: Replaced Orders with History to match your request
const services = [
  { id: 1, title: 'Lab Test', icon: 'flask-outline', screen: 'LabTestScreen' },
  { id: 2, title: 'Medicine', icon: 'medical-outline', screen: 'MedicineScreen' },
  { id: 3, title: 'History', icon: 'time-outline', screen: 'AppointmentHistory' }, 
  { id: 4, title: 'Consult', icon: 'videocam-outline', screen: 'ConsultScreen' },
];

const bannerData = [
  { 
    id: '1', 
    title: 'Care2Connect', 
    subTitle: 'Your Health, Our Priority', 
    color: '#383981', 
    isVideo: true, 
    videoPath: require('../assets/videos/demo.mp4'), 
    screen: 'GlassDoctorList' 
  },
  { 
    id: '2', 
    title: 'Full Body Checkup', 
    subTitle: '80+ tests included', 
    color: '#4A90E2', 
    isVideo: false,
    image: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png', 
    screen: 'GlassDoctorList' 
  },
];

const DoctorItem = ({ name, spec, exp, likes, imageUri, isNew, onBook, onView }) => (
    <View style={styles.programItem}>
        <TouchableOpacity onPress={onView} activeOpacity={0.8}>
            <Image source={{ uri: imageUri }} style={styles.programImage} />
            {isNew && (
                <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                </View>
            )}
        </TouchableOpacity>
        
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={onView}>
                <Text style={styles.itemTitle}>{name}</Text>
                <Text style={styles.itemSub}>{spec}</Text>
            </TouchableOpacity>
            <View style={styles.chipRow}>
                <View style={styles.chip}>
                    <Ionicons name="thumbs-up" size={10} color="#fff" />
                    <Text style={styles.chipText}> {likes}</Text>
                </View>
                <View style={styles.chip}><Text style={styles.chipText}>{exp}</Text></View>
            </View>
        </View>

        <TouchableOpacity style={styles.miniBookBtn} onPress={onBook}>
            <Text style={styles.miniBookText}>Book</Text>
        </TouchableOpacity>
    </View>
);

const HomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const headerHeight = (insets.top > 0 ? insets.top : 20) + 65;

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/7d/92/38/7d923880728193337fe46ec6c8e26184.jpg' }} 
      style={styles.container}
      blurRadius={10} 
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: headerHeight + 15 }]} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeHeader}>
          <View>
            <Text style={styles.greetingText}>{getGreeting()},</Text>
            <Text style={styles.welcomeText}>Welcome back!</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          </View>
        </View>

        <View style={styles.gridContainer}>
          {services.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.gridItem}
              onPress={() => item.screen && navigation.navigate(item.screen)}
            >
              <View style={styles.iconCircle}>
                <Ionicons name={item.icon} size={26} color="#fff" />
              </View>
              <Text style={styles.gridLabel} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <BannerCarousel 
          data={bannerData} 
          onBannerPress={(item) => navigation.navigate(item.screen)} 
        />

        {/* UPCOMING APPOINTMENT: Matches your original glass card style */}
        <View style={styles.glassCardLarge}>
          <View style={styles.upcomingHeader}>
            <Text style={styles.programTitle}>Upcoming Appointment</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AppointmentHistory')}>
                <Text style={styles.viewHistoryText}>View History</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.upcomingBookingCard}
            onPress={() => navigation.navigate('AppointmentHistory')}
          >
            <View style={styles.doctorInfoRow}>
                <Image source={{ uri: 'https://randomuser.me/api/portraits/men/15.jpg' }} style={styles.miniDocImg} />
                <View style={{ marginLeft: 12 }}>
                    <Text style={styles.itemTitle}>Dr. Anurag Tiwari</Text>
                    <Text style={styles.itemSub}>Orthopedic Surgeon</Text>
                </View>
            </View>
            <View style={styles.bookingDetailsRow}>
                <View style={styles.chip}>
                    <Ionicons name="calendar-outline" size={12} color="#fff" />
                    <Text style={styles.chipText}> 10 April, 2026</Text>
                </View>
                <View style={styles.chip}>
                    <Ionicons name="time-outline" size={12} color="#fff" />
                    <Text style={styles.chipText}> 10:00 AM</Text>
                </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.glassCardLarge, { marginTop: 20 }]}>
          <Text style={styles.programTitle}>Recent & New Doctors</Text>
          
          <DoctorItem 
            name="Dr. Anurag Tiwari" 
            spec="Orthopedic Surgeon" 
            exp="16 Years" 
            likes="100%"
            imageUri="https://randomuser.me/api/portraits/men/15.jpg"
            onView={() => navigation.navigate('DoctorProfile')}
            onBook={() => navigation.navigate('AppointmentBooking', {
                doctorName: 'Dr. Anurag Tiwari',
                doctorPic: 'https://randomuser.me/api/portraits/men/15.jpg',
                doctorDegree: 'MBBS, MS - Orthopaedics'
            })}
          />

          <DoctorItem 
            name="Dr. Ashish Gohiya" 
            spec="Orthopedist" 
            exp="23 Years" 
            likes="98%"
            isNew={true}
            imageUri="https://randomuser.me/api/portraits/men/33.jpg"
            onView={() => navigation.navigate('DoctorProfile')}
            onBook={() => navigation.navigate('AppointmentBooking', {
                doctorName: 'Dr. Ashish Gohiya',
                doctorPic: 'https://randomuser.me/api/portraits/men/33.jpg',
                doctorDegree: 'Orthopedist'
            })}
          />

          <TouchableOpacity 
            style={styles.fullProgramBtn}
            onPress={() => navigation.navigate('GlassDoctorList')}
          >
            <Text style={styles.btnText}>View All Doctors</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  welcomeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25, paddingHorizontal: 5 },
  greetingText: { color: 'rgba(255,255,255,0.7)', fontSize: 16, fontWeight: '400' },
  welcomeText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  timeContainer: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  timeText: { color: '#fff', fontSize: 14, fontWeight: '600' },

  gridContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  gridItem: { alignItems: 'center', width: (width - 60) / 4 },
  iconCircle: { width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  gridLabel: { color: '#fff', marginTop: 8, fontSize: 12, fontWeight: '500', textAlign: 'center' },

  // Styles for Upcoming Section
  upcomingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  viewHistoryText: { color: '#5CF08C', fontSize: 12, fontWeight: '600' },
  upcomingBookingCard: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 15, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  doctorInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  miniDocImg: { width: 45, height: 45, borderRadius: 12 },
  bookingDetailsRow: { flexDirection: 'row', justifyContent: 'space-between' },

  glassCardLarge: { backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: 40, padding: 20, borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.25)', marginTop: 10 },
  programTitle: { color: '#fff', fontSize: 18, fontWeight: '500' },
  programItem: { flexDirection: 'row', marginBottom: 30, alignItems: 'center' },
  programImage: { width: 65, height: 65, borderRadius: 20, marginRight: 15 },
  itemTitle: { color: '#fff', fontSize: 18, fontWeight: '500' },
  itemSub: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 8 },
  chipRow: { flexDirection: 'row' },
  chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 8 },
  chipText: { color: '#fff', fontSize: 10 },
  newBadge: { position: 'absolute', top: -5, left: -5, backgroundColor: '#5CF08C', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  newBadgeText: { fontSize: 8, fontWeight: 'bold', color: '#1A1A1A' },
  miniBookBtn: { backgroundColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' },
  miniBookText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  fullProgramBtn: { backgroundColor: 'rgba(255,255,255,0.35)', paddingVertical: 20, borderRadius: 35, alignItems: 'center', marginTop: 5, borderWidth: 1, borderColor: '#fff' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' }
});

export default HomeScreen;