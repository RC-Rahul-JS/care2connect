import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const videoDoctors = [
  {
    id: '1',
    name: 'Dr. Yajuvendra Gawai',
    spec: 'Orthopedist',
    exp: '27 years experience overall',
    likes: '95%',
    stories: '168 Patient Stories',
    treated: '380 Patients Treated',
    location: 'Santacruz West',
    clinic: "Dr. Gawai's Sports Medicine And Arthroscopy Clinic",
    fees: '2500',
    time: '06:00 PM, today for video',
    img: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Dr. Uday M Pawar',
    spec: 'Orthopedist',
    exp: '26 years experience overall',
    likes: '90%',
    stories: '41 Patient Stories',
    treated: '4 Patients Treated',
    location: 'Andheri West',
    clinic: 'OrthoDocs Speciality Clinic',
    fees: '2500',
    time: '11:00 AM, tomorrow',
    img: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
];

const VideoDoctorList = () => {
  const renderDoctorCard = ({ item }) => (
    <View style={styles.card}>
      {/* 1. Profile Info Row */}
      <View style={styles.mainRow}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.img }} style={styles.doctorImg} />
          <View style={styles.videoIconBadge}>
            <Ionicons name="videocam" size={12} color="#FFF" />
          </View>
        </View>

        <View style={styles.infoCol}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Ionicons name="checkmark-circle" size={18} color="#8A96AB" />
          </View>
          <Text style={styles.specText}>{item.spec}</Text>
          <Text style={styles.expText}>{item.exp}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statLine}>
              <Ionicons name="thumbs-up" size={14} color="#4CAF50" />
              <Text style={styles.statValue}>{item.likes}</Text>
            </View>
            <View style={[styles.statLine, { marginLeft: 12 }]}>
              <Ionicons name="chatbox-ellipses" size={14} color="#4CAF50" />
              <Text style={styles.statValue}>{item.stories}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 2. Green "Patients Treated" Badge */}
      <View style={styles.treatedBadge}>
        <MaterialCommunityIcons name="hands-pray" size={18} color="#2E7D32" />
        <Text style={styles.treatedText}>{item.treated}</Text>
      </View>

      {/* 3. Location & Fees */}
      <View style={styles.locationBox}>
        <Text style={styles.locText}>
          <Text style={{ fontWeight: '700', color: '#1A1A1A' }}>{item.location}</Text> • {item.clinic}
        </Text>
        <Text style={styles.feesText}>~ ₹ {item.fees} Consultation Fees</Text>
      </View>

      <View style={styles.cardDivider} />

      {/* 4. Footer: Availability & Purple Button */}
      <View style={styles.footerRow}>
        <View>
          <Text style={styles.availHeader}>NEXT AVAILABLE AT</Text>
          <Text style={styles.availTime}>
            <Ionicons name="videocam-outline" size={14} color="#4A4A4A" /> {item.time}
          </Text>
        </View>
        <TouchableOpacity style={styles.bookBtn}>
          <Text style={styles.bookBtnText}>Book Video Consult</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* FILTER BUTTONS ROW */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterPill}>
          <Text style={styles.pillText}>Now or Later</Text>
          <Ionicons name="chevron-down" size={14} color="#4A4A4A" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterPill}>
          <Text style={styles.pillText}>Sort/Filters</Text>
        </TouchableOpacity>
      </View>

      {/* SECTION HEADER */}
      <View style={styles.listHeader}>
        <Ionicons name="time" size={18} color="#1A1A1A" />
        <Text style={styles.headerTitleText}>Doctors Available Later</Text>
      </View>

      {/* ACTUAL LIST */}
      <FlatList
        data={videoDoctors}
        renderItem={renderDoctorCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  
  // Filter pill styles
  filterContainer: { 
    flexDirection: 'row', 
    padding: 15, 
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#F0F4F8'
  },
  filterPill: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#DCDFE6',
    marginRight: 10
  },
  pillText: { fontSize: 13, color: '#1A1A1A', fontWeight: '500', marginRight: 5 },

  // Header styles
  listHeader: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  headerTitleText: { fontSize: 15, fontWeight: '700', marginLeft: 10, color: '#1A1A1A' },

  // Card styles
  card: { backgroundColor: '#FFF', padding: 15, marginBottom: 8 },
  mainRow: { flexDirection: 'row' },
  imageContainer: { position: 'relative' },
  doctorImg: { width: 90, height: 90, borderRadius: 45 },
  videoIconBadge: { 
    position: 'absolute', bottom: 2, right: 0, 
    backgroundColor: '#7C4DFF', borderRadius: 12, 
    padding: 5, borderWidth: 2, borderColor: '#FFF' 
  },
  infoCol: { flex: 1, marginLeft: 15 },
  nameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  nameText: { fontSize: 17, fontWeight: '700', color: '#383981' },
  specText: { color: '#4A4A4A', fontSize: 13, marginTop: 2 },
  expText: { color: '#8A96AB', fontSize: 13, marginTop: 2 },
  statsRow: { flexDirection: 'row', marginTop: 8 },
  statLine: { flexDirection: 'row', alignItems: 'center' },
  statValue: { fontSize: 13, fontWeight: '700', color: '#4CAF50', marginLeft: 5 },

  treatedBadge: { 
    flexDirection: 'row', backgroundColor: '#F1F8E9', 
    padding: 12, borderRadius: 10, marginTop: 15, alignItems: 'center' 
  },
  treatedText: { marginLeft: 10, fontSize: 13, fontWeight: '700', color: '#1A1A1A' },

  locationBox: { marginTop: 15 },
  locText: { fontSize: 13, color: '#4A4A4A', lineHeight: 18 },
  feesText: { fontSize: 13, color: '#1A1A1A', fontWeight: '600', marginTop: 5 },

  cardDivider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },

  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  availHeader: { fontSize: 10, fontWeight: '800', color: '#4CAF50', letterSpacing: 0.5 },
  availTime: { fontSize: 12, color: '#4A4A4A', marginTop: 3 },
  bookBtn: { 
    backgroundColor: '#7C4DFF', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    borderRadius: 8 
  },
  bookBtnText: { color: '#FFF', fontWeight: '700', fontSize: 13 }
});

export default VideoDoctorList;