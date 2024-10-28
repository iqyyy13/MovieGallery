import { View, Text } from 'react-native'
import React from 'react'
import YoutubePlayer from 'react-native-youtube-iframe'

const VideoScreen = () => {
  return(
    <View>
      <YoutubePlayer
        height={300}
        play={true}
        videoId={'CbX_SIz_9fk'}
      />
    </View>
  )
}

export default VideoScreen