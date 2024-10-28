import { View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import YoutubePlayer from 'react-native-youtube-iframe'
import Orientation from 'react-native-orientation-locker'

const VideoScreen = () => {
  const { params: item } = useRoute()
  // const { width, height } = Dimensions.get('window')
  // const height = width * (9 / 16)

  console.log("trailer key: ", item)
  return (
    <View style={{ flex: 1, backgroundColor: '#383838', alignItems: 'center' }}>
      <YoutubePlayer
        height={750}
        width={750}
        play={true}
        videoId={item}
      />
    </View>
  )
}

export default VideoScreen
