import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { image185 } from '../api/moviedb'
import { useNavigation } from '@react-navigation/native'

const Cast = ({ cast }) => {
  const navigation = useNavigation()

  return (
    <View>
      <Text style={{ marginTop: 10, marginLeft: 20, fontSize: 18, color: 'white' }}>
        Top Cast
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
          cast && cast.map(( person, index ) => {
            return(
              <TouchableOpacity
                key={index}
                style={{alignItems:'center', marginRight: 16}}
                onPress={() => navigation.push('Person', person)}
              >
                <View style={{overflow:'hidden', borderRadius: 9999, height: 80, width: 80, alignItems:'center', borderWidth: 1, borderColor: 'rgb(115,115,115)', marginTop: 10}}>
                  <Image
                    // source={require('../assets/image.png')}
                    source={{uri: image185(person?.profile_path)}}
                    style={{height: 90, width: 90, borderRadius: 20,}}
                  />
                </View>
                <Text style = {{color:'white', marginTop: 4, fontSize: 12}}>
                  {
                    person?.character.length>10? person?.character.slice(0,10)+'...': person?.character
                  }
                </Text>
                <Text style = {{color:'white', marginTop: 2, fontSize: 12}}>
                  {
                    person?.original_name.length>10? person?.original_name.slice(0,10)+'...': person?.original_name
                  }
                </Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default Cast
