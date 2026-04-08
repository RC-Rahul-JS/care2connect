import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, View, Text, ImageBackground, Image, 
  ScrollView, TouchableOpacity, TextInput, Dimensions, Alert, PermissionsAndroid, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

const MedicineScreen = () => {
  const navigation = useNavigation();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [uploadImage, setUploadImage] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');

  const doctors = [
    { id: '1', name: 'Dr. Anurag Tiwari', spec: 'Orthopedic Surgeon', pic: 'https://randomuser.me/api/portraits/men/15.jpg' },
    { id: '2', name: 'Dr. Smita Patil', spec: 'Cardiologist', pic: 'https://randomuser.me/api/portraits/women/44.jpg' },
  ];

  // Fix: Permission Request for Android 13+ (API 33+)
  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          Platform.Version >= 33 
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES 
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    }
    return true;
  };

  const handlePickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Please allow gallery access in settings.");
      return;
    }

    const options = { mediaType: 'photo', quality: 1, selectionLimit: 1 };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", response.errorMessage || "Could not open gallery");
      } else if (response.assets && response.assets.length > 0) {
        setUploadImage(response.assets[0].uri);
      }
    });
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/7d/92/38/7d923880728193337fe46ec6c8e26184.jpg' }} 
      style={styles.container}
      blurRadius={15}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={28} color="#FFF" /></TouchableOpacity>
          <Text style={styles.headerTitle}>Order Medicine</Text>
          {/* MEDICATION HISTORY BUTTON */}
          <TouchableOpacity onPress={() => navigation.navigate('OrderTracking')}>
            <Ionicons name="receipt-outline" size={26} color="#5CF08C" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.glassCard}>
            <Text style={styles.cardTitle}>1. Prescribing Doctor</Text>
            {!selectedDoctor ? (
              <>
                <View style={styles.searchBox}>
                  <Ionicons name="search" size={18} color="rgba(255,255,255,0.6)" />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Search Doctor..." 
                    placeholderTextColor="rgba(255,255,255,0.4)" 
                    onChangeText={setSearchQuery}
                  />
                </View>
                {doctors.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())).map((doc) => (
                  <TouchableOpacity key={doc.id} style={styles.docItem} onPress={() => setSelectedDoctor(doc)}>
                    <Image source={{ uri: doc.pic }} style={styles.docPic} />
                    <View style={{ flex: 1 }}><Text style={styles.docName}>{doc.name}</Text><Text style={styles.docSpec}>{doc.spec}</Text></View>
                    <Ionicons name="add-circle" size={24} color="#FFF" />
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <View style={styles.selectedDocContainer}>
                <Image source={{ uri: selectedDoctor.pic }} style={styles.docPic} />
                <View style={{ flex: 1 }}><Text style={styles.docName}>{selectedDoctor.name}</Text><Text style={styles.docSpec}>{selectedDoctor.spec}</Text></View>
                <TouchableOpacity onPress={() => setSelectedDoctor(null)}><Text style={{color: '#FF7070', fontWeight: 'bold'}}>Change</Text></TouchableOpacity>
              </View>
            )}
          </View>

          <View style={[styles.glassCard, { marginTop: 20, marginBottom: 30 }]}>
            <Text style={styles.cardTitle}>2. Upload Prescription</Text>
            <TouchableOpacity style={styles.uploadArea} onPress={handlePickImage}>
              {uploadImage ? (
                <View style={styles.previewContainer}>
                  <Image source={{ uri: uploadImage }} style={styles.previewImg} />
                  <View style={styles.previewOverlay}><Ionicons name="camera" size={16} color="#fff" /><Text style={styles.previewText}>Tap to Change</Text></View>
                </View>
              ) : (
                <View style={{alignItems: 'center'}}><Ionicons name="image-outline" size={40} color="#FFF" /><Text style={styles.uploadText}>Open Gallery</Text></View>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.primaryBtn, (!selectedDoctor || !uploadImage) && {opacity: 0.5}]}
            onPress={() => navigation.navigate('OrderTracking')}
            disabled={!selectedDoctor || !uploadImage}
          >
            <Text style={styles.btnText}>Proceed to Order</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 60 },
  glassCard: { backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 30, padding: 20, borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.25)' },
  cardTitle: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 15 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 15, paddingHorizontal: 15, height: 50, marginBottom: 15 },
  input: { flex: 1, color: '#FFF', marginLeft: 10 },
  docItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 18, marginBottom: 10, backgroundColor: 'rgba(255,255,255,0.08)' },
  selectedDocContainer: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 18, backgroundColor: 'rgba(92, 240, 140, 0.2)', borderWidth: 1, borderColor: '#5CF08C' },
  docPic: { width: 50, height: 50, borderRadius: 15, marginRight: 15 },
  docName: { color: '#FFF', fontWeight: '600', fontSize: 16 },
  docSpec: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  uploadArea: { height: 200, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', borderStyle: 'dashed', borderRadius: 25, overflow: 'hidden', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.05)' },
  previewContainer: { width: '100%', height: '100%' },
  previewImg: { width: '100%', height: '100%' },
  previewOverlay: { position: 'absolute', bottom: 10, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  previewText: { color: '#fff', fontSize: 10, marginLeft: 5 },
  uploadText: { color: 'rgba(255,255,255,0.6)', marginTop: 10, fontSize: 13 },
  primaryBtn: { backgroundColor: '#FFF', height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  btnText: { color: '#383981', fontSize: 18, fontWeight: 'bold' }
});

export default MedicineScreen;