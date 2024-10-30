import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  fetchMoreTopRatedMovies,
  fetchMoreUpcomingMovies,
  image342,
} from '../api/moviedb'
import Loading from '../components/loading'

const { width, height } = Dimensions.get('window')

const SeeAllScreen = () => {
  const route = useRoute()
  const { title, type } = route.params

  const navigation = useNavigation()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchMovies = (page) => {
    setLoading(true)

    if (type === 'Upcoming') {
      fetchMoreUpcomingMovies({
        language: 'en-US',
        page: page.toString(),
      }).then((data) => {
        setLoading(false)
        if (data && data.results) {
          setResults(data.results)
          setTotalPages(data.total_pages)
        }
      })
    }

    if (type === 'TopRated')
      fetchMoreTopRatedMovies({
        language: 'en-US',
        page: page.toString(),
      }).then((data) => {
        setLoading(false)
        console.log('got top rated movies', data)
        if (data && data.results) {
          setResults(data.results)
          setTotalPages(data.total_pages)
        }
      })
  }

  const goToPage = (page) => {
    setLoading(true)
    setCurrentPage(page)
    fetchMovies(page)
  }

  useEffect(() => {
    fetchMovies(currentPage)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={30} color={'white'} />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 30 }}> {title} </Text>
        <View style={styles.rightSpacer} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: '#202020' }}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <Text
              style={{
                color: 'white',
                marginLeft: 5,
                marginTop: 12,
                marginBottom: 10,
              }}
            >
              Results ({results.length})
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              {results.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => navigation.push('Movie', item)}
                  >
                    <View>
                      <Image
                        style={{
                          borderRadius: 24,
                          width: width * 0.44,
                          height: height * 0.3,
                        }}
                        source={{ uri: image342(item?.poster_path) }}
                      />
                      <Text
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          marginBottom: 10,
                          marginTop: 5,
                        }}
                      >
                        {item?.title.length > 22
                          ? item?.title.slice(0, 22) + '...'
                          : item?.title}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              })}
            </View>
          </>
        )}
      </ScrollView>
      <View style={{ paddingVertical: 5, alignItems: 'center' }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <TouchableOpacity
                key={index + 1}
                onPress={() => goToPage(index + 1)}
                style={[
                  styles.pageButton,
                  currentPage === index + 1 && styles.activePageButton,
                ]}
              >
                <Text style={{ color: '#000' }}>{index + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383838',
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#E0BC00',
    marginLeft: 20,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  pageButton: {
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: '#007bff',
  },
  rightSpacer: {
    width: 60,
  },
})

export default SeeAllScreen
