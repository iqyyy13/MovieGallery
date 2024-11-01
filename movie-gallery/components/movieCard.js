import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Modal, PaperProvider, Portal } from 'react-native-paper'
import { fetchMovieDetails, image342 } from '../api/moviedb'
import Icon from 'react-native-vector-icons/MaterialIcons'

const MovieCard = ({ id, onEdit }) => {
  const [movie, setMovie] = useState([])

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id)
    console.log('got movie details: ', data)
    if (data) setMovie(data)
  }

  useEffect(() => {
    getMovieDetails(id)
  }, [])

  // console.log('id is: ', id)
  // console.log('movie', movie)

  return (
    <View>
      <Card
        style={{
          backgroundColor: 'rgb(112 112 112)',
          marginHorizontal: 10,
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: image342(movie?.poster_path) }}
              style={styles.coverImage}
            />
            <Text style={{ color: 'white', fontSize: 20 }}>{movie.title}</Text>
          </View>
          <TouchableOpacity style={{ paddingTop: 15, paddingRight: 15 }} onPress={() => onEdit(movie)}>
            <Icon
              name="edit"
              size={20}
              color={'white'}
              style={{
                borderWidth: 2,
                borderRadius: 9999,
                backgroundColor: '#202020',
                paddingTop: 2,
                paddingLeft: 5,
              }}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  coverImage: {
    width: 110, // Full width of the card
    height: 150, // Set height for the image
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    margin: 10,
    resizeMode: 'stretch',
  },
})

export default MovieCard
