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

  const handleSearch = (value) => {
    if(value && value.length>2){
      setLoading(true)
      searchMovies({
        query: value,
        include_adult: false,
        language: 'en-US',
        page: '1',
      }).then((data) => {
        setLoading(false)
        console.log('got movies', data)
        if (data && data.results) setResults(data.results)
      })
    } else{
      setLoading(false)
      setResults([])
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])
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
                    {
                      item?.title.length>22? item?.title.slice(0,22)+'...':item?.title
                    }
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })}
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
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default SearchScreen
