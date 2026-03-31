import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Image, ScrollView, 
  TouchableOpacity, TextInput, Dimensions, StatusBar, ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";
// 1. Import your PageLoading component
import PageLoading from './PageLoading'; 

const { width } = Dimensions.get('window');

const AppointmentBookingScreen = ({ navigation, route }) => {
  const { doctorName, doctorPic, doctorDegree, doctorAddress } = route.params || {
    doctorName: 'Dr. Anurag Tiwari',
    doctorPic: 'https://randomuser.me/api/portraits/men/15.jpg',
    doctorDegree: 'MBBS, MD - Orthopaedics',
    doctorAddress: 'Habib Ganj, Bhopal'
  };

  const today = new Date().toISOString().split('T')[0];
  
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [ageDetails, setAgeDetails] = useState({ years: 0, months: 0, days: 0 });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
  // 2. Add loading state
  const [isProcessing, setIsProcessing] = useState(false);

  const timeSlots = [
    '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM', '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM',
  ];

  const handleConfirmDOB = (date) => {
    const todayDate = new Date();
    const birthDate = new Date(date);
    let years = todayDate.getFullYear() - birthDate.getFullYear();
    let months = todayDate.getMonth() - birthDate.getMonth();
    let days = todayDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const previousMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 0).getDate();
      days += previousMonth;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setDob(birthDate.toLocaleDateString('en-GB'));
    setAgeDetails({ years, months, days });
    setDatePickerVisibility(false);
  };

  // 3. Create the handlePayment function
  const handlePayment = () => {
    setIsProcessing(true); // Start loading

    setTimeout(() => {
      setIsProcessing(false); // Stop loading
      navigation.navigate('BookingSuccess', { 
        doctorName, 
        patientName,
        date: selectedDate,
        time: timeSlots[selectedSlot],
        age: `${ageDetails.years} Years`, 
        gender: gender
      });
    }, 5000); // 5 seconds delay
  };

  // 4. Conditional Return: If processing, show PageLoading
  if (isProcessing) {
    return <PageLoading />;
  }

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/7d/92/38/7d923880728193337fe46ec6c8e26184.jpg' }} 
      style={styles.container}
      blurRadius={15}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassIconBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Appointment</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.glassCardLarge}>
            <Image source={{ uri: doctorPic }} style={styles.doctorImg} />
            <View style={styles.doctorInfo}>
              <Text style={styles.nameText}>{doctorName}</Text>
              <Text style={styles.degreeText}>{doctorDegree}</Text>
              <View style={styles.addressRow}>
                <Ionicons name="location-sharp" size={14} color="rgba(255,255,255,0.7)" />
                <Text style={styles.addressText}>{doctorAddress}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.glassCardForm}>
            <TextInput 
              style={styles.glassInput} 
              placeholder="Patient Full Name" 
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={patientName}
              onChangeText={setPatientName}
            />
            <TextInput 
              style={styles.glassInput} 
              placeholder="Father / Guardian Name" 
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={fatherName}
              onChangeText={setFatherName}
            />

            <View style={styles.rowBetween}>
              <View style={styles.genderWrapper}>
                {['Male', 'Female'].map((item) => (
                  <TouchableOpacity 
                    key={item} 
                    style={[styles.genderBtn, gender === item && styles.activeGenderBtn]}
                    onPress={() => setGender(item)}
                  >
                    <Text style={[styles.genderText, gender === item && styles.activeGenderText]}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.dobPickerBtn} onPress={() => setDatePickerVisibility(true)}>
                <Text style={styles.dobLabel}>DOB</Text>
                <Text style={styles.dobValue}>{dob || "Select"}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ageDisplayCard}>
                <Text style={styles.ageLabelSmall}>CALCULATED AGE</Text>
                <View style={styles.ageValueRow}>
                    <View style={styles.ageItem}><Text style={styles.ageNum}>{ageDetails.years}</Text><Text style={styles.ageUnit}>Yrs</Text></View>
                    <View style={styles.ageItem}><Text style={styles.ageNum}>{ageDetails.months}</Text><Text style={styles.ageUnit}>Mos</Text></View>
                    <View style={styles.ageItem}><Text style={styles.ageNum}>{ageDetails.days}</Text><Text style={styles.ageUnit}>Days</Text></View>
                </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Select Appointment Date</Text>
          <View style={styles.calendarWrapper}>
            <Calendar
              minDate={today}
              onDayPress={day => {
                setSelectedDate(day.dateString);
                setSelectedSlot(null);
              }}
              enableSwipeMonths={true}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#FFF', selectedTextColor: '#383981' }
              }}
              theme={{
                calendarBackground: 'transparent',
                textSectionTitleColor: '#FFF',
                dayTextColor: '#FFF',
                todayTextColor: '#5CF08C',
                selectedDayBackgroundColor: '#FFF',
                monthTextColor: '#FFF',
                arrowColor: '#FFF',
              }}
            />
          </View>

          <View style={styles.slotHeader}>
              <Text style={styles.sectionTitle}>Available Slots</Text>
              <View style={styles.dateTag}><Text style={styles.tagText}>{selectedDate}</Text></View>
          </View>
          
          <View style={styles.slotGrid}>
            {timeSlots.map((slot, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.slotCard, selectedSlot === index && styles.activeSlotCard]}
                onPress={() => setSelectedSlot(index)}
              >
                <Text style={[styles.slotText, selectedSlot === index && styles.activeSlotText]}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.bookBtn, (selectedSlot === null || !patientName) && styles.disabledBtn]}
            disabled={selectedSlot === null || !patientName}
            // 5. Connect to the handler
            onPress={handlePayment} 
          >
            <Text style={styles.bookBtnText}>Confirm and Pay</Text>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDOB}
          onCancel={() => setDatePickerVisibility(false)}
          maximumDate={new Date()}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

