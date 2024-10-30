import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native'
import React, { useState } from 'react'
import { Avatar, Button, Card } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

const defaultProfilePhoto = require('../assets/default_profile.jpg')

const ReviewList = ({ data, title, id }) => {
  const navigation = useNavigation()
  const handlePress = (item) => {
    console.log('pressed', item)
    navigation.push('Review', { item, title })
  }

  return (
    <View>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ marginLeft: 20, fontSize: 20, color: 'white' }}>
          Reviews
        </Text>
        <TouchableOpacity onPress={() => navigation.push('SeeAllReviews', {id, title})}>
          <Text style={{ marginRight: 20, fontSize: 20, color: 'orange' }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      {data && data.length === 0 ? (
        <Text style={{ margin: 20, color: 'white', textAlign:'center', fontSize: 18 }}>
          No reviews for this movie currently
        </Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}
        >
          {data.map((item, index) => {
            {
              /* console.log('rating: ', item.author_details.rating) */
            }
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
                  width: 300,
                  marginRight: 20,
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
                    numberOfLines={10}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: 15,
                      textAlign: 'justify',
                      color: 'white',
                    }}
                  >
                    {item.content}
                  </Text>
                </Card.Content>
              </Card>
            )
          })}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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

export default ReviewList
