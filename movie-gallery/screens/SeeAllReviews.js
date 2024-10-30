import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation, useRoute } from '@react-navigation/native'
import { fetchMoreReviewMovies } from '../api/moviedb'
import Loading from '../components/loading'
import { Avatar, Button, Card } from 'react-native-paper'

const defaultProfilePhoto = require('../assets/default_profile.jpg')

const SeeAllReviews = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { id, title } = route.params
  const header = 'All Reviews'

  const fetchReviews = (page) => {
    setLoading(true)
    fetchMoreReviewMovies(id, {
      language: 'en-US',
      page: page.toString(),
    }).then((data) => {
      setLoading(false)
      if (data && data.results) setResults(data.results)
      setTotalPages(data.total_pages)
    })
  }

  const goToPage = (page) => {
    setLoading(true)
    setCurrentPage(page)
    fetchMovies(page)
  }

  const handlePress = (item) => {
    // console.log('pressed', item)
    navigation.push('Review', { item, title })
  }

  useEffect(() => {
    fetchReviews(currentPage)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#383838' }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={30} color={'white'} />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 30 }}>{header}</Text>
        <View style={styles.rightSpacer} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          backgroundColor: '#202020',
        }}
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
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              {results.map((item, index) => {
                const avatarUri = item.author_details.avatar_path
                  ? {
                      uri: `https://image.tmdb.org/t/p/w150_and_h150_face/${item.author_details.avatar_path}`,
                    }
                  : defaultProfilePhoto
                return (
                  <Card
                    key={index}
                    onPress={() => handlePress(item)}
                    style={{
                      width: 370,
                      margin: 10,
                      backgroundColor: 'rgb(38 38 38)',
                      overflow: 'hidden',
                      borderWidth: 1,
                      borderColor: 'white',
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginBottom: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Image source={avatarUri} style={styles.coverImage} />
                      <Text style={{ fontSize: 18, color: 'white' }}>
                        {item.author}
                      </Text>
                      <View style={styles.spacer}></View>
                      {item.author_details.rating !== null ? (
                        <View style={styles.containerStar}>
                          <FontAwesome
                            name="star"
                            size={20}
                            color={'rgb(255 234 0)'}
                            style={{ marginLeft: 5 }}
                          />
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 20,
                              marginLeft: 5,
                              marginBottom: 3,
                            }}
                          >
                            {item.author_details.rating}
                          </Text>
                        </View>
                      ) : (
                        <View style={{ width: 150 }}></View>
                      )}
                    </View>
                    <Card.Content>
                      <Text
                        variant="bodyMedium"
                        numberOfLines={4}
                        ellipsizeMode="tail"
                        style={{
                          fontSize: 18,
                          textAlign: 'justify',
                          color: 'white',
                          lineHeight: 25
                        }}
                      >
                        {item.content}
                      </Text>
                    </Card.Content>
                  </Card>
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
  rightSpacer: {
    width: 60,
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
  coverImage: {
    width: 50, // Full width of the card
    height: 50, // Set height for the image
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
  },
  containerStar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    right: 0,
    marginRight: 10,
  },
  spacer: {
    width: 50,
  },
})

export default SeeAllReviews
