import React,{  useState} from 'react'
import {Keyboard,Platform, TouchableWithoutFeedback, KeyboardAvoidingView,Modal} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'

import Image from '../../assets/Logo.png'

import StatusBarPage from '../../components/StatusBarPage'
import Menu from '../../components/Menu';
import ModalLink from '../../components/ModalLink'

import { ContainerLogo, Logo, ContainerContent, Title, SubTitle, ContainerInput, BoxIcon, Input, ButtonLink, ButtonLinkText } from './styles';

export default function Home() {
  const [input,setInput] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

function handleShortLink() {
  setModalVisible(true)
}

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <LinearGradient
      colors={['#1ddbb9', "#132742"]}
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <StatusBarPage
        barStyle='light-content'
        backgroundColor="#1ddbb9"
      />

      <Menu />

<KeyboardAvoidingView
behavior={Platform.OS ==='android' ? 'padding' : 'position'}
enabled
>

      <ContainerLogo>
        <Logo source={Image} />
      </ContainerLogo>

      <ContainerContent>
        <Title>SujeitoLink</Title>
        <SubTitle>Copie e cole seu link para encurtar</SubTitle>
     

      <ContainerInput>
        <BoxIcon>
          <Feather name='link' size={22} color="#FFF" />
        </BoxIcon>
        <Input
          placeholder="Cole seu link aqui..."
          placeholderTextColor="#fff"
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType="url"
          returnKeyType='send'
          value={input}
          onChangeText={setInput}
        />
      </ContainerInput>

      <ButtonLink onPress={ handleShortLink}>
        <ButtonLinkText>
          Gerar Link
        </ButtonLinkText>
      </ButtonLink>
      </ContainerContent>

      </KeyboardAvoidingView>
    
<Modal visible={modalVisible} transparent animationType="slide">
<ModalLink onClose={() => setModalVisible(false)} />
</Modal>

    </LinearGradient>
    </TouchableWithoutFeedback>
  )
}
