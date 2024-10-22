import * as React from 'react'
import { useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Entypo from 'react-native-vector-icons/Entypo'
import TrendingMovies from '../components/trendingMovies'

const HomeScreen = ({ navigation }) => {
  const [trending, setTrending] = useState([1,2,3])
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Entypo name="menu" size={30} color={'white'} paddingLeft={20} />
          <Text style={{ color: 'white', fontSize: 30 }}> Movies </Text>
          <Entypo
            name="magnifying-glass"
            size={30}
            color={'white'}
            paddingRight={20}
          />
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <TrendingMovies/>
      </ScrollView>
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

export default HomeScreen
