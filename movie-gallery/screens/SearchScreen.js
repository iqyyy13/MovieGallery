import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Button,
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import { searchMovies, image342 } from '../api/moviedb'
import Loading from '../components/loading'
import { debounce } from 'lodash'

const { width, height } = Dimensions.get('window')

const SearchScreen = () => {
  const navigation = useNavigation()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [totalPages, setTotalPages] = useState(0)

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true)
      setSearchQuery(value)
      setCurrentPage(1)
      fetchMovies(value, 1)
    } else {
      setLoading(false)
      setResults([])
      setTotalPages(0)
    }
  }

  const fetchMovies = (query, page) => {
    searchMovies({
      query: query,
      include_adult: false,
      language: 'en-US',
      page: page.toString(),
    }).then((data) => {
      setLoading(false)
      console.log('got movies', data)
      if (data && data.results) {
        setResults(data.results)
        setTotalPages(data.total_pages)
      }
    })
  }

  const loadMoreMovies = () => {
    if (searchQuery) {
      const nextPage = currentPage + 1
      fetchMovies(searchQuery, nextPage)
      setCurrentPage(nextPage)
    }
  }

  const goToPage = (page) => {
    setLoading(true)
    setCurrentPage(page)
    fetchMovies(searchQuery, page)
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

  console.log('QUERY IS:', searchQuery)
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 10,
          marginTop: 20,
          marginRight: 10,
          alignItems: 'center',
          borderWidth: 2,
          borderRadius: 9999,
          borderColor: 'lightgray',
        }}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          style={{
            letterSpacing: 1,
            marginLeft: 20,
            flex: 1,
            flexDirection: 'row',
            fontWeight: '500',
            color: 'white',
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Entypo name="circle-with-cross" size={45} color={'lightgray'} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
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
      </ScrollView>
      <View style={{paddingVertical:5}}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
})

export default SearchScreen