// ... Styles stay exactly the same ...
const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, justifyContent: 'space-between' },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#FFF' },
  glassIconBtn: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 12 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 30 },
  glassCardLarge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.25)', padding: 15, borderRadius: 25, borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)', marginBottom: 20 },
  doctorImg: { width: 70, height: 70, borderRadius: 20 },
  doctorInfo: { marginLeft: 15, flex: 1 },
  nameText: { fontSize: 20, fontWeight: '700', color: '#FFF' },
  degreeText: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  addressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  addressText: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginLeft: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#FFF', marginTop: 10, marginBottom: 15 },
  glassCardForm: { backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 20, borderRadius: 25, borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.3)', marginBottom: 20 },
  glassInput: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 15, paddingHorizontal: 15, height: 50, color: '#FFF', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', marginBottom: 12 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  genderWrapper: { flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 15, padding: 4, width: '55%', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  genderBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 12 },
  activeGenderBtn: { backgroundColor: '#FFF' },
  genderText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  activeGenderText: { color: '#383981' },
  dobPickerBtn: { backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', width: '40%', justifyContent: 'center' },
  dobLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 'bold' },
  dobValue: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  ageDisplayCard: { backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: 12, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  ageLabelSmall: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  ageValueRow: { flexDirection: 'row', justifyContent: 'space-around' },
  ageItem: { alignItems: 'center' },
  ageNum: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  ageUnit: { color: 'rgba(255,255,255,0.5)', fontSize: 10 },
  calendarWrapper: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 25, padding: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  slotHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 25, marginBottom: 15 },
  dateTag: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10 },
  tagText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  slotCard: { width: '48%', padding: 15, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.15)', marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  activeSlotCard: { backgroundColor: '#FFF' },
  slotText: { fontSize: 12, fontWeight: '700', color: '#FFF' },
  activeSlotText: { color: '#383981' },
  footer: { padding: 20 },
  bookBtn: { backgroundColor: '#FFF', padding: 18, borderRadius: 25, alignItems: 'center' },
  disabledBtn: { backgroundColor: 'rgba(255,255,255,0.3)' },
  bookBtnText: { color: '#383981', fontWeight: 'bold', fontSize: 18 },
});

export default AppointmentBookingScreen;