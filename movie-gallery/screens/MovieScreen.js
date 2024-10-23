import {
  View,
  Text,
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
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')

const MovieScreen = () => {
  const { params: item } = useRoute()
  const navigation = useNavigation()
  const [favourite, toggleFavourite] = useState(false)
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState({})

  const handlePress = () => {
    navigation.goBack()
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
      <SafeAreaView style={{ position: 'absolute', zIndex: 20, width: '100%' }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
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
        <View>
          <Image
            source={{ uri: image500(movie?.poster_path) }}
            style={{
              width: width,
              height: height * 0.55,
              resizeMode: 'cover',
            }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(23,23,23,0.6)', 'rgba(23,23,23,1)']}
            style={{
              width,
              height: height * 0.55,
              position: 'absolute',
              bottom: '0',
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </View>
      )}

      <View style={{ marginTop: -(height * 0.09) }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '800',
            fontSize: 30,
            textAlign: 'center',
          }}
        >
          {movie?.title}
        </Text>
        <Text
          style={{
            color: 'rgb(163,163,163)',
            fontWeight: '600',
            textAlign: 'center',
            fontSize: 16,
            marginTop: 10,
          }}
        >
          {movie?.status} • {movie?.release_date?.split('-')[0]} •{' '}
          {movie?.runtime} min
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.length
            return (
              <Text
                key={index}
                style={{
                  color: 'rgb(163,163,163)',
                  fontWeight: '600',
                  fontSize: 16,
                  marginRight: showDot ? 5 : 0,
                  marginTop: 5,
                }}
              >
                {genre?.name} {showDot ? '•' : null}
              </Text>
            )
          })}
        </View>
        <Text
          style={{
            color: 'rgb(163,163,163)',
            fontWeight: '600',
            textAlign: 'center',
            marginTop: 20,
            marginHorizontal: 10,
            fontSize: 15,
          }}
        >
          {movie?.overview}
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(23,23,23)',
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
