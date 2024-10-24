import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel'

const { width, height } = Dimensions.get('window')

const MovieList = ({ title, data }) => {
  let movieName = 'Venom'
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={{ marginLeft: 20, fontSize: 20, color: 'white' }}>
          {title}
        </Text>
        <TouchableOpacity>
          <Text style={{ marginRight: 20, fontSize: 20, color: 'orange' }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate('Movie', item)}
            >
              <View style={{marginTop: 20}}>
                <Image
                  source={require('../assets/image.png')}
                  style={{width: width*0.33, height: height*0.22, borderRadius: 20, marginLeft: 10}}
                />
                <Text style={{color: 'white', textAlign: 'center',}}>
                  {
                    movieName.length>14? movieName.slice(0,14)+'...':movieName
                  }
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
export default MovieList
