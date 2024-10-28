import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from 'react-native-vector-icons/Entypo'

const FavouritesScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Entypo name="menu" size={30} color={'white'} paddingLeft={20} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 30 }}> Favourites </Text>
          <Entypo
            name="magnifying-glass"
            size={30}
            color={'white'}
            paddingRight={20}
          />
        </View>
      </SafeAreaView>
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

export default FavouritesScreen
