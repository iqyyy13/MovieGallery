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
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  image500,
  image342,
  image185,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
  fetchMovieTrailer
} from '../api/moviedb'
import Loading from '../components/loading'
import { LinearGradient } from 'expo-linear-gradient'

import MovieList from '../components/movieList'
import Cast from '../components/cast'

const { width, height } = Dimensions.get('window')

const MovieScreen = () => {
  const { params: item } = useRoute()
  const navigation = useNavigation()
  const [favourite, toggleFavourite] = useState(false)
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState({})
  const [similarMovies, setSimilarMovies] = useState([])
  const [cast, setCast] = useState([])
  const [trailer, setTrailer] = useState([])
  const [officialTrailerKey, setOfficialTrailerKey] = useState(null)

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
    getMovieCredits(item.id)
    getSimilarMovies(item.id)
    getMovieTrailer(item.id)
  }, [item])

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id)
    // console.log('got movie details: ', data)
    if (data) setMovie(data)
    setLoading(false)
  }

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id)
    // console.log('got casts: ', data)
    if (data && data.cast) setCast(data.cast)
    setLoading(false)
  }

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id)
    // console.log('got similar movies: ', data)
    if (data && data.results) setSimilarMovies(data.results)
    setLoading(false)
  }

  const getMovieTrailer = async (id) => {
    const data = await fetchMovieTrailer(id)
    console.log('got movie trailer: ', data)
    if (data && data.results) setTrailer(data.results)
    setLoading(false)
  }

  useEffect(() => {

    //call movie details api
  }, [item])

  useEffect(() => {
    // console.log("DATA OBTAINED")
    const officialTrailer = trailer.find(video => video.name.includes("Official Trailer"))
    setOfficialTrailerKey(officialTrailer ? officialTrailer.key : null)
    console.log(officialTrailerKey)
  }, [trailer])

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
      <TouchableOpacity
        style={{
          backgroundColor: 'rgb(163 163 163)',
          borderRadius: 20,
          width: '25%',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'space-evenly',
          flexDirection: 'row'
        }}
        onPress={() => navigation.push('Video', officialTrailerKey)}
      >
        <FontAwesome name="play-circle" size={20} color={'white'}/>
        <Text
          style={{
            marginTop: 10,
            color: 'white',
            textAlign: 'center',
            marginBottom: 10,
            fontWeight: 800,
          }}
        >
          Play Trailer?
        </Text>
      </TouchableOpacity>
      <Cast cast={cast} />
      <MovieList
        title="Similar Movies"
        data={similarMovies}
        hideSeeAll={true}
      />
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
