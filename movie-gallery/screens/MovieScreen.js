import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { image500, image342, image185, fetchMovieDetails } from '../api/moviedb'
import Loading from '../components/loading'

const { width, height } = Dimensions.get('window')

const MovieScreen = () => {
  const {params: item } = useRoute()
  const navigation = useNavigation()
  const [favourite, toggleFavourite] = useState(false)
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState({})

  const handlePress = () => {
    navigation.navigate('Home')
  }

  const handleFavourite = () => {
    toggleFavourite(!favourite)
  }

  useEffect(() => {
    console.log('itemid: ', item.id)
    setLoading(true)
    getMovieDetails(item.id)
  }, [item])

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id)
    // console.log('got movie details: ', data)
    if (data) setMovie(data)
    setLoading(false)
  }

  useEffect(() => {
    //call movie details api
  }, [item])

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={styles.container}
    >
      <SafeAreaView style ={{position: 'absolute', zIndex: 20, width: '100%'}}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button}>
            <Entypo name="chevron-left" size={30} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={handleFavourite}
          >
            <Entypo
              name={favourite ? 'heart' : 'heart-outlined'}
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <Image
          source={{uri: image500(movie?.poster_path) }}
          style={{
            width: width,
            height: height * 0.55,
            resizeMode: 'cover',
          }}
        />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383838',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#E0BC00',
    marginLeft: 20,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
})

export default MovieScreen
