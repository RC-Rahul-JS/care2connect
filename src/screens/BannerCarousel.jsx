import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, View, Text, Image, TouchableOpacity, 
  FlatList, Dimensions 
} from 'react-native';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

const BannerCarousel = ({ data, onBannerPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const timer = setInterval(() => {
        let nextIndex = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      }, 5000); 
      return () => clearInterval(timer);
    }
  }, [activeIndex, data?.length]);

  const renderItem = ({ item, index }) => {
    // If it's the first item and isVideo, we treat it as a full-background video
    const isFullVideo = index === 0 && item.isVideo;

    return (
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={() => onBannerPress(item)} 
        style={[
          styles.bannerCard, 
          !isFullVideo && { backgroundColor: 'rgba(255, 255, 255, 0.15)' }
        ]}
      >
        {/* VIDEO BACKGROUND LOGIC */}
        {item.isVideo && (
          <Video
            source={item.videoPath} 
            style={isFullVideo ? styles.fullVideoBackground : styles.sideVideoStyle}
            muted={true}
            repeat={true}
            resizeMode="cover"
            playInBackground={false}
            paused={activeIndex !== index} 
          />
        )}

        {/* Semi-transparent Overlay for Full Video to ensure text readability */}
        {isFullVideo && <View style={styles.videoOverlay} />}

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subTitle}>{item.subTitle}</Text>
          
          <View style={styles.btn}>
            <Text style={styles.btnText}>Get Cost Estimate</Text>
          </View>
          
          <Text style={styles.footerText}>
            All insurances accepted & No Cost EMI available
          </Text>
        </View>
        
        {/* Regular Image for non-video banners or secondary banners */}
        {!isFullVideo && item.image && (
          <Image source={{ uri: item.image }} style={styles.image} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToInterval={CARD_WIDTH + 10} 
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + 10));
          setActiveIndex(newIndex);
        }}
      />
      
      <View style={styles.dotRow}>
        {data.map((_, i) => (
          <View 
            key={i} 
            style={[
              styles.dot, 
              activeIndex === i ? styles.activeDot : styles.inactiveDot
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 15 },
  bannerCard: { 
    width: CARD_WIDTH, 
    height: 170, 
    borderRadius: 30, 
    flexDirection: 'row', 
    padding: 20, 
    overflow: 'hidden',
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)', 
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)', 
  },
  fullVideoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  sideVideoStyle: {
    width: 140,
    height: '140%',
    position: 'absolute',
    right: -10,
    bottom: -10,
    borderRadius: 20,
  },
  textContainer: { flex: 1, justifyContent: 'center', zIndex: 10 },
  title: { 
    color: '#FFF', 
    fontSize: 22, 
    fontWeight: 'bold', 
    textShadowColor: 'rgba(0, 0, 0, 0.4)', 
    textShadowOffset: {width: 1, height: 1}, 
    textShadowRadius: 3 
  },
  subTitle: { color: '#FFF', fontSize: 14, marginVertical: 6, fontWeight: '500' },
  btn: { 
    backgroundColor: '#FFF', 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 15, 
    alignSelf: 'flex-start', 
    marginTop: 8 
  },
  btnText: { color: '#1A1A1A', fontSize: 12, fontWeight: '700' },
  footerText: { color: 'rgba(255,255,255,0.8)', fontSize: 10, marginTop: 12 },
  image: { width: 100, height: 120, position: 'absolute', right: 10, bottom: 0, resizeMode: 'contain' },
  dotRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
  dot: { height: 6, borderRadius: 3, marginHorizontal: 4 },
  activeDot: { width: 20, backgroundColor: '#FFF' },
  inactiveDot: { width: 6, backgroundColor: 'rgba(255,255,255,0.4)' },
});

export default BannerCarousel;