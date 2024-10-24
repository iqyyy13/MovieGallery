import * as React from 'react'
import { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Entypo from 'react-native-vector-icons/Entypo'
import TrendingMovies from '../components/trendingMovies'
import MovieList from '../components/movieList'
import Loading from '../components/loading'

import { fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb'

const HomeScreen = ({ navigation }) => {
  const [trending, setTrending] = useState([])
  const [upcoming, setUpcoming] = useState([1,2,3])
  const [topRated, setTopRated] = useState([1,2,3])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTrendingMovies()
    // getUpcomingMovies()
  }, [])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies()
    console.log('got trending movies: ', data)
    if (data && data.results) {
      setTrending(data.results)
    }
    setLoading(false)
  }

  // const getUpcomingMovies = async () => {
  //   const data = await fetchUpcomingMovies()
  //   console.log('got upcoming movies: ', data)
  //   if (data && data.results) {
  //     setUpcoming(data.results)
  //   }
  //   setLoading(false)
  // }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Entypo name="menu" size={30} color={'white'} paddingLeft={20} />
          <Text style={{ color: 'white', fontSize: 30 }}> Movies </Text>
          <Entypo
            name="magnifying-glass"
            size={30}
            color={'white'}
            paddingRight={20}
          />
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trending.length > 0 && <TrendingMovies data={trending} />}

          <MovieList title="Upcoming" data={upcoming} />
          <MovieList title="Top Rated" data={topRated} />
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
