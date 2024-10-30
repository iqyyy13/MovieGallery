import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useRoute, useNavigation } from '@react-navigation/native'
// import moment from 'moment'

const defaultProfilePhoto = require('../assets/default_profile.jpg')

const ReviewScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { item, title } = route.params
  const displayTitle = title + ' Review'
  const avatarUri = item.author_details.avatar_path
    ? {
        uri: `https://image.tmdb.org/t/p/w150_and_h150_face/${item.author_details.avatar_path}`,
      }
    : defaultProfilePhoto

  const normalizedRating = (item.author_details.rating / 10) * 5
  const fullStars = Math.floor(normalizedRating)
  const hasHalfStar = normalizedRating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={24} color={'white'} />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            flexDirection: 'row',
            marginLeft: 20,
          }}
        >
          {displayTitle.length > 30
            ? displayTitle.slice(0, 30) + '...'
            : displayTitle}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#202020' }}
      >
        <View style={styles.profileContainer}>
          <Image style={styles.coverImage} source={avatarUri} />
          <Text style={{ color: 'white', fontSize: 18 }}>{item.author}</Text>
        </View>
        <View style={styles.starContainer}>
          <Text style={{ color: 'white', fontSize: 20 }}> Overall</Text>
          <View style={{ flexDirection: 'row', paddingLeft: 180 }}>
            {Array(fullStars)
              .fill()
              .map((_, index) => (
                <FontAwesome
                  key={`full-${index}`}
                  name="star"
                  size={20}
                  color={'gold'}
                />
              ))}
            {hasHalfStar && (
              <FontAwesome name="star-half-o" size={20} color={'gold'} />
            )}
            {Array(emptyStars)
              .fill()
              .map((_, index) => (
                <FontAwesome
                  key={`empty-${index}`}
                  name="star-o"
                  size={20}
                  color="gold"
                />
              ))}
            <Text style={{ color: 'white', fontSize: 20, marginLeft: 5 }}>
              {' '}
              {item.author_details.rating}{' '}
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'justify',
              letterSpacing: 1,
              lineHeight: 25,
            }}
          >
            {item.content}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383838',
  },
  profileContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  starContainer: {
    marginLeft: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'rgb(161 161 170)',
    borderRadius: 9999,
    padding: 5,
    marginRight: 20,
    flexDirection: 'row',
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E0BC00',
    marginLeft: 20,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
})

export default ReviewScreen
