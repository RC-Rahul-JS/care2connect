import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, StatusBar, ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// IMPORT THE COMPONENTS
import PhysicalDoctorList from './PhysicalDoctorList'; 
import VideoDoctorList from './VideoDoctorList'; 

const { width } = Dimensions.get('window');

const SearchToggleHeader = ({ navigation, route }) => {
  const { selectedSpeciality } = route.params || { selectedSpeciality: 'Search doctors' };
  const [viewType, setViewType] = useState('Physical');

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/7d/92/38/7d923880728193337fe46ec6c8e26184.jpg' }} 
      style={styles.container}
      blurRadius={15} 
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

        {/* 1. HEADER WITH GLASS SEARCH BOX */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassIconBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          
          <View style={styles.glassSearchContainer}>
            <Ionicons name="search" size={20} color="rgba(255,255,255,0.6)" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput} 
              defaultValue={selectedSpeciality}
              placeholder="Search doctors"
              placeholderTextColor="rgba(255,255,255,0.5)"
            />
          </View>
        </View>

        {/* 2. GLASS TOGGLE BUTTONS */}
        <View style={styles.toggleRow}>
          <TouchableOpacity 
            style={[styles.glassToggleBox, viewType === 'Physical' && styles.activePhysical]}
            onPress={() => setViewType('Physical')}
          >
            <Ionicons name="business" size={20} color={viewType === 'Physical' ? "#383981" : "#FFF"} />
            <Text style={[styles.toggleLabel, viewType === 'Physical' ? styles.textActive : styles.textWhite]}>
              Physical{"\n"}Appointment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.glassToggleBox, viewType === 'Video' && styles.activeVideo]}
            onPress={() => setViewType('Video')}
          >
            <Ionicons name="videocam" size={20} color={viewType === 'Video' ? "#7C4DFF" : "#FFF"} />
            <View>
              <Text style={[styles.toggleLabel, viewType === 'Video' ? styles.textVideoActive : styles.textWhite]}>
                Video Consult
              </Text>
              {viewType === 'Video' && (
                <View style={styles.instantBadge}>
                  <Text style={styles.instantText}>⚡ Connect Instantly!</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.glassDivider} />
        
        {/* 3. DYNAMIC CONTENT AREA */}
        <View style={{ flex: 1 }}>
          {viewType === 'Physical' ? (
            <PhysicalDoctorList />
          ) : (
            <VideoDoctorList /> 
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  glassIconBtn: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 15, marginRight: 12 },
  
  glassSearchContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: 'rgba(255,255,255,0.15)', 
    borderRadius: 20, 
    height: 50, 
    alignItems: 'center', 
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 14, color: '#FFF', fontWeight: '600' },

  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 },
  glassToggleBox: { 
    width: '48%', 
    height: 70, 
    borderRadius: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  
  activePhysical: { backgroundColor: '#FFF', borderColor: '#FFF' },
  activeVideo: { backgroundColor: '#FFF', borderColor: '#FFF' },
  
  toggleLabel: { fontSize: 11, fontWeight: '700', marginLeft: 8 },
  textWhite: { color: '#FFF' },
  textActive: { color: '#383981' },
  textVideoActive: { color: '#7C4DFF' },

  instantBadge: { backgroundColor: '#7C4DFF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, marginTop: 3, marginLeft: 8 },
  instantText: { fontSize: 8, color: '#FFF', fontWeight: '900' },
  
  glassDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginTop: 25, marginHorizontal: 20 }
});

export default SearchToggleHeader;