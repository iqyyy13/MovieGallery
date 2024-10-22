import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo'

const { width: windowWidth } = Dimensions.get('window');

// Sample data for the carousel with local images
const carouselData = [
  { id: 1, title: 'Venom: The Last Dance', image: require('../assets/image.png') },
  { id: 2, title: 'Transformers One', image: require('../assets/image2.png') },
  { id: 3, title: 'Bleach', image: require('../assets/image3.png') },
];

const CarouselComponent = () => {
  return (
    <View style={styles.container}>
      <Carousel
        width={windowWidth}
        height={400} // Set a height for your carousel
        autoPlay={false}
        data={carouselData}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.slideText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide: {
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    height: 400, // Match height with the carousel height
  },
  image: {
    height: 350, // Height of the image
    resizeMode: 'cover', // Adjust image scaling
    width: windowWidth * 0.6,
    borderRadius: 20,
  },
  slideText: {
    fontSize: 24,
    marginTop: 10, // Space between image and text
    color: 'white',
  },
});

export default CarouselComponent;
