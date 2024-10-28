import { View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import YoutubePlayer from 'react-native-youtube-iframe'

const VideoScreen = () => {
  const { params: item } = useRoute()
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
