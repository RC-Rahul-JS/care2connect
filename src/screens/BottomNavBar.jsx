import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const BottomNavBar = ({ activeTab, navigation }) => {
  const tabs = [
    { name: 'Home', icon: 'home', family: 'Ionicons', screen: 'HomeScreen' },
    { name: 'In-Person', icon: 'stethoscope', family: 'MaterialCommunityIcons', screen: 'InPerson' },
    { name: 'Video', icon: 'videocam-outline', family: 'Ionicons', screen: 'VideoConsult' },
    { name: 'Account', icon: 'person-outline', family: 'Ionicons', screen: 'Account' },
  ];

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          const IconLib = tab.family === 'Ionicons' ? Ionicons : MaterialCommunityIcons;

          return (
            <TouchableOpacity 
              key={tab.name}
              style={[styles.navItem, isActive && styles.navActive]} 
              onPress={() => navigation.navigate(tab.screen)}
            >
              <IconLib name={tab.icon} size={22} color={isActive ? "#FFF" : "#8A96AB"} />
              {isActive && <Text style={styles.navTextActive}>{tab.name}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNav: { 
    height: 70, 
    backgroundColor: '#FFF', 
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 35, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around', 
    elevation: 10, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10 
  },
  navItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 30 },
  navActive: { backgroundColor: '#383981', paddingHorizontal: 15 },
  navTextActive: { color: '#FFF', fontWeight: '700', marginLeft: 8, fontSize: 12 },
});

export default BottomNavBar;