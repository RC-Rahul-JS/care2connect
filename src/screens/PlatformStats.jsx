import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const PlatformStats = () => {
  return (
    <View style={styles.container}>
      {/* 1. 5 Lakh+ Doctors */}
      <View style={styles.statBox}>
        <Text style={styles.numberText}>5 Lakh+</Text>
        <Text style={styles.labelText}>DOCTORS</Text>
      </View>

      {/* 2. 30 Crore+ Users */}
      <View style={styles.statBox}>
        <Text style={styles.numberText}>30 Crore+</Text>
        <Text style={styles.labelText}>USERS</Text>
      </View>

      {/* 3. 2.5 Lakh+ Establishments */}
      <View style={styles.statBox}>
        <Text style={styles.numberText}>2.5 Lakh+</Text>
        <Text style={styles.labelText}>ESTABLISHMENTS REGISTERED</Text>
      </View>

      {/* 4. BIG LOGO AT THE BOTTOM */}
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://care2connect.in/assets/pp-BXFzvpwK.png' }} 
          style={styles.bigLogo}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Connecting Care Everywhere</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  statBox: {
    alignItems: 'center',
    marginBottom: 40,
  },
  numberText: {
    fontSize: 44,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: -1,
  },
  labelText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8A96AB',
    marginTop: 8,
    letterSpacing: 2,
    textAlign: 'center',
  },
  logoContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: width,
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#F0F4F8',
  },
  bigLogo: {
    width: width * 0.7, // Big size (70% of screen width)
    height: 100,
  },
  tagline: {
    fontSize: 12,
    color: '#BDC3C7',
    fontWeight: '600',
    marginTop: 10,
    letterSpacing: 1,
  }
});

export default PlatformStats;