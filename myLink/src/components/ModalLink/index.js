import React from 'react'
import { Alert, TouchableOpacity, TouchableWithoutFeedback,View,Share } from 'react-native'
import Clipboard from 'expo-clipboard'
import {Feather,Entypo} from '@expo/vector-icons'

import {ModalContainer,Container,Header, LinkArea,Title,LongUrl,ShortLinkUrl,ShortLinkArea} from './styles'

export default function ModalLink({onClose,data}) {

  function copyLink() {
    Clipboard.setString(data.link);
    Alert.alert('Sucesso','Link copiado com sucesso')
  }

 async function handleShare() {
    try {
        const result = await Share.share({
          message: `Link: ${data.link}`
        });

        if(result.action === Share.sharedAction) {
          if(result.activityType) {
            console.log('ActivyType')
          }else {
            console.log('Compartilhou')
        }
      } else if(result.action === Share.dismissedAction){
            console.log('Modal fechado')
          }
        
    }catch(error) {
      console.log(error.message)
    }
  }

  return (
    <ModalContainer>
      <TouchableWithoutFeedback onPress={onClose}>
      <View style={{flex:1}}></View>

      </TouchableWithoutFeedback>
   <Container>
    <Header>
    <TouchableOpacity>
      <Feather 
      onPress={onClose}
      name="x"
      color="#212743"
      size={30}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={handleShare}>
      <Entypo 
      name="share"
      color="#212743"
      size={30}
      />
    </TouchableOpacity>
    </Header>

    <LinkArea>
    <Title>Link encurtado</Title>
    <LongUrl numberOfLines={1}>{data.long_url}</LongUrl>

    <ShortLinkArea 
    activeOpacity={1}
    onPress={copyLink}
    >
      <ShortLinkUrl numberOfLines={1}>{data.link}</ShortLinkUrl>
      <TouchableOpacity onPress={copyLink}>
        <Feather 
        name="copy"
        color="#fff"
        size={25}
        />
      </TouchableOpacity>
    </ShortLinkArea>
    
    </LinkArea>
   
   </Container>
    </ModalContainer>
  )
}
