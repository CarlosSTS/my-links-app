import React,{useState} from 'react'
import {ActivityIndicator,View} from 'react-native'
import {useRoute} from '@react-navigation/native'
import { WebView } from 'react-native-webview';

// import { Container } from './styles';

const OpenLinkBrowser = () => {
  const link = useRoute().params;
  const [visible,setVisible] = useState(true)

  return(
    <View  style={{ flex: 1 }}>
    <WebView
  onLoad={() => setVisible(false)}
  style={{ flex : 1}}
  source={{uri: link}}
  />
      {visible && (
        <ActivityIndicator
          style={{
            position: 'absolute', 
            alignSelf: 'center',
            marginTop: '50%'
          }}
          color='#000'
          size="large"
        />
      )}

 </View>
  )
}

export default OpenLinkBrowser;