import {
  Text,
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation, useRoute } from '@react-navigation/native'
import { fetchPersonDetails, fetchPersonMovies, image500 } from '../api/moviedb'
import MovieList from '../components/movieList'
import Loading from '../components/loading'

const { width, height } = Dimensions.get('window')

const PersonScreen = () => {
  const { params: item } = useRoute()
  const [favourite, toggleFavourite] = useState(false)
  const [personMovies, setPersonMovies] = useState([])
  const [person, setPerson] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const handleFavourite = () => {
    toggleFavourite(!favourite)
  }

  const handlePress = () => {
    navigation.goBack()
  }

  useEffect(() => {
    setLoading(true)
    getPersonDetails(item.id)
    getPersonMovies(item.id)
  }, [item])

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id)
    // console.log("got person details: ", data)
    if (data) setPerson(data)
    setLoading(false)
  }

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id)
    // console.log("got person movies: ", data)
    if (data && data.cast) setPersonMovies(data.cast)
    setLoading(false)
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              shadowColor: 'gray',
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View
              style={{
                alignItems: 'center',
                height: 288,
                width: 288,
                overflow: 'hidden',
                borderRadius: 9999,
                borderColor: 'rgb(115,115,115)',
                borderWidth: 1,
              }}
            >
              <Image
                source={{ uri: image500(person?.profile_path) }}
                style={{ height: height * 0.43, width: width * 0.72 }}
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 30,
                color: 'white',
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              {item?.original_name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'rgb(115,115,115)',
                textAlign: 'center',
              }}
            >
              {person?.place_of_birth}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'rgb(64,64,64)',
              borderRadius: 50,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 12,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                borderRightWidth: 2,
                paddingRight: 20,
                marginLeft: 20,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Gender
              </Text>
              <Text style={{ color: 'rgb(212,212,212)', textAlign: 'center' }}>
                {person?.gender == 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View style={{ borderRightWidth: 2, paddingRight: 20 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Birthday
              </Text>
              <Text style={{ color: 'rgb(212,212,212)', textAlign: 'center' }}>
                {person?.birthday}
              </Text>
            </View>
            <View style={{ borderRightWidth: 2, paddingRight: 20 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Known for
              </Text>
              <Text style={{ color: 'rgb(212,212,212)', textAlign: 'center' }}>
                {person?.known_for_department}
              </Text>
            </View>
            <View style={{ paddingRight: 20 }}>
              <Text style={{ color: 'white' }}>Popularity</Text>
              <Text style={{ color: 'rgb(212,212,212)', textAlign: 'center' }}>
                {person?.popularity?.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: 'white', marginLeft: 20, fontSize: 16 }}>
              Biography
            </Text>
            <Text
              style={{
                color: 'rgb(115,115,115)',
                marginLeft: 20,
                marginTop: 8,
                marginRight: 15,
                letterSpacing: 1,
                textAlign: 'justify'
              }}
            >
              {person?.biography}
            </Text>
          </View>
          <MovieList title="Movies" data={personMovies} hideSeeAll={true} />
        </View>
      )}
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

export default PersonScreen
