import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'

const MovieList = () => {
    return (
        <View style = {styles.container}>
          <View style = {styles.row}>
            <Text style = {{marginLeft: 20, fontSize: 20, color: 'white'}}>Upcoming</Text>
            <TouchableOpacity>
              <Text style = {{marginRight: 20, fontSize: 20, color: 'orange'}}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            
          </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container:{
    marginTop: 20,
    flex:1,
  },
  row: {
    flexDirection:'row',
    justifyContent: 'space-between',
  }
})
export default MovieList