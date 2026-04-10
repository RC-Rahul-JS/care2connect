import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, View, Text, ImageBackground, Image, 
  ScrollView, TouchableOpacity, StatusBar, Dimensions, FlatList 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// COMPONENTS
import BannerCarousel from './BannerCarousel'; 

const { width } = Dimensions.get('window');
const ACTIVITY_CARD_WIDTH = width * 0.85;

const services = [
  { id: 1, title: 'Medicine Orders', icon: 'receipt-outline', screen: 'MedicationHistory' },
  { id: 2, title: 'Medicine', icon: 'medical-outline', screen: 'MedicineScreen' },
  { id: 3, title: 'Appt. History', icon: 'time-outline', screen: 'AppointmentHistory' }, 
  { id: 4, title: 'Consult', icon: 'videocam-outline', screen: 'ConsultScreen' },
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

  // ACTIVITY CAROUSEL DATA (Swipeable cards like the banner)
  const recentActivity = [
    {
      id: 'act1',
      title: 'Order #ORD-882',
      sub: 'Status: Ready to Pickup',
      icon: 'cube-outline',
      image: 'https://i.pinimg.com/originals/93/29/7a/93297a78378512595e8653f538740510.jpg',
      screen: 'MedicationHistory'
    },
    {
      id: 'act2',
      title: 'Dr. Anurag Tiwari',
      sub: 'Upcoming • 10 April, 10:00 AM',
      icon: 'calendar-outline',
      image: 'https://randomuser.me/api/portraits/men/15.jpg',
      screen: 'AppointmentHistory'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const headerHeight = (insets.top > 0 ? insets.top : 20) + 65;

  const renderActivityCard = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.9}
      style={styles.activityCard}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={styles.cardLeft}>
        <Image source={{ uri: item.image }} style={styles.activityImg} />
        <View style={styles.activityIconBadge}>
           <Ionicons name={item.icon} size={12} color="#fff" />
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.activityTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.activitySub}>{item.sub}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
    </TouchableOpacity>
  );

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
        {/* WELCOME HEADER */}
        <View style={styles.welcomeHeader}>
          <View>
            <Text style={styles.greetingText}>{getGreeting()},</Text>
            <Text style={styles.welcomeText}>Welcome back!</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          </View>
        </View>

        {/* SERVICES GRID */}
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

        {/* MAIN BANNER CAROUSEL */}
        <BannerCarousel 
          data={[
            { id: '1', title: 'Care2Connect', subTitle: 'Your Health, Our Priority', isVideo: true, videoPath: require('../assets/videos/demo.mp4'), screen: 'GlassDoctorList' },
            { id: '2', title: 'Full Body Checkup', subTitle: '80+ tests included', image: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png', screen: 'GlassDoctorList' }
          ]} 
          onBannerPress={(item) => navigation.navigate(item.screen)} 
        />

        {/* SWIPEABLE RECENT ACTIVITY CAROUSEL */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Recent Activity</Text>
           <TouchableOpacity onPress={() => navigation.navigate('MedicationHistory')}>
              <Text style={styles.viewAllText}>View All</Text>
           </TouchableOpacity>
        </View>
        
        <FlatList
          data={recentActivity}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          snapToInterval={ACTIVITY_CARD_WIDTH + 15}
          decelerationRate="fast"
          renderItem={renderActivityCard}
          contentContainerStyle={{ paddingRight: 20 }}
        />

        {/* DOCTORS SECTION */}
        <View style={[styles.glassCardLarge, { marginTop: 25 }]}>
          <Text style={styles.sectionTitle}>New Doctors</Text>
          
          <DoctorItem 
            name="Dr. Anurag Tiwari" 
            spec="Orthopedic Surgeon" 
            exp="16 Years" 
            likes="100%"
            imageUri="https://randomuser.me/api/portraits/men/15.jpg"
            onView={() => navigation.navigate('DoctorProfile')}
            onBook={() => navigation.navigate('AppointmentBooking', {
                doctorName: 'Dr. Anurag Tiwari',
                doctorPic: 'https://randomuser.me/api/portraits/men/15.jpg'
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
                doctorPic: 'https://randomuser.me/api/portraits/men/33.jpg'
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
  welcomeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  greetingText: { color: 'rgba(255,255,255,0.7)', fontSize: 16 },
  welcomeText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  timeContainer: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  timeText: { color: '#fff', fontSize: 14, fontWeight: '600' },

  gridContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  gridItem: { alignItems: 'center', width: (width - 60) / 4 },
  iconCircle: { width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  gridLabel: { color: '#fff', marginTop: 8, fontSize: 11, fontWeight: '500', textAlign: 'center' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 15 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  viewAllText: { color: '#5CF08C', fontSize: 12, fontWeight: 'bold' },

  // ACTIVITY CARDS (Banner style)
  activityCard: { 
    width: ACTIVITY_CARD_WIDTH, 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 25, 
    padding: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 15,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)'
  },
  cardLeft: { position: 'relative' },
  activityImg: { width: 55, height: 55, borderRadius: 15 },
  activityIconBadge: { position: 'absolute', bottom: -5, right: -5, backgroundColor: '#383981', padding: 4, borderRadius: 8, borderWidth: 1.5, borderColor: '#fff' },
  cardRight: { flex: 1, marginLeft: 15 },
  activityTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  activitySub: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 2 },

  glassCardLarge: { backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: 35, padding: 20, borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.25)' },
  programItem: { flexDirection: 'row', marginBottom: 30, alignItems: 'center' },
  programImage: { width: 65, height: 65, borderRadius: 20, marginRight: 15 },
  itemTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
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