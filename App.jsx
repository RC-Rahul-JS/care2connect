import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import existing screens
import Mainloading from './src/screens/Mainloading'; 
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import DoctorsListScreen from './src/screens/DoctorsListScreen';
import FindDoctorsScreen from './src/screens/FindDoctorsScreen'; 
import SearchToggleHeader from './src/screens/SearchToggleHeader';
import LocationSelectionScreen from './src/screens/LocationSelectionScreen'; 
import OnlineConsultScreen from './src/screens/OnlineConsultScreen';
import AppointmentBookingScreen from './src/screens/AppointmentBookingScreen';
import DoctorProfileScreen from './src/screens/DoctorProfileScreen';
import GlassDoctorList from './src/screens/GlassDoctorList';
import BookingSuccessScreen from './src/screens/BookingSuccessScreen';
import PageLoading from './src/screens/PageLoading'; 
import UserProfileScreen from './src/screens/UserProfileScreen';
import Navbar from './src/components/Navbar';
import LoginScreen from './src/screens/login';
import SignUpDetailScreen from './src/screens/SignUpDetailScreen';

// 1. Import the New Appointment History Screen
import AppointmentHistoryScreen from './src/screens/AppointmentHistoryScreen'; 

const Stack = createNativeStackNavigator();

const MainLandingPage = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HomeScreen />
        <DetailsScreen />
        <View style={styles.welcomeWrapper}>
          <WelcomeScreen />
        </View>
      </ScrollView>
    </View>
  );
};

export default function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return <Mainloading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* initialRouteName set to Login for flow control */}
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="Landing" component={MainLandingPage} />
          <Stack.Screen name="DoctorsList" component={DoctorsListScreen} />
          <Stack.Screen name="FindDoctorsScreen" component={FindDoctorsScreen} />
          <Stack.Screen name="OnlineConsultScreen" component={OnlineConsultScreen} />
          <Stack.Screen name="SearchToggleHeader" component={SearchToggleHeader} />         
          <Stack.Screen name="AppointmentBooking" component={AppointmentBookingScreen} />      
          <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />   
          <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
          <Stack.Screen name="PageLoading" component={PageLoading} />
          <Stack.Screen name="GlassDoctorList" component={GlassDoctorList} />
          <Stack.Screen name="LocationSelection" component={LocationSelectionScreen} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUpDetail" component={SignUpDetailScreen} />
          
          {/* 2. Added AppointmentHistory to the Navigator */}
          <Stack.Screen name="AppointmentHistory" component={AppointmentHistoryScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { overflow: 'visible' },
  welcomeWrapper: { height: 800, backgroundColor: '#F9FAFC' }
});