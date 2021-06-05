import React from 'react'
import {useNavigation} from '@react-navigation/native'
import { View } from 'react-native'
import {Feather,MaterialIcons} from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import {ContainerButton,Item,ActionContainer} from './styles';

export default function ListItem({data, selectedItem,deleteItem  }) {

  const navigation = useNavigation()

  function navigateOpenLinkBrowser(link) {
    navigation.navigate('OpenLinkBrowser', link)
  }

  function RightActions() {
    return(
      <>
      <ActionContainer onPress={() => navigateOpenLinkBrowser(data.link)}>
        <MaterialIcons 
          name='open-in-browser'
          color='#fff'
          size={32}
          />
      </ActionContainer>
      <ActionContainer onPress={() => deleteItem(data.id)}>
        <Feather 
          name='trash-2'
          color='#fff'
          size={24}
          />
      </ActionContainer>
      </>
    )
  }
  
  return (
    <View>
        <Swipeable renderRightActions={RightActions}>
        <ContainerButton activeOpacity={0.9} onPress={() => selectedItem(data)}>
            <Feather
                name='link'
                color='#fff'
                size={24}
            />
            <Item numberOfLines={1}>{data.long_url}</Item>
        </ContainerButton>
        </Swipeable>
    </View>
  )
}
