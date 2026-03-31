import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar, Image, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'; // Added Navigation Hook

const Navbar = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation(); // Initialize navigation
  
  // Fallback for top padding
  const topPadding = insets.top > 0 ? insets.top : 20;

  return (
    <View style={[styles.navWrapper, { paddingTop: topPadding }]}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      <View style={styles.contentContainer}>
        
        {/* Left Section: Profile Icon -> Navigates to UserProfile */}
        <View style={styles.leftSection}>
          <TouchableOpacity 
            style={styles.userCircle} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('UserProfile')} // Navigate to Profile Screen
          >
            <Icon name="user" color="#000" size={22} />
          </TouchableOpacity>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </View>

        {/* Middle Section: Logo */}
        <View style={styles.logoContainer} pointerEvents="none">
          <Image 
            source={{ uri: 'https://care2connect.in/assets/pp-BXFzvpwK.png' }} 
            style={styles.logoImage} 
            resizeMode="contain" 
          />
        </View>

        {/* Right Section: Notification/Bell */}
        <View style={styles.rightSection}>
           <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
             <Icon name="bell" color="#000" size={24} />
           </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Slightly more visible glass effect
    borderBottomWidth: 0, 
    elevation: 0, 
    shadowOpacity: 0,
  },
  contentContainer: {
    height: 70, // Slightly more compact height
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  leftSection: {
    position: 'relative',
    zIndex: 10,
    width: 44,
  },
  logoContainer: {
    position: 'absolute', 
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: { 
    width: 75, // Increased size for better branding
    height: 75, 
  },
  rightSection: {
    width: 44, 
    alignItems: 'flex-end',
    zIndex: 10,
  },
  userCircle: { 
    width: 40, 
    height: 40, 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)', // Very subtle border
    elevation: 2, // Tiny lift for glass feel
  },
  badge: { 
    position: 'absolute', 
    top: -2, 
    right: -2, 
    backgroundColor: '#FF3B30', 
    borderRadius: 9, 
    width: 18, 
    height: 18, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1.5, 
    borderColor: '#fff' 
  },
  badgeText: { 
    color: '#fff', 
    fontSize: 9, 
    fontWeight: 'bold' 
  },
  iconButton: {
    padding: 5,
  }
});

export default Navbar;