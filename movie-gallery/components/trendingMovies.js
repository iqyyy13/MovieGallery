import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import CarouselComponent from './CarouselComponent.js'

const TrendingMovies = ({data}) => {
  return (
    <View style = {styles.container}>
      <Text style = {{color: 'white', marginBottom: 20, marginLeft: 20, fontSize: 20}}>Trending</Text>
      <ScrollView
        showVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}
      >
        <CarouselComponent data={data} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop: 20,
  }
})
export default TrendingMovies
