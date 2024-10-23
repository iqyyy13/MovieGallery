import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { LinearGradient } from 'expo'
import { image500, image342, image185 } from '../api/moviedb'
import { useNavigation } from '@react-navigation/native'

const { width: windowWidth } = Dimensions.get('window')

// Sample data for the carousel with local images
const carouselData = [
  {
    id: 1,
    title: 'Venom: The Last Dance',
    image: require('../assets/image.png'),
  },
  { id: 2, title: 'Transformers One', image: require('../assets/image2.png') },
  { id: 3, title: 'Bleach', image: require('../assets/image3.png') },
]

const CarouselComponent = ({ data }) => {
  const navigation = useNavigation()
  const handleClick = (item) => {
    navigation.navigate('Movie', item)
  }
  return (
    <View style={styles.container}>
      <Carousel
        width={windowWidth}
        height={400} // Set a height for your carousel
        autoPlay={false}
        data={data}
        renderItem={({ item }) => (
          <MovieCard item ={item} handleClick={handleClick} />
        )}
      />
    </View>
  )
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableOpacity key={item.id} onPress={() => handleClick(item)}>
      <View style={styles.slide}>
        <Image
          source={{ uri: image500(item.poster_path) }}
          style={styles.image}
        />
        <Text style={styles.slideText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
})

export default CarouselComponent
