import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'

const { width, height } = Dimensions.get('window')

const Loading = () => {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail thickness={12} size={160} color={'yellow'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Loading