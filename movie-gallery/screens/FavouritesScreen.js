import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import MovieCard from '../components/movieCard'
import { image342 } from '../api/moviedb'
import DropDownPicker from 'react-native-dropdown-picker'

const FavouritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([])
  const [watching, setWatching] = useState([])
  const [completed, setCompleted] = useState([])
  const [planToWatch, setPlanToWatch] = useState([])
  const [onHold, setOnHold] = useState([])
  const [dropped, setDropped] = useState([])
  const [notInterested, setNotInterested] = useState([])
  const [activeTab, setActiveTab] = useState('FAVORITES')

  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModalVisble, setDeleteModalVisible] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedMovieImage, setSelectedMovieImage] = useState(null)
  const [selectedMovieYear, setSelectedMovieYear] = useState(null)
  const [selectedMovieRating, setSelectedMovieRating] = useState(null)

  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(false)
  const [items, setItems] = useState([
    { label: 'Watching', value: 'watching' },
    { label: 'Completed', value: 'completed' },
    { label: 'Plan to Watch', value: 'plan to watch' },
    { label: 'On Hold', value: 'on hold' },
    { label: 'Dropped', value: 'dropped' },
    { label: 'Not Interested', value: 'not interested' },
  ])

  const tabData = {
    FAVORITES: favorites,
    WATCHING: watching,
    COMPLETED: completed,
    'PLAN TO WATCH': planToWatch,
    'ON HOLD': onHold,
    DROPPED: dropped,
    'NOT INTERESTED': notInterested,
  }

  const handleEdit = (movie) => {
    setSelectedMovie(movie.title)
    setSelectedMovieImage(movie.poster_path)
    setSelectedMovieYear(movie.release_date)
    setSelectedMovieRating(movie.vote_average)
    setModalVisible(true)
  }

  const renderContent = () => {
    const items = tabData[activeTab] || []
    return items.length > 0 ? (
      items.map((id) => <MovieCard key={id} id={id} onEdit={handleEdit} />)
    ) : (
      <Text style={{ color: 'white', textAlign: 'center' }}>
        No items have been added yet.
      </Text>
    )
  }

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

  useFocusEffect(
    React.useCallback(() => {
      fetchFavorites()
    }, [])
  )

  const clearAll = async () => {
    try {
      console.log('CLEARRR')
      await AsyncStorage.clear()
    } catch (e) {
      console.log('Error Type: ', e)
    }
    fetchFavorites()
  }

  // console.log('favorites are: ', favorites)
  // console.log('selected movie is ', selectedMovie)
  // console.log('image: ', selectedMovieImage)
  const tabs = Object.keys(tabData)

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Modal
          transparent={true}
          visible={deleteModalVisble}
          animationType="fade"
          onRequestClose={() => setDeleteModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.deleteModalContainer}>
              <View style={{ alignItems: 'center' }}>
                <View
                  style={{
                    padding: 5,
                    backgroundColor: 'rgb(253 164 175)',
                    borderRadius: 4,
                  }}
                >
                  <MaterialIcons
                    name="delete"
                    size={28}
                    color={'rgb(255 0 0)'}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <Text style={{lineHeight: 20}}>Are you sure you want to delete {selectedMovie} from your list? </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity style={{width: '25%', padding: 5, borderWidth: 2}}>
                    <Text style={{textAlign: 'center'}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{width: '25%', padding: 5, backgroundColor: 'red', borderRadius: 10}}>
                    <Text style={{textAlign: 'center'}}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <>
                <View>
                  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Image
                      source={{ uri: image342(selectedMovieImage) }}
                      style={{
                        height: 150,
                        width: 110,
                        borderRadius: 10,
                        resizeMode: 'cover',
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          marginLeft: 20,
                          fontSize: 16,
                          fontWeight: 800,
                          letterSpacing: 1,
                          color: 'white',
                        }}
                      >
                        {selectedMovie}
                      </Text>
                      <Text
                        style={{
                          marginLeft: 20,
                          marginTop: 5,
                          letterSpacing: 1,
                          color: 'rgb(212 212 212)',
                        }}
                      >
                        Movie • {selectedMovieYear}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 10,
                          alignItems: 'center',
                        }}
                      >
                        <FontAwesome
                          name="star"
                          color={'gold'}
                          style={{ marginLeft: 20 }}
                        />
                        <Text
                          style={{
                            marginLeft: 7,
                            color: 'white',
                            fontWeight: 700,
                          }}
                        >
                          {selectedMovieRating}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{ position: 'absolute', right: 0 }}
                      onPress={() => setModalVisible(false)}
                    >
                      <Entypo name="cross" size={20} color={'white'} />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        marginBottom: 5,
                        fontWeight: 700,
                      }}
                    >
                      Status
                    </Text>
                    <DropDownPicker
                      open={open}
                      value={status}
                      items={items}
                      setOpen={setOpen}
                      setValue={setStatus}
                      setItems={setItems}
                      placeholder={'Select a status'}
                      maxHeight={250}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      padding: 5,
                      backgroundColor: 'rgb(180 180 180)',
                      borderRadius: 10,
                    }}
                    onPress={() => setDeleteModalVisible(true)}
                  >
                    <MaterialIcons name="delete" size={28} color={'white'} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View
                      style={{
                        padding: 10,
                        paddingHorizontal: '30%',
                        backgroundColor: 'rgb(20 184 166)',
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          fontWeight: 600,
                        }}
                      >
                        Save Changes
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Entypo name="menu" size={30} color={'white'} paddingLeft={20} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 28 }}> My List </Text>
          <TouchableOpacity onPress={() => clearAll()}>
            <MaterialIcons
              name="delete"
              size={28}
              color={'white'}
              paddingRight={20}
            />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: '#202020',
            paddingTop: 20,
            paddingBottom: 90,
          }}
        >
          {renderContent()}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383838',
  },
  tabContainer: {
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderColor: 'rgb(212 212 212)',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tabText: {
    padding: 10,
    color: 'rgb(212, 212, 212)', // Inactive color
  },
  activeTabText: {
    color: 'rgb(34, 211, 238)', // Active color (change as needed)
    fontWeight: 'bold', // Optional: bold for emphasis
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '95%', // Adjust width as needed
    backgroundColor: 'rgb(122 122 122)',
    borderRadius: 8,
    padding: 16,
    height: '68%',
    justifyContent: 'space-between',
    right: 0,
  },
  deleteModalContainer: {
    width: '80%', // Adjust width as needed
    backgroundColor: 'rgb(122 122 122)',
    borderRadius: 8,
    padding: 16,
    height: '20%',
    justifyContent: 'space-between',
    right: 0,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
  },
})

export default FavouritesScreen
