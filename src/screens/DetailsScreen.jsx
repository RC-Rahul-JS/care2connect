import React from 'react';
import { 
  StyleSheet, View, Text, ImageBackground, Image, 
  ScrollView, TouchableOpacity 
} from 'react-native';

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        // This ensures the scrollview doesn't clip the overlapping curve
        overflow="visible" 
      >
        {/* --- SCHEDULED PROCEDURES SECTION --- */}
        <View style={styles.whiteSection}>
          <Text style={styles.sectionTitle}>Scheduled procedures</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            snapToInterval={315} 
            decelerationRate="fast"
          >
            <View style={styles.procedureCard}>
              <View style={styles.cardInfo}>
                <Text style={styles.procTitle}>Electrocardiography (ECG)</Text>
                <Text style={styles.procDate}>17.08 — 10:30</Text>
                <TouchableOpacity style={styles.moreBtn}>
                  <Text style={styles.moreBtnText}>More  +</Text>
                </TouchableOpacity>
              </View>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80' }} 
                style={styles.procImage} 
              />
            </View>
            
            {/* Second Card Placeholder */}
            <View style={[styles.procedureCard, { opacity: 0.5, marginLeft: 15 }]} />
          </ScrollView>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} /><View style={styles.dot} /><View style={styles.dot} />
          </View>
        </View>

        {/* --- MEDITATION PLAYLIST SECTION --- */}
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1000' }} 
          style={styles.playlistCard}
          imageStyle={{ borderRadius: 40 }}
        >
          <View style={styles.playlistHeader}>
            <View>
              <Text style={styles.playlistTitle}>Meditation playlist</Text>
              <Text style={styles.playlistTitle}>from Richard</Text>
            </View>
            
            <View style={styles.avatarStack}>
               <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} style={styles.stackImage} />
               <Image source={{ uri: 'https://randomuser.me/api/portraits/women/2.jpg'}} style={[styles.stackImage, { marginLeft: -15 }]} />
               <Image source={{ uri: 'https://randomuser.me/api/portraits/women/3.jpg'}} style={[styles.stackImage, { marginLeft: -15 }]} />
            </View>
          </View>
          
          <Text style={styles.statsText}>2,4k+ listens a month</Text>

          {/* Floating Music Player */}
          <View style={styles.playerBar}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3004/3004353.png' }} 
              style={styles.trackIcon} 
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.trackTitle}>Rustle of petals</Text>
              <Text style={styles.trackSub}>Flower meditation</Text>
            </View>
            <View style={styles.playerControls}>
               <Text style={styles.timeText}>-3:26</Text>
               <TouchableOpacity style={styles.stopBtn}>
                  <View style={styles.stopInner} />
               </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  scrollContent: { 
    paddingBottom: 40 
  },
  
  whiteSection: { 
    backgroundColor: '#fff', 
    // Deep Corner Curves
    borderTopLeftRadius: 50, 
    borderTopRightRadius: 50, 
    paddingHorizontal: 25,
    paddingBottom: 25,
    // Negative margin creates the "Overlap" on the previous page
    marginTop: -50, 
    // Padding top prevents the title from being hidden by the curve
    paddingTop: 40, 
    // Elevation ensures it stays visually on top
    zIndex: 99,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  sectionTitle: { 
    fontSize: 28, 
    fontWeight: '500', 
    color: '#1a1a1a', 
    marginBottom: 25, 
    textAlign: 'center' 
  },
  procedureCard: { 
    backgroundColor: '#4A90E2', 
    width: 300, 
    borderRadius: 30, 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  cardInfo: { flex: 1 },
  procTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  procDate: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginVertical: 8 },
  procImage: { width: 80, height: 80, borderRadius: 20 },
  moreBtn: { 
    backgroundColor: 'rgba(255,255,255,0.3)', 
    paddingVertical: 8, 
    paddingHorizontal: 15, 
    borderRadius: 20, 
    alignSelf: 'flex-start',
    marginTop: 5
  },
  moreBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  
  pagination: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#ccc', marginHorizontal: 3 },
  activeDot: { backgroundColor: '#4A90E2', width: 12 },

  playlistCard: { 
    margin: 15, 
    height: 400, 
    padding: 25, 
    justifyContent: 'space-between',
    marginTop: 20 
  },
  playlistHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  playlistTitle: { color: '#fff', fontSize: 26, fontWeight: '500', lineHeight: 30 },
  avatarStack: { flexDirection: 'row' },
  stackImage: { width: 45, height: 45, borderRadius: 22, borderWidth: 2, borderColor: '#fff' },
  statsText: { color: 'rgba(255,255,255,0.8)', fontSize: 14, position: 'absolute', top: 110, right: 25 },

  playerBar: { 
    backgroundColor: 'rgba(255,255,255,0.85)', 
    borderRadius: 30, 
    padding: 12, 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  trackIcon: { width: 45, height: 45, borderRadius: 15 },
  trackTitle: { fontSize: 16, fontWeight: '600', color: '#1a1a1a' },
  trackSub: { fontSize: 12, color: '#666' },
  playerControls: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 25, paddingHorizontal: 10, paddingVertical: 5 },
  timeText: { fontSize: 12, color: '#1a1a1a', marginRight: 8 },
  stopBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#4A90E2' },
  stopInner: { width: 10, height: 10, backgroundColor: '#1a1a1a', borderRadius: 2 }
});

export default DetailsScreen;