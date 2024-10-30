import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

const FavouritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([])

  const getFavoriteMovies = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorite_movies')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      console.error('Failed to load movies:', e)
    }
  }

  const fetchFavorites = async () => {
    const savedFavorites = await getFavoriteMovies()
    console.log('SAVED: ', savedFavorites)
    setFavorites(savedFavorites)
  }

  const handlePress = () => {
    fetchFavorites()
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchFavorites()
    }, [])
  )

  // useEffect(() => {
  //   fetchFavorites()
  // }, [favorites])

  const clearAll = async () => {
    try {
      console.log("CLEARRR")
      await AsyncStorage.clear()
    } catch (e) {
      console.log('Error Type: ', e)
    }
  }

  console.log('favorites are: ', favorites)

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Entypo name="menu" size={30} color={'white'} paddingLeft={20} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 30 }}> Favourites </Text>
          <TouchableOpacity onPress={() => handlePress()}>
            <Entypo
              name="magnifying-glass"
              size={30}
              color={'white'}
              paddingRight={20}
            />
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: 'red' }}>
          {favorites && favorites.length > 0 ? (
            favorites.map((id) => (
              <View key={id} style={{ padding: 5 }}>
                <Text style={{ color: 'white' }}>Movie ID: {id}</Text>
              </View>
            ))
          ) : (
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
              {' '}
              No favorite movies found{' '}
            </Text>
          )}
        </View>
        <View style={{top: 200}}>
          <TouchableOpacity onPress={() => clearAll()}>
            <View
              style={{
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 9999,
                width: '25%',
                alignSelf: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
                Delete Favorites{' '}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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

export default FavouritesScreen
