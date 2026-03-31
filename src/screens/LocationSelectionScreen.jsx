import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  FlatList, ActivityIndicator, Alert, PermissionsAndroid, 
  Platform, StatusBar, Linking 
} from 'react-native';

// This handles the notch/camera overlap perfectly
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';

const LocationSelectionScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets(); // Get notch height automatically
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const cities = ["Bhopal", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Indore", "Pune", "Jaipur"];

  const handleLocationSelect = (city) => {
    navigation.navigate('DoctorsList', { selectedCity: city });
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            "Permission Denied",
            "Please enable location in app settings.",
            [{ text: "Cancel" }, { text: "Settings", onPress: () => Linking.openSettings() }]
          );
        }
      } catch (err) {
        console.warn(err);
      }
      return false;
    }
    return true;
  };

  const getGPSLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    setLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        handleLocationSelect("Current Location");
      },
      (error) => {
        setLoading(false);
        Alert.alert("GPS Error", error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // Dynamic padding based on the notch height (insets.top)
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* 1. Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Location</Text>
      </View>

      {/* 2. Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#8A96AB" />
        <TextInput
          placeholder="Search city name"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#8A96AB"
        />
      </View>

      {/* 3. GPS */}
      <TouchableOpacity 
        style={styles.gpsButton} 
        onPress={getGPSLocation}
        activeOpacity={0.7}
      >
        <View style={styles.gpsIconCircle}>
           <Ionicons name="locate" size={20} color="#4A90E2" />
        </View>
        <Text style={styles.gpsText}>Use current location</Text>
        {loading && <ActivityIndicator size="small" color="#4A90E2" style={{marginLeft: 10}} />}
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* 4. List */}
      <Text style={styles.sectionLabel}>Popular Cities</Text>
      <FlatList
        data={filteredCities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cityRow} onPress={() => handleLocationSelect(item)}>
            <Text style={styles.cityName}>{item}</Text>
            <Ionicons name="chevron-forward" size={18} color="#CCC" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FFF' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: '700', marginLeft: 10, color: '#1A1A1A' },
  searchBar: { 
    flexDirection: 'row', 
    backgroundColor: '#F5F7FA', 
    margin: 20, 
    paddingHorizontal: 15, 
    borderRadius: 12, 
    height: 50,
    alignItems: 'center'
  },
  input: { flex: 1, marginLeft: 10, fontSize: 16, color: '#000' },
  gpsButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    marginBottom: 20 
  },
  gpsIconCircle: {
    width: 36, height: 36, borderRadius: 18, 
    backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center'
  },
  gpsText: { color: '#4A90E2', fontWeight: '700', marginLeft: 12, fontSize: 16 },
  divider: { height: 8, backgroundColor: '#F9FAFC' },
  sectionLabel: { 
    fontSize: 12, color: '#8A96AB', margin: 20, 
    fontWeight: '800', textTransform: 'uppercase' 
  },
  cityRow: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    padding: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' 
  },
  cityName: { fontSize: 16, color: '#1A1A1A', fontWeight: '500' }
});

export default LocationSelectionScreen;