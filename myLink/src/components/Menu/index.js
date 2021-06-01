import React from 'react'
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

import {ButtonMenu} from './styles';

export default function Menu() {
  const navigation = useNavigation()
  return (
      <ButtonMenu>
          <Feather  name="menu" size={40} color="#fff" onPress={() => navigation.openDrawer()}/>
      </ButtonMenu>
  )
}
