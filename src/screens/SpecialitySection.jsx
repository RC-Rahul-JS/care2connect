import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, Image, 
  TouchableOpacity, FlatList, Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

const specialityData = {
  General: [
    // Column 1
    [{ id: '1', title: 'General Physician', img: 'https://randomuser.me/api/portraits/men/1.jpg' },
     { id: '2', title: 'Dentist', img: 'https://randomuser.me/api/portraits/women/5.jpg' }],
    // Column 2
    [{ id: '3', title: "Women's Health", img: 'https://randomuser.me/api/portraits/women/2.jpg' },
     { id: '4', title: 'Eye Specialist', img: 'https://randomuser.me/api/portraits/men/10.jpg' }],
    // Column 3
    [{ id: '5', title: 'Skin Specialist', img: 'https://randomuser.me/api/portraits/women/3.jpg' },
     { id: '6', title: 'Ear, Nose & Throat', img: 'https://randomuser.me/api/portraits/men/12.jpg' }],
    // Column 4
    [{ id: '7', title: 'Child Care', img: 'https://randomuser.me/api/portraits/men/4.jpg' },
     { id: '8', title: 'Mental Wellness', img: 'https://randomuser.me/api/portraits/women/15.jpg' }],
  ],
  Advanced: [
    // Column 1
    [{ id: 'A1', title: 'Bones & Joints', img: 'https://cdn-icons-png.flaticon.com/512/2865/2865584.png' },
     { id: 'A2', title: 'Heart Specialist', img: 'https://cdn-icons-png.flaticon.com/512/2491/2491264.png' }],
    // Column 2
    [{ id: 'A3', title: 'Brains & Nerves', img: 'https://cdn-icons-png.flaticon.com/512/2491/2491322.png' },
     { id: 'A4', title: 'Stomach & Digestion', img: 'https://cdn-icons-png.flaticon.com/512/2491/2491280.png' }],
    // Column 3
    [{ id: 'A5', title: 'Urinary Issues', img: 'https://cdn-icons-png.flaticon.com/512/2865/2865600.png' },
     { id: 'A6', title: 'Diabetes Management', img: 'https://cdn-icons-png.flaticon.com/512/2491/2491300.png' }],
    // Column 4
    [{ id: 'A7', title: 'Lungs & Breathing', img: 'https://cdn-icons-png.flaticon.com/512/2491/2491290.png' },
     { id: 'A8', title: 'Cancer Specialist', img: 'https://cdn-icons-png.flaticon.com/512/2491/2491270.png' }],
  ]
};

const SpecialitySection = () => {
  const [activeTab, setActiveTab] = useState('General');

  const renderColumn = ({ item }) => (
    <View style={styles.column}>
      {item.map((subItem) => (
        <TouchableOpacity key={subItem.id} style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: subItem.img }} style={styles.cardImage} />
          </View>
          <Text style={styles.cardText} numberOfLines={2}>{subItem.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Find doctors by speciality</Text>

      {/* Toggle Tabs */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleBtn, activeTab === 'General' && styles.activeToggle]} 
          onPress={() => setActiveTab('General')}
        >
          <Text style={[styles.toggleText, activeTab === 'General' && styles.activeTabText]}>General Care</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.toggleBtn, activeTab === 'Advanced' && styles.activeToggle]} 
          onPress={() => setActiveTab('Advanced')}
        >
          <Text style={[styles.toggleText, activeTab === 'Advanced' && styles.activeTabText]}>Advanced Care</Text>
        </TouchableOpacity>
      </View>

      {/* 2-Row Horizontal Grid */}
      <FlatList
        data={specialityData[activeTab]}
        renderItem={renderColumn}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 10, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A', paddingHorizontal: 20, marginBottom: 15 },
  
  toggleContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#F0F4F8', 
    borderRadius: 30, 
    marginHorizontal: 20, 
    padding: 5,
    marginBottom: 20
  },
  toggleBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 25 },
  activeToggle: { backgroundColor: '#FFF', elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  toggleText: { fontSize: 14, fontWeight: '600', color: '#8A96AB' },
  activeTabText: { color: '#1A1A1A' },

  // Grid / Column Styles
  listPadding: { paddingLeft: 20, paddingRight: 10 },
  column: {
    flexDirection: 'column', // Stack two cards vertically
  },
  card: { 
    width: 110, 
    marginRight: 15, 
    marginBottom: 15, // Space between top and bottom card
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E8EDF2',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  imageContainer: { width: 80, height: 80, borderRadius: 12, overflow: 'hidden', backgroundColor: '#F9FAFC' },
  cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  cardText: { fontSize: 11, fontWeight: '700', color: '#1A1A1A', textAlign: 'center', marginTop: 8 },
});

export default SpecialitySection;