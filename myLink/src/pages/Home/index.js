import React,{  useState} from 'react'
import {Keyboard,Platform,Alert,ActivityIndicator, TouchableWithoutFeedback, KeyboardAvoidingView,Modal} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'

import Image from '../../assets/Logo.png'

import StatusBarPage from '../../components/StatusBarPage'
import Menu from '../../components/Menu';
import ModalLink from '../../components/ModalLink'

import api from '../../services/api';

import { ContainerLogo, Logo, ContainerContent, Title, SubTitle, ContainerInput, BoxIcon, Input, ButtonLink, ButtonLinkText } from './styles';

export default function Home() {
    const [loading,setLoading] = useState(false)
    const [input,setInput] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [data, setData] = useState({})

    async function handleShortLink() {
        setLoading(true)
        try {
         const response = await api.post('/shorten',{
            long_url: input
         })
            setData(response.data)
            setModalVisible(true)
         } catch {
             Alert.alert('Oops', 'Algo deu errado')

         } finally {
        Keyboard.dismiss();
         setInput('')
        setLoading(false)
        }
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

      <ButtonLink onPress={handleShortLink}>
          {loading ? <ActivityIndicator color="#121212" size='large'/> :
              <ButtonLinkText>
                  Gerar Link
              </ButtonLinkText>
          }
      </ButtonLink>
      </ContainerContent>

      </KeyboardAvoidingView>
    
<Modal visible={modalVisible} transparent animationType="slide">
<ModalLink onClose={() => setModalVisible(false)} data={data}/>
</Modal>

    </LinearGradient>
    </TouchableWithoutFeedback>
  )
}
