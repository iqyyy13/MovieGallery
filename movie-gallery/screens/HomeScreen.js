import * as React from 'react'
import { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, PanResponder } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Entypo from 'react-native-vector-icons/Entypo'
import TrendingMovies from '../components/trendingMovies'
import MovieList from '../components/movieList'
import Loading from '../components/loading'

import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
} from '../api/moviedb'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HomeScreen = ({ navigation }) => {
  const [trending, setTrending] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topRated, setTopRated] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  }, [])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies()
    // console.log('got trending movies: ', data)
    if (data && data.results) {
      setTrending(data.results)
    }
    setLoading(false)
  }

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies()
    // console.log('got upcoming movies: ', data)
    if (data && data.results) {
      setUpcoming(data.results)
    }
    setLoading(false)
  }

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies()
    // console.log('got top rated movies: ', data)
    if (data && data.results) {
      setTopRated(data.results)
    }
    setLoading(false)
  }

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
      },
      onPanResponderMove: (evt, gestureState) => {
        evt.preventDefault()
      },
    })
  ).current
  
  const handleSeeAllUpcoming = () => {
    console.log("OK")
    navigation.push('SeeAll', { title: 'Upcoming', type: 'Upcoming'})
  }

  const handleSeeAllTopRated = () => {
    console.log("NOO")
    navigation.push('SeeAll', { title: 'Top Rated', type: 'TopRated'})

  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar style="light" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Entypo name="menu" size={30} color={'white'} paddingLeft={20} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 30 }}> Movies </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Entypo
              name="magnifying-glass"
              size={30}
              color={'white'}
              paddingRight={20}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
          {...panResponder.panHandlers}
        >
          {trending.length > 0 && <TrendingMovies data={trending} />}

          <MovieList title="Upcoming" data={upcoming} onSeeAllPress={handleSeeAllUpcoming}/>
          <MovieList title="Top Rated" data={topRated} onSeeAllPress={handleSeeAllTopRated}/>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383838',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default HomeScreen
