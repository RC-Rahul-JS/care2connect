import React from 'react';
import { 
  StyleSheet, View, Text, Image, 
  TouchableOpacity, FlatList, Dimensions,
  Share, Alert 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const qaData = [
  {
    id: '1',
    time: '17h ago',
    question: 'According to your experience, is tab. Diclofenac SR 100mg useful for sciatica to take with pregabalin and tab. Methylcobalmin...',
    views: 41,
    comments: 0,
    doctors: ['https://randomuser.me/api/portraits/men/1.jpg', 'https://randomuser.me/api/portraits/women/2.jpg'],
    mainDoctor: 'Dr. Dinesh Mehta',
    extraDoctors: 15
  },
  {
    id: '2',
    time: '1h ago',
    question: 'I have acne and pigmentation on the skin! Doctor gave docydin LB everyday to eat and isotretinoin for sat and sunday!',
    views: 120,
    comments: 4,
    doctors: ['https://randomuser.me/api/portraits/women/3.jpg'],
    mainDoctor: 'Dr. Arpita',
    extraDoctors: 1
  },
  {
    id: '3',
    time: '5h ago',
    question: 'My child is suffering from a dry cough for the last 3 days. Can I give him Cetirizine syrup tonight?',
    views: 85,
    comments: 2,
    doctors: ['https://randomuser.me/api/portraits/men/4.jpg', 'https://randomuser.me/api/portraits/men/5.jpg'],
    mainDoctor: 'Dr. Khanna',
    extraDoctors: 5
  },
  {
    id: '4',
    time: '2d ago',
    question: 'Is it normal to have mild chest pain after heavy exercise? I am a 25-year-old male with no history of heart issues.',
    views: 250,
    comments: 12,
    doctors: ['https://randomuser.me/api/portraits/men/6.jpg'],
    mainDoctor: 'Dr. Sharma',
    extraDoctors: 8
  },
  {
    id: '5',
    time: '10h ago',
    question: 'What are the best foods to control high blood pressure naturally without heavy medication?',
    views: 310,
    comments: 15,
    doctors: ['https://randomuser.me/api/portraits/women/7.jpg', 'https://randomuser.me/api/portraits/women/8.jpg'],
    mainDoctor: 'Dr. Sneha',
    extraDoctors: 20
  },
  {
    id: '6',
    time: '20h ago',
    question: 'My hair is falling out in patches. Is this Alopecia Areata and can it be cured with local oils?',
    views: 56,
    comments: 1,
    doctors: ['https://randomuser.me/api/portraits/men/9.jpg'],
    mainDoctor: 'Dr. Vikas',
    extraDoctors: 3
  }
];

const CommunityQA = () => {
  
  // 1. NATIVE SHARE FUNCTION
  const onShare = async (questionText) => {
    try {
      const result = await Share.share({
        message: `Check out this health query on Care AI: \n\n"${questionText}" \n\nDownload the app to see expert answers!`,
      });
      if (result.action === Share.sharedAction) {
        // Shared successfully
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      Alert.alert('Sharing Error', error.message);
    }
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      {/* Header Info */}
      <View style={styles.cardHeader}>
        <View style={styles.userIconContainer}>
           <Ionicons name="people-outline" size={16} color="#4A90E2" />
        </View>
        <View style={styles.headerTextCol}>
          <Text style={styles.communityTitle}>Community Question</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.answeredBadge}>
          <Text style={styles.answeredText}>Answered</Text>
        </View>
      </View>

      {/* Question Content */}
      <View style={styles.questionBox}>
        <Text style={styles.questionText} numberOfLines={4}>
          {item.question}
        </Text>
      </View>

      {/* Doctor Info Row */}
      <View style={styles.doctorRow}>
        <View style={styles.avatarStack}>
          {item.doctors.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={[styles.avatar, { marginLeft: index === 0 ? 0 : -10 }]} />
          ))}
          <View style={styles.plusBadge}>
            <Text style={styles.plusText}>+{item.extraDoctors}</Text>
          </View>
        </View>
        <Text style={styles.doctorNames} numberOfLines={1}>
          {item.mainDoctor} +{item.extraDoctors} Expert Answered →
        </Text>
      </View>

      <View style={styles.divider} />

      {/* Action Row */}
      <View style={styles.actionRow}>
        <View style={styles.stat}>
          <Ionicons name="eye-outline" size={18} color="#8A96AB" />
          <Text style={styles.statText}>{item.views}</Text>
        </View>
        <View style={styles.stat}>
          <MaterialCommunityIcons name="comment-outline" size={18} color="#8A96AB" />
          <Text style={styles.statText}>{item.comments}</Text>
        </View>
        
        {/* SHARE BUTTON */}
        <TouchableOpacity style={styles.stat} onPress={() => onShare(item.question)}>
          <Ionicons name="share-social-outline" size={18} color="#8A96AB" />
          <Text style={styles.statText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* SECTION HEADER */}
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Free Expert Q&A</Text>
        <TouchableOpacity>
          <Text style={styles.exploreText}>Explore all <Ionicons name="chevron-forward" size={14} /></Text>
        </TouchableOpacity>
      </View>

      {/* HORIZONTAL LIST */}
      <FlatList
        data={qaData}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={width * 0.8 + 15} // Width of card + marginRight
      />

      {/* HEALTH QUERY BANNER */}
      <TouchableOpacity style={styles.queryBanner} activeOpacity={0.8}>
        <View style={styles.queryIcon}>
           <MaterialCommunityIcons name="chat-processing" size={24} color="#FFF" />
        </View>
        <View style={styles.queryTextContainer}>
          <View style={styles.queryTitleRow}>
            <Text style={styles.queryTitle}>Got a health query?</Text>
            <View style={styles.freeBadge}><Text style={styles.freeText}>Free</Text></View>
          </View>
          <Text style={styles.querySub}>Ask and get answers from experts for free</Text>
        </View>
        <View style={styles.arrowCircle}>
           <Ionicons name="chevron-forward" size={18} color="#FFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 10, marginBottom: 30 },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginBottom: 15 
  },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
  exploreText: { color: '#4A90E2', fontWeight: '600', fontSize: 14 },
  
  listPadding: { paddingLeft: 20, paddingRight: 10 },
  card: {
    width: width * 0.8,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 18,
    marginRight: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: '#F0F4F8'
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  userIconContainer: { 
    width: 32, height: 32, borderRadius: 16, 
    backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' 
  },
  headerTextCol: { marginLeft: 10, flex: 1 },
  communityTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A1A' },
  timeText: { fontSize: 11, color: '#8A96AB' },
  answeredBadge: { 
    backgroundColor: '#E8F5E9', paddingHorizontal: 8, 
    paddingVertical: 4, borderRadius: 10 
  },
  answeredText: { color: '#4CAF50', fontSize: 10, fontWeight: '700' },
  
  questionBox: { height: 90, marginBottom: 10 },
  questionText: { 
    fontSize: 14, color: '#1A1A1A', 
    lineHeight: 22, fontWeight: '600' 
  },
  
  doctorRow: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: '#F9FAFC', padding: 10, borderRadius: 12 
  },
  avatarStack: { flexDirection: 'row', alignItems: 'center', marginRight: 10 },
  avatar: { 
    width: 26, height: 26, borderRadius: 13, 
    borderWidth: 1.5, borderColor: '#FFF' 
  },
  plusBadge: { 
    width: 26, height: 26, borderRadius: 13, 
    backgroundColor: '#4A90E2', justifyContent: 'center', 
    alignItems: 'center', marginLeft: -10, borderWidth: 1.5, borderColor: '#FFF' 
  },
  plusText: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },
  doctorNames: { fontSize: 11, color: '#4A90E2', fontWeight: '700', flex: 1 },
  
  divider: { height: 1, backgroundColor: '#F0F4F8', marginVertical: 15 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { flexDirection: 'row', alignItems: 'center', padding: 5 },
  statText: { fontSize: 12, color: '#8A96AB', marginLeft: 6, fontWeight: '600' },

  // BANNER STYLES
  queryBanner: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', 
    marginHorizontal: 20, marginTop: 25, padding: 18, borderRadius: 25,
    elevation: 3, borderWidth: 1, borderColor: '#F0F4F8'
  },
  queryIcon: { 
    width: 50, height: 50, borderRadius: 25, 
    backgroundColor: '#7C4DFF', justifyContent: 'center', alignItems: 'center' 
  },
  queryTextContainer: { flex: 1, marginLeft: 15 },
  queryTitleRow: { flexDirection: 'row', alignItems: 'center' },
  queryTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A1A' },
  freeBadge: { 
    backgroundColor: '#FFB300', paddingHorizontal: 8, 
    paddingVertical: 2, borderRadius: 8, marginLeft: 8 
  },
  freeText: { color: '#FFF', fontSize: 10, fontWeight: '800' },
  querySub: { fontSize: 12, color: '#8A96AB', marginTop: 4 },
  arrowCircle: { 
    width: 34, height: 34, borderRadius: 17, 
    backgroundColor: '#4A90E2', justifyContent: 'center', alignItems: 'center' 
  }
});

export default CommunityQA;