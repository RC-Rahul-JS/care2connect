import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar, Image, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';

const Navbar = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();

  // Pick up the gender from the Landing screen's route params
  const userGender = route.params?.userGender || 'Male';

  const getAvatar = () => {
    if (userGender === 'Female') {
      return 'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436185.jpg';
    } else if (userGender === 'Other') {
      return 'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611734.jpg';
    }
    // Default Male Avatar
    return 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg';
  };

  const topPadding = insets.top > 0 ? insets.top : 20;

  return (
    <View style={[styles.navWrapper, { paddingTop: topPadding }]}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <View style={styles.contentContainer}>
        
        {/* Profile Section */}
        <View style={styles.leftSection}>
          <TouchableOpacity 
            style={styles.userCircle} 
            onPress={() => navigation.navigate('UserProfile')}
          >
            <Image 
              source={{ uri: getAvatar() }} 
              style={styles.avatarImg} 
            />
          </TouchableOpacity>
          <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer} pointerEvents="none">
          <Image 
            source={{ uri: 'https://care2connect.in/assets/pp-BXFzvpwK.png' }} 
            style={styles.logoImage} 
            resizeMode="contain" 
          />
        </View>

        {/* Notifications */}
        <View style={styles.rightSection}>
           <TouchableOpacity style={styles.iconButton}>
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
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)'
  },
  contentContainer: { height: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  leftSection: { width: 44, position: 'relative' },
  logoContainer: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  logoImage: { width: 75, height: 75 },
  rightSection: { width: 44, alignItems: 'flex-end' },
  userCircle: { 
    width: 44, 
    height: 44, 
    backgroundColor: '#ADD8E6', // Changed to Light Blue
    borderRadius: 22, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: '#ddd' 
  },
  avatarImg: { width: '100%', height: '100%' },
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
  badgeText: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
  iconButton: { padding: 5 }
});

export default Navbar;