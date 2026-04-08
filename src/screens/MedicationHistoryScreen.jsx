import React from 'react';
import { 
  StyleSheet, View, Text, ImageBackground, 
  FlatList, TouchableOpacity, Alert, Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MedicationHistoryScreen = () => {
  const navigation = useNavigation();

  // Mock data for medication history
  const historyData = [
    { 
      id: 'ORD-882', 
      drName: 'Dr. Anurag Tiwari', 
      date: '07 April, 2026', 
      status: 'Ready to Pickup',
      imageUri: 'https://i.pinimg.com/originals/93/29/7a/93297a78378512595e8653f538740510.jpg'
    },
    { 
      id: 'ORD-750', 
      drName: 'Dr. Smita Patil', 
      date: '22 March, 2026', 
      status: 'Completed',
      imageUri: 'https://i.pinimg.com/originals/93/29/7a/93297a78378512595e8653f538740510.jpg'
    },
    { 
      id: 'ORD-612', 
      drName: 'Dr. Ashish Gohiya', 
      date: '10 Feb, 2026', 
      status: 'Completed',
      imageUri: 'https://i.pinimg.com/originals/93/29/7a/93297a78378512595e8653f538740510.jpg'
    },
  ];

  const handleDownload = (orderId) => {
    Alert.alert("Download Started", `Prescription for ${orderId} is being saved to your gallery.`);
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.cardHeader}>
        <View style={styles.iconCircle}>
          <Ionicons name="medkit" size={24} color="#5CF08C" />
        </View>
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.drName}>{item.drName}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Completed' ? 'rgba(255,255,255,0.1)' : 'rgba(92, 240, 140, 0.2)' }]}>
          <Text style={[styles.statusText, { color: item.status === 'Completed' ? '#ccc' : '#5CF08C' }]}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.dateInfo}>
          <Ionicons name="calendar-outline" size={16} color="rgba(255,255,255,0.6)" />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.downloadBtn} 
          onPress={() => handleDownload(item.id)}
        >
          <Ionicons name="cloud-download-outline" size={18} color="#383981" />
          <Text style={styles.downloadBtnText}>Prescription</Text>
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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={28} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Medication History</Text>
          <View style={{ width: 28 }} />
        </View>

        <FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  backBtn: { padding: 5 },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  historyCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 25, 
    padding: 20, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.25)' 
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  iconCircle: { width: 45, height: 45, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  orderId: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 'bold' },
  drName: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: 'bold' },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 15 },
  dateInfo: { flexDirection: 'row', alignItems: 'center' },
  dateText: { color: 'rgba(255,255,255,0.6)', fontSize: 13, marginLeft: 8 },
  
  downloadBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 12 
  },
  downloadBtnText: { color: '#383981', fontSize: 12, fontWeight: 'bold', marginLeft: 6 }
});

export default MedicationHistoryScreen;