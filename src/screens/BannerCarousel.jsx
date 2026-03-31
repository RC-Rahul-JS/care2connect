import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, View, Text, Image, TouchableOpacity, 
  FlatList, Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

const BannerCarousel = ({ data, onBannerPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  // Auto-slide logic
  useEffect(() => {
    if (data.length > 0) {
      const timer = setInterval(() => {
        let nextIndex = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      }, 3500);
      return () => clearInterval(timer);
    }
  }, [activeIndex, data.length]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={() => onBannerPress(item)} // Navigation Trigger
      style={[styles.bannerCard, { backgroundColor: item.color }]}
    >
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
      
      <Image source={{ uri: item.image }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / (width - 40));
          setActiveIndex(newIndex);
        }}
      />
      
      <View style={styles.dotRow}>
        {data.map((_, i) => (
          <View 
            key={i} 
            style={[styles.dot, activeIndex === i ? styles.activeDot : styles.inactiveDot]} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 15 },
  bannerCard: { 
    width: width - 40, 
    height: 160, 
    borderRadius: 20, 
    flexDirection: 'row', 
    padding: 15, 
    overflow: 'hidden',
    marginRight: 10 
  },
  textContainer: { flex: 1.5, justifyContent: 'center' },
  title: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  subTitle: { color: '#FFF', fontSize: 12, marginVertical: 6, opacity: 0.9 },
  btn: { backgroundColor: '#FFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignSelf: 'flex-start' },
  btnText: { color: '#000', fontSize: 11, fontWeight: 'bold' },
  footerText: { color: '#FFF', fontSize: 8, marginTop: 12, opacity: 0.7 },
  image: { width: 100, height: 120, position: 'absolute', right: 10, bottom: 0, resizeMode: 'contain' },
  dotRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  dot: { height: 6, borderRadius: 3, marginHorizontal: 3 },
  activeDot: { width: 20, backgroundColor: '#333' },
  inactiveDot: { width: 6, backgroundColor: '#CCC' },
});

export default BannerCarousel;