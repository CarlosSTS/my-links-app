import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";

//buscar links salvos
export async function getLinksSave(key)  {
    const myLinks = await AsyncStorage.getItem(key)
    let linkSaves = JSON.parse(myLinks) || [];

    return  linkSaves
}
// Salvar um link
export async function saveLink(key, newLink) {
    let linksStored = await getLinksSave(key);

    const hasLink = linksStored.some(link => link.id === newLink.id)

    if(hasLink) {
      Alert.alert('Aviso','Esse link já existe na lista');
        return;
    }

    linksStored.push(newLink);
    await AsyncStorage.setItem(key,JSON.stringify(linksStored))
   Alert.alert('Sucesso', 'Link salvo com sucesso')
}
//Delete
export async function deleteLink(links,id) {
    let myLinks = links.filter( (item) => {
    return (item.id !== id)
  })

  await AsyncStorage.setItem('sujeitolinks', JSON.stringify(myLinks));
  
  Alert.alert('Sucesso','Link deletado')
  return myLinks;
}