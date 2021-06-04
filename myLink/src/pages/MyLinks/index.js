import React,{useState,useEffect} from 'react'
import {Modal, ActivityIndicator} from 'react-native'
import {useIsFocused} from '@react-navigation/native'

import StatusBarPage from '../../components/StatusBarPage'
import Menu from '../../components/Menu';
import ListItem from '../../components/ListItem';
import ModalLink from '../../components/ModalLink'

import {getLinksSave, deleteLink} from '../../utils/storeLinks';

import {Container,Title,ListLinks,ContainerEmpty,EmptyText} from './styles';

export default function MyLinks() {
  const isFocused = useIsFocused(); //foco na tela 

  const [links, setLinks] = useState([])
  const [data,setData] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [loading,setLoading] = useState(true)

  useEffect(() => { 

    async function getLinks() {
      const result = await getLinksSave('sujeitolinks')
      setLinks(result)
      setLoading(false)
    }

      getLinks()
  },[isFocused]); //executar sempre a tela estiver em foco

function handleItem(item) {
  setData(item);
  setModalVisible(true)
}


async function handleDelete(id){
 const result = await deleteLink(links, id);
 setLinks(result)
}

  return (
    <Container>
      <StatusBarPage 
        barStyle='light-content'
        backgroundColor="#132742"
      />
      
      <Menu />

      <Title>Meus Links</Title>

      {loading && (
              <ContainerEmpty>
              <ActivityIndicator color="#fff" size={25}/>
            </ContainerEmpty>
      )}

      {!loading && links.length === 0 && (
        <ContainerEmpty>
          <EmptyText>Vocẽ ainda não cadastrou nenhum link</EmptyText>
        </ContainerEmpty>
      )}

      <ListLinks 
      data={links}
      keyExtractor={(item) => String(item.id)}
      renderItem={({item}) =>  <ListItem data={item}
      selectedItem={handleItem}
      deleteItem={handleDelete}
      />}
      contentContainerStyle={{paddingBottom: 20}}
      showsVerticalScrollIndicator={false}
      />

<Modal visible={modalVisible} transparent animationType="slide">
<ModalLink onClose={() => setModalVisible(false)} data={data}/>
</Modal>

    </Container>
  )
}
