import React from 'react';
import {
  StyleSheet, View, Text, Image, TextInput,
  ScrollView, TouchableOpacity, Dimensions,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// --- DATA STRUCTURE FOR ROWS ---
const sections = [
  {
    title: 'CHOOSE FROM TOP SPECIALITIES',
    data: [
      { name: 'Mental Wellness', img: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png' },
      { name: 'Gynaecology', img: 'https://cdn-icons-png.flaticon.com/512/2865/2865605.png' },
      { name: 'General physician', img: 'https://cdn-icons-png.flaticon.com/512/2913/2913446.png' },
      { name: 'Dermatology', img: 'https://cdn-icons-png.flaticon.com/512/2785/2785482.png' },
    ]
  },
  {
    title: 'Common Health Issues',
    data: [
      { name: 'Stomach Pain', img: 'https://cdn-icons-png.flaticon.com/512/2491/2491280.png' },
      { name: 'Vertigo', img: 'https://cdn-icons-png.flaticon.com/512/2865/2865584.png' },
      { name: 'Acne', img: 'https://cdn-icons-png.flaticon.com/512/2785/2785482.png' },
      { name: 'Obesity Care', img: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png' },
    ]
  },
  {
    title: 'Orthopedist',
    data: [
      { name: 'Knee Pain', img: 'https://cdn-icons-png.flaticon.com/512/2865/2865584.png' },
      { name: 'Shoulder Pain', img: 'https://cdn-icons-png.flaticon.com/512/2865/2865584.png' },
      { name: 'Leg Pain', img: 'https://cdn-icons-png.flaticon.com/512/2865/2865584.png' },
      { name: 'Carpal Tunnel', img: 'https://cdn-icons-png.flaticon.com/512/2865/2865584.png' },
    ]
  }
];

const OnlineConsultScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2D3192" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Consult a doctor</Text>
        <TouchableOpacity><Text style={styles.helpText}>HELP</Text></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* PROMO BANNER */}
        <View style={styles.promoBanner}>
          <View style={styles.promoTextCol}>
             <Text style={styles.promoTitle}>Free follow-up</Text>
             <Text style={styles.promoSub}>for 7 days with every consultation</Text>
             <TouchableOpacity style={styles.knowMoreRow}>
                <Text style={styles.knowMore}>Know More</Text>
                <Ionicons name="chevron-forward-circle" size={18} color="#2D3192" />
             </TouchableOpacity>
          </View>
          <Ionicons name="chatbubbles" size={60} color="#90CAF9" style={styles.promoIcon} />
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchSection}>
          <Text style={styles.inputLabel}>Search Health Problem / Symptoms</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#8A96AB" />
            <TextInput 
              placeholder="Search symptoms. Eg: Cold, cough, fever" 
              style={styles.input}
            />
          </View>
        </View>

        {/* PREVIOUS DOCTOR */}
        <View style={styles.previousSection}>
          <Text style={styles.sectionHeading}>Consult With Previous Doctor</Text>
          <Text style={styles.subHeading}>Recent doctors you have consulted with</Text>
          <View style={styles.doctorCardRow}>
            <View style={styles.docCard}>
              <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.docAvatar} />
              <View>
                <Text style={styles.docName}>Dr. Ashwin</Text>
                <View style={styles.completedBadge}><Text style={styles.completedText}>COMPLETED</Text></View>
              </View>
            </View>
            <TouchableOpacity style={styles.viewChatsCard}>
                <Text style={styles.viewChatsText}>View All Chats</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* RENDER DYNAMIC SECTIONS */}
        {sections.map((section, idx) => (
          <View key={idx} style={styles.gridSection}>
            <Text style={styles.gridTitle}>{section.title}</Text>
            <View style={styles.grid}>
              {section.data.map((item, i) => (
                <TouchableOpacity key={i} style={styles.gridItem}>
                  <View style={styles.iconCircle}>
                    <Image source={{ uri: item.img }} style={styles.iconImg} />
                  </View>
                  <Text style={styles.iconName}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  header: { backgroundColor: '#2D3192', flexDirection: 'row', alignItems: 'center', padding: 18 },
  headerTitle: { color: '#FFF', fontSize: 16, fontWeight: '700', flex: 1, marginLeft: 20 },
  helpText: { color: '#FFF', fontSize: 12, fontWeight: '600' },

  promoBanner: { 
    backgroundColor: '#E8EAF6', margin: 20, borderRadius: 20, 
    flexDirection: 'row', padding: 20, alignItems: 'center' 
  },
  promoTextCol: { flex: 1 },
  promoTitle: { fontSize: 18, fontWeight: '800', color: '#1A237E' },
  promoSub: { fontSize: 12, color: '#3F51B5', marginTop: 2 },
  knowMoreRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  knowMore: { fontWeight: 'bold', color: '#2D3192', marginRight: 5, borderBottomWidth: 1, borderColor: '#2D3192' },
  
  searchSection: { paddingHorizontal: 20 },
  inputLabel: { fontSize: 13, fontWeight: '700', color: '#4A4A4A', marginBottom: 10 },
  searchBar: { flexDirection: 'row', backgroundColor: '#F0F2F5', borderRadius: 10, padding: 12, alignItems: 'center' },
  input: { flex: 1, marginLeft: 10, fontSize: 14 },

  previousSection: { padding: 20 },
  sectionHeading: { fontSize: 14, fontWeight: '700', color: '#4A4A4A' },
  subHeading: { fontSize: 11, color: '#8A96AB', marginTop: 2 },
  doctorCardRow: { flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' },
  docCard: { 
    width: width * 0.44, flexDirection: 'row', alignItems: 'center', 
    padding: 10, backgroundColor: '#FFF', borderRadius: 10, borderWidth: 1, borderColor: '#F0F0F0' 
  },
  docAvatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 10 },
  docName: { fontSize: 12, fontWeight: '700' },
  completedBadge: { backgroundColor: '#E8F5E9', padding: 2, borderRadius: 4, marginTop: 4 },
  completedText: { color: '#4CAF50', fontSize: 9, fontWeight: '800', textAlign: 'center' },
  viewChatsCard: { 
    width: width * 0.44, justifyContent: 'center', alignItems: 'center', 
    borderRadius: 10, borderWidth: 1, borderColor: '#F0F0F0' 
  },
  viewChatsText: { fontSize: 12, fontWeight: '600', color: '#4A4A4A' },

  gridSection: { paddingHorizontal: 20, marginTop: 20 },
  gridTitle: { fontSize: 13, fontWeight: '700', color: '#8A96AB', marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: (width - 60) / 4, alignItems: 'center', marginBottom: 20 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#F0F4F8', justifyContent: 'center', alignItems: 'center' },
  iconImg: { width: 35, height: 35, resizeMode: 'contain' },
  iconName: { fontSize: 10, textAlign: 'center', marginTop: 8, color: '#4A4A4A', fontWeight: '500' }
});

export default OnlineConsultScreen;