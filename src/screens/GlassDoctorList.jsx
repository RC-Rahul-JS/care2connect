import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, ImageBackground, Image, 
  FlatList, TouchableOpacity, StatusBar, Dimensions, TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const glassDoctorData = [
  {
    id: '1',
    name: 'Dr. Anurag Tiwari',
    spec: 'Orthopedic Surgeon',
    exp: '16 Years Exp',
    likes: '100%',
    pic: 'https://randomuser.me/api/portraits/men/15.jpg',
    degree: 'MBBS, MS - Orthopaedics',
    address: 'Habib Ganj, Bhopal'
  },
  {
    id: '2',
    name: 'Dr. Ashish Gohiya',
    spec: 'Orthopedist',
    exp: '23 Years Exp',
    likes: '98%',
    pic: 'https://randomuser.me/api/portraits/men/33.jpg',
    degree: 'Orthopedist',
    address: 'Jawahar Chowk, Bhopal'
  },
  {
    id: '3',
    name: 'Dr. Smita Patil',
    spec: 'Cardiologist',
    exp: '12 Years Exp',
    likes: '95%',
    pic: 'https://randomuser.me/api/portraits/women/44.jpg',
    degree: 'MD - Cardiology',
    address: 'Arera Colony, Bhopal'
  }
];

const GlassDoctorList = () => {
  const navigation = useNavigation();

  // --- SEARCH STATES ---
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(glassDoctorData);

  // --- SEARCH LOGIC ---
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredData(glassDoctorData);
    } else {
      const filtered = glassDoctorData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.spec.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const toggleSearch = () => {
    if (isSearching) {
      setSearchQuery('');
      setFilteredData(glassDoctorData);
    }
    setIsSearching(!isSearching);
  };

  const renderDoctorCard = ({ item }) => (
    <View style={styles.glassCard}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('DoctorProfile', { doctorData: item })}>
          <Image source={{ uri: item.pic }} style={styles.avatar} />
        </TouchableOpacity>
        
        <View style={styles.infoCol}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.specText}>{item.spec} • {item.exp}</Text>
          
          <View style={styles.tagRow}>
            <View style={styles.glassTag}>
              <Ionicons name="thumbs-up" size={12} color="#fff" />
              <Text style={styles.tagText}> {item.likes}</Text>
            </View>
            <View style={[styles.glassTag, { marginLeft: 8 }]}>
              <Text style={styles.tagText}>Verified</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.btnRow}>
        <TouchableOpacity 
          style={styles.outlineBtn}
          onPress={() => navigation.navigate('DoctorProfile', { doctorData: item })}
        >
          <Text style={styles.outlineBtnText}>Watch Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('AppointmentBooking', {
            doctorName: item.name,
            doctorPic: item.pic,
            doctorDegree: item.degree,
            doctorAddress: item.address
          })}
        >
          <Text style={styles.primaryBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/7d/92/38/7d923880728193337fe46ec6c8e26184.jpg' }} 
      style={styles.container}
      blurRadius={15} 
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="light-content" />
        
        {/* HEADER WITH SEARCH TOGGLE */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>

          {isSearching ? (
            <TextInput
              style={styles.searchBar}
              placeholder="Search doctor..."
              placeholderTextColor="rgba(255,255,255,0.6)"
              autoFocus
              value={searchQuery}
              onChangeText={handleSearch}
            />
          ) : (
            <Text style={styles.headerTitle}>All Doctors</Text>
          )}

          <TouchableOpacity onPress={toggleSearch} style={styles.backBtn}>
            <Ionicons name={isSearching ? "close" : "search"} size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredData}
          renderItem={renderDoctorCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No doctors found</Text>
          }
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 15 
  },
  headerTitle: { color: '#FFF', fontSize: 24, fontWeight: '600' },
  searchBar: { 
    flex: 1, 
    height: 45, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    color: '#fff',
    marginHorizontal: 10,
    fontSize: 16
  },
  backBtn: { padding: 5 },
  listPadding: { paddingHorizontal: 20, paddingBottom: 40 },
  emptyText: { color: '#fff', textAlign: 'center', marginTop: 50, opacity: 0.6 },

  glassCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 30, 
    padding: 20, 
    marginBottom: 20,
    borderWidth: 1.5, 
    borderColor: 'rgba(255, 255, 255, 0.3)' 
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 75, height: 75, borderRadius: 20, marginRight: 15 },
  infoCol: { flex: 1 },
  nameText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  specText: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 },
  
  tagRow: { flexDirection: 'row', marginTop: 10 },
  glassTag: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 12 
  },
  tagText: { color: '#fff', fontSize: 11, fontWeight: '600' },

  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 18 },

  btnRow: { flexDirection: 'row', justifyContent: 'space-between' },
  outlineBtn: { 
    width: '47%', 
    paddingVertical: 12, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.5)', 
    alignItems: 'center' 
  },
  outlineBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  primaryBtn: { 
    width: '47%', 
    paddingVertical: 12, 
    borderRadius: 20, 
    backgroundColor: 'rgba(255,255,255,0.35)', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff'
  },
  primaryBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});

export default GlassDoctorList;