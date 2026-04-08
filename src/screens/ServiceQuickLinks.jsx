import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  Platform 
} from 'react-native';

const { width } = Dimensions.get('window');

const services = [
  { 
    id: '1', 
    title: 'Lab\nTests', 
    icon: 'https://cdn-icons-png.flaticon.com/512/3022/3022588.png',
    bgColor: '#E3F2FD' 
  },
  { 
    id: '2', 
    title: 'Plan\nSurgery', 
    icon: 'https://cdn-icons-png.flaticon.com/512/3588/3588523.png',
    bgColor: '#E8F5E9' 
  },
  { 
    id: '3', 
    title: 'Order\nMedicine', 
    icon: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
    bgColor: '#FFF3E0' 
  },
  { 
    id: '4', 
    title: 'Buy\nSub', 
    icon: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png',
    bgColor: '#F3E5F5' 
  },
];

const ServiceQuickLinks = () => {
  return (
    <View style={styles.container}>
      {services.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          activeOpacity={0.7}
          style={styles.card}
        >
          <View style={[styles.iconCircle, { backgroundColor: item.bgColor }]}>
            <Image source={{ uri: item.icon }} style={styles.icon} />
          </View>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center', // Centers the group of cards
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#FFF',
    // THIS PREVENTS OVERLAP
    gap: 10, 
  },
  card: {
    // We use flex: 1 so they share space equally without touching
    flex: 1, 
    maxWidth: (width / 4) - 20, // Strict limit on width
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // Glassmorphism-style light shadow
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
    }),
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 9,
    fontWeight: '800',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 11,
    // Ensures text doesn't push the card wider
    width: '90%', 
  },
});

export default ServiceQuickLinks;
