import React from 'react';
import {
  StyleSheet, View, Text, Image, TextInput,
  ScrollView, TouchableOpacity, Dimensions,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// Data Mapping (Same as before)
const relevantSpecialities = [
  { id: '1', title: 'Orthopedist', img: 'https://cdn-icons-png.flaticon.com/512/2865/2865584.png' },
  { id: '2', title: 'Dentist', img: 'https://cdn-icons-png.flaticon.com/512/3467/3467551.png' },
  { id: '3', title: 'Dermatologist', img: 'https://cdn-icons-png.flaticon.com/512/2785/2785482.png' },
  { id: '4', title: 'Pediatrician', img: 'https://cdn-icons-png.flaticon.com/512/3063/3063176.png' },
  { id: '5', title: 'General Physician', img: 'https://cdn-icons-png.flaticon.com/512/2913/2913446.png' },
  { id: '6', title: 'Gynecologist', img: 'https://cdn-icons-png.flaticon.com/512/2865/2865605.png' },
  { id: '7', title: 'Pulmonologist', img: 'https://cdn-icons-png.flaticon.com/512/2491/2491290.png' },
  { id: '8', title: 'Endocrinologist', img: 'https://cdn-icons-png.flaticon.com/512/2491/2491300.png' },
];

const categoryCards = [
  { id: 'cat1', title: 'Skin and hair', sub: 'Find doctors for issues like acne, hairfall...', img: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: 'cat2', title: "Women's health", sub: "Find doctors for women's gynaecological issues...", img: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 'cat3', title: 'Chronic problems', sub: 'Find doctors who treat diabetes, asthma...', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 'cat4', title: 'Bone and joint', sub: 'Find doctors who treat fractures...', img: 'https://randomuser.me/api/portraits/men/46.jpg' },
  { id: 'cat5', title: 'Sexual health', sub: 'Find doctors who can solve your sexual problems', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
];

const FindDoctorsScreen = ({ navigation }) => {
  
  // NAVIGATION FUNCTION
  const goToSearch = (title) => {
    navigation.navigate('SearchToggleHeader', { selectedSpeciality: title });
  };

  const renderIconGrid = (data) => (
    <View style={styles.iconGrid}>
      {data.map((item) => (
        <TouchableOpacity key={item.id} style={styles.iconItem} onPress={() => goToSearch(item.title)}>
          <View style={styles.circleBg}>
            <Image source={{ uri: item.img }} style={styles.iconImg} />
          </View>
          <Text style={styles.iconLabel}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#383981" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Doctors</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Bhopal</Text>
          <Ionicons name="chevron-down" size={14} color="#FFF" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.searchContainer} onPress={() => goToSearch('')}>
          <Ionicons name="search" size={20} color="#333" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search Symptoms/ Specialities</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Specialities most relevant to you</Text>
        {renderIconGrid(relevantSpecialities)}

        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryGrid}>
          {categoryCards.map((item) => (
            <TouchableOpacity key={item.id} style={styles.catCard} onPress={() => goToSearch(item.title)}>
              <View style={styles.catImageContainer}>
                 <Image source={{ uri: item.img }} style={styles.catImg} />
              </View>
              <View style={styles.catInfo}>
                <Text style={styles.catTitle}>{item.title}</Text>
                <Text style={styles.catSubText} numberOfLines={2}>{item.sub}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  header: { backgroundColor: '#383981', flexDirection: 'row', alignItems: 'center', padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', flex: 1, marginLeft: 20 },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationText: { color: '#FFF', marginRight: 4 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
  searchContainer: { flexDirection: 'row', backgroundColor: '#F3F5F9', borderRadius: 30, height: 50, alignItems: 'center', paddingHorizontal: 15, marginBottom: 20 },
  searchIcon: { marginRight: 10 },
  searchPlaceholder: { color: '#8A96AB', fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginTop: 15 },
  iconGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 15 },
  iconItem: { width: (width - 60) / 4, alignItems: 'center', marginBottom: 20 },
  circleBg: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#E8F1FF', justifyContent: 'center', alignItems: 'center' },
  iconImg: { width: 35, height: 35, resizeMode: 'contain' },
  iconLabel: { fontSize: 11, textAlign: 'center', marginTop: 8, color: '#4A4A4A' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 15 },
  catCard: { width: (width - 55) / 2, backgroundColor: '#FFF', borderRadius: 15, marginBottom: 20, elevation: 3 },
  catImageContainer: { width: '100%', height: 120, borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: 'hidden' },
  catImg: { width: '100%', height: '100%' },
  catInfo: { padding: 10 },
  catTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
  catSubText: { fontSize: 10, color: '#8A96AB', marginTop: 4 },
  bottomSpacer: { height: 30 }
});

export default FindDoctorsScreen;