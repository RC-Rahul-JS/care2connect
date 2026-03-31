import React from 'react';
import { 
  StyleSheet, View, Text, ImageBackground, Image, 
  ScrollView, TouchableOpacity, StatusBar, Dimensions 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// --- SUB-COMPONENT FOR DOCTOR ITEMS ---
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
        {/* 1. DOCTOR PROFILE HEADER */}
        <View style={styles.doctorHeader}>
          <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
          <View>
            <Text style={styles.doctorName}>Richard Brown</Text>
            <View style={styles.tagRow}>
              <View style={styles.glassTag}><Text style={styles.tagText}>Cardiologist</Text></View>
              <View style={[styles.glassTag, { marginLeft: 8, flexDirection: 'row', alignItems: 'center' }]}>
                <Text style={styles.tagText}>4.9 </Text>
                <Icon name="star" size={10} color="#fff" fill="#fff" />
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.description}>
          Richard is an invasive, non-interventional cardiologist. Specializes in the diagnosis and treatment of cardiovascular diseases... <Text style={styles.moreLink}>More</Text>
        </Text>

        {/* 2. STATS CARDS */}
        <View style={styles.statsRow}>
          <View style={styles.glassCardSmall}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardLabel}>17 August</Text>
              <MaterialIcon name="toggle-switch" color="#5CF08C" size={32} />
            </View>
            <Text style={styles.cardMainTitle}>Sunday</Text>
            <Text style={styles.cardTime}>10:30-11:30</Text>
            <Text style={styles.cardFooterText}>Weekly visit</Text>
          </View>

          <View style={styles.glassCardSmall}>
            <Text style={styles.cardLabel}>Semi-annual{"\n"}Recovery Dynamics</Text>
            <Text style={styles.cardMainTitle}>Get better</Text>
            <Text style={styles.cardPercent}>by +126%</Text>
            <TouchableOpacity><Text style={styles.cardSeeMore}>See more</Text></TouchableOpacity>
          </View>
        </View>

        {/* 3. RECENT & NEW DOCTORS (REPLACED HEALING PROGRAM) */}
        <View style={styles.glassCardLarge}>
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
  onPress={() => navigation.navigate('GlassDoctorList')} // Changed from 'DoctorsList' to 'GlassDoctorList'
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
  doctorHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 90, height: 90, borderRadius: 25, marginRight: 15 },
  doctorName: { color: '#fff', fontSize: 34, fontWeight: '400' },
  tagRow: { flexDirection: 'row', marginTop: 4 },
  glassTag: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  tagText: { color: '#fff', fontSize: 12 },
  description: { color: 'rgba(255,255,255,0.9)', lineHeight: 22, marginBottom: 25, fontSize: 16 },
  moreLink: { color: '#fff', fontWeight: 'bold', textDecorationLine: 'underline' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  glassCardSmall: { width: '48%', backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: 18, borderRadius: 30, borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.35)' },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  cardMainTitle: { color: '#fff', fontSize: 26, fontWeight: '500', marginTop: 15 },
  cardTime: { color: '#fff', fontSize: 18, opacity: 0.9 },
  cardPercent: { color: '#fff', fontSize: 20, fontWeight: '400' },
  cardSeeMore: { color: '#fff', fontSize: 12, textDecorationLine: 'underline', marginTop: 10 },
  cardFooterText: { color: 'rgba(255,255,255,0.6)', marginTop: 20, fontSize: 12 },
  glassCardLarge: { backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: 40, padding: 20, borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.25)' },
  programTitle: { color: '#fff', fontSize: 18, marginBottom: 25, fontWeight: '500' },
  programItem: { flexDirection: 'row', marginBottom: 30, alignItems: 'center' },
  programImage: { width: 65, height: 65, borderRadius: 20, marginRight: 15 },
  itemTitle: { color: '#fff', fontSize: 18, fontWeight: '500' },
  itemSub: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 8 },
  chipRow: { flexDirection: 'row' },
  chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 8 },
  chipText: { color: '#fff', fontSize: 10 },
  
  // NEW UI ELEMENTS
  newBadge: { position: 'absolute', top: -5, left: -5, backgroundColor: '#5CF08C', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  newBadgeText: { fontSize: 8, fontWeight: 'bold', color: '#1A1A1A' },
  miniBookBtn: { backgroundColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' },
  miniBookText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  fullProgramBtn: { backgroundColor: 'rgba(255,255,255,0.35)', paddingVertical: 20, borderRadius: 35, alignItems: 'center', marginTop: 5, borderWidth: 1, borderColor: '#fff' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' }
});

export default HomeScreen;