import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderTrackingScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/7d/92/38/7d923880728193337fe46ec6c8e26184.jpg' }} 
      style={styles.container}
      blurRadius={15}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
                <Ionicons name="close" size={30} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Track Order</Text>
            <View style={{ width: 30 }} />
        </View>

        <View style={styles.mainCard}>
            {/* Step 1: Confirmed */}
            <View style={styles.statusRow}>
                <View style={styles.iconBox}><Ionicons name="receipt" size={24} color="#383981" /></View>
                <View style={styles.textColumn}>
                    <Text style={styles.statusTitle}>Order Confirmed</Text>
                    <Text style={styles.statusTime}>10:30 AM, Today</Text>
                </View>
                <Ionicons name="checkmark-circle" size={24} color="#5CF08C" />
            </View>

            <View style={styles.line} />

            {/* Step 2: Processing */}
            <View style={styles.statusRow}>
                <View style={[styles.iconBox, {backgroundColor: '#5CF08C'}]}><Ionicons name="medkit" size={24} color="#fff" /></View>
                <View style={styles.textColumn}>
                    <Text style={styles.statusTitle}>Processing Medicines</Text>
                    <Text style={styles.statusTime}>Our pharmacist has verified</Text>
                </View>
                <Ionicons name="checkmark-circle" size={24} color="#5CF08C" />
            </View>

            <View style={styles.line} />

            {/* Step 3: Updated to Pickup Status */}
            <View style={styles.statusRow}>
                <View style={[styles.iconBox, {backgroundColor: '#FFB74D'}]}><Ionicons name="cube" size={24} color="#FFF" /></View>
                <View style={styles.textColumn}>
                    <Text style={styles.statusTitle}>Order is Packed</Text>
                    <Text style={styles.statusTime}>Please Pickup from Store</Text>
                </View>
                <View style={styles.pulseDot} />
            </View>
        </View>

        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('Landing')}>
            <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  mainCard: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 30, padding: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  textColumn: { flex: 1, marginLeft: 15 },
  statusTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  statusTime: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  line: { width: 2, height: 40, backgroundColor: '#5CF08C', marginLeft: 24, marginVertical: 5 },
  pulseDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFB74D' }, // Matched color to the box
  homeBtn: { marginTop: 40, backgroundColor: '#FFF', height: 55, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  homeBtnText: { color: '#383981', fontWeight: 'bold' }
});

export default OrderTrackingScreen;