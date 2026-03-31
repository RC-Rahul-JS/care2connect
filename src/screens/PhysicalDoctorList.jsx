import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ServiceQuickLinks from './ServiceQuickLinks'; // <--- Import here

const { width } = Dimensions.get('window');

const physicalData = [
  {
    id: 'ad1',
    type: 'AD',
    name: 'Gohiya Ortho Clinic',
    spec: '1 Orthopedist',
    exp: '23 - 23 years experience',
    likes: '97%',
    stories: '456 Patient Stories',
    location: 'Jawahar Chowk',
    fees: '₹500',
    img: 'https://cdn-icons-png.flaticon.com/512/2913/2913446.png', 
  },
  {
    id: 'doc1',
    type: 'DOC',
    name: 'Dr. Anurag Tiwari',
    spec: 'Orthopedist',
    exp: '16 years experience overall',
    likes: '100%',
    stories: '18 Patient Stories',
    location: 'Habib Ganj • paliwal hospital',
    nextAvail: 'Call for availability',
    img: 'https://randomuser.me/api/portraits/men/15.jpg',
  },
  {
    id: 'doc2',
    type: 'DOC',
    name: 'Dr. Ashish Gohiya',
    spec: 'Orthopedist',
    exp: '23 years experience overall',
    img: 'https://randomuser.me/api/portraits/men/33.jpg',
  }
];

const PhysicalDoctorList = () => {
  // INITIALIZE NAVIGATION HOOK
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    if (item.type === 'AD') {
      return (
        <View style={styles.adCard}>
          <View style={styles.row}>
            <View style={styles.clinicImgContainer}>
               <Image source={{ uri: item.img }} style={styles.clinicLogo} />
               <Text style={styles.adTag}>AD</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.clinicName}>{item.name}</Text>
              <Text style={styles.linkText}>{item.spec}</Text>
              <Text style={styles.expText}>{item.exp}</Text>
              <View style={styles.statsRow}>
                <Ionicons name="thumbs-up" size={16} color="#4CAF50" />
                <Text style={styles.statGreen}>{item.likes}</Text>
                <Ionicons name="chatbox-ellipses" size={16} color="#4CAF50" style={{marginLeft: 10}} />
                <Text style={styles.statGreen}>{item.stories}</Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.locText}>{item.location}</Text>
          <Text style={styles.feesText}>{item.fees} <Text style={{fontWeight: '400', color: '#8A96AB'}}>Consultation Fees</Text></Text>
          
          {/* Linked to Booking Page */}
          <TouchableOpacity 
            style={styles.contactClinicBtn}
            onPress={() => navigation.navigate('AppointmentBooking', {
              doctorName: item.name,
              doctorPic: item.img,
              doctorDegree: item.spec,
              doctorAddress: item.location
            })}
          >
            <Ionicons name="calendar-check" size={18} color="#FFF" />
            <Text style={styles.contactClinicText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.docCard}>
        <View style={styles.row}>
          <Image source={{ uri: item.img }} style={styles.docAvatar} />
          <View style={styles.infoCol}>
            <Text style={styles.docName}>{item.name}</Text>
            <Text style={styles.docSpec}>{item.spec}</Text>
            <Text style={styles.expText}>{item.exp}</Text>
            {item.likes && (
              <View style={styles.statsRow}>
                <Ionicons name="thumbs-up" size={16} color="#4CAF50" />
                <Text style={styles.statGreen}>{item.likes}</Text>
                <Ionicons name="chatbox-ellipses" size={16} color="#4CAF50" style={{marginLeft: 10}} />
                <Text style={styles.statGreen}>{item.stories}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.divider} />
        <Text style={styles.locText}>{item.location}</Text>
        
        {item.nextAvail && (
          <View style={styles.availRow}>
            <Text style={styles.availTitle}>NEXT AVAILABLE AT</Text>
            <View style={styles.availTimeRow}>
               <Ionicons name="home-outline" size={14} color="#8A96AB" />
               <Text style={styles.availTimeText}> {item.nextAvail}</Text>
            </View>
          </View>
        )}

        <View style={styles.btnRow}>
          <TouchableOpacity 
        style={styles.viewProfileBtn}
        onPress={() => navigation.navigate('DoctorProfile', { doctorData: item })}
      >
        <Text style={styles.viewProfileText}>View Profile</Text>
      </TouchableOpacity>
          <TouchableOpacity 
            style={styles.bookAppointmentBtn}
            onPress={() => navigation.navigate('AppointmentBooking', {
              doctorName: item.name,
              doctorPic: item.img,
              doctorDegree: item.spec,
              doctorAddress: item.location
            })}
          >
            <Text style={styles.bookBtnText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterBar}>
        <TouchableOpacity style={styles.pill}>
          <Text style={styles.pillText}>Now or Later </Text>
          <Ionicons name="chevron-down" size={12}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pill}><Text style={styles.pillText}>Video Consult</Text></TouchableOpacity>
        <TouchableOpacity style={styles.pill}><Text style={styles.pillText}>PLUS</Text></TouchableOpacity>
        <TouchableOpacity style={styles.pill}><Text style={styles.pillText}>Sort/F</Text></TouchableOpacity>
      </View>

      <FlatList
        data={physicalData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F2F5' },
  filterBar: { flexDirection: 'row', padding: 12, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#E8EDF2' },
  pill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#DCDFE6', marginRight: 8 },
  pillText: { fontSize: 12, color: '#4A4A4A', fontWeight: '500' },

  adCard: { backgroundColor: '#FFF', padding: 15, marginBottom: 8 },
  clinicImgContainer: { alignItems: 'center' },
  clinicLogo: { width: 80, height: 80, borderRadius: 40, borderWidth: 1, borderColor: '#F0F0F0' },
  adTag: { fontSize: 9, color: '#8A96AB', marginTop: 4, fontWeight: 'bold' },
  clinicName: { fontSize: 17, fontWeight: '700', color: '#333' },
  linkText: { color: '#2196F3', textDecorationLine: 'underline', fontSize: 13, marginTop: 2 },
  contactClinicBtn: { backgroundColor: '#383981', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 14, borderRadius: 8, marginTop: 15 },
  contactClinicText: { color: '#FFF', fontWeight: '700', marginLeft: 8 },

  docCard: { backgroundColor: '#FFF', padding: 15, marginBottom: 8 },
  row: { flexDirection: 'row' },
  docAvatar: { width: 90, height: 90, borderRadius: 45 },
  infoCol: { flex: 1, marginLeft: 15 },
  docName: { fontSize: 17, fontWeight: '700', color: '#333' },
  docSpec: { color: '#4A4A4A', fontSize: 13 },
  expText: { color: '#8A96AB', fontSize: 13, marginTop: 2 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  statGreen: { fontSize: 13, fontWeight: '700', color: '#4CAF50', marginLeft: 5 },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },
  locText: { fontSize: 13, color: '#4A4A4A' },
  feesText: { fontSize: 14, fontWeight: '700', color: '#333', marginTop: 5 },

  availRow: { marginTop: 15 },
  availTitle: { fontSize: 11, fontWeight: '800', color: '#4CAF50' },
  availTimeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  availTimeText: { fontSize: 13, color: '#8A96AB' },
  
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  viewProfileBtn: { 
    width: '40%', 
    padding: 12, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#383981', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  viewProfileText: { color: '#383981', fontWeight: '700', fontSize: 13 },
  bookAppointmentBtn: { 
    width: '55%', 
    padding: 12, 
    borderRadius: 8, 
    backgroundColor: '#383981', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  bookBtnText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
});

export default PhysicalDoctorList;