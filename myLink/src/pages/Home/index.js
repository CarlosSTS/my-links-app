import React, { useState } from "react";
import {
  Keyboard,
  Platform,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Modal,
  BackHandler,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

import Image from "../../assets/Logo.png";

import StatusBarPage from "../../components/StatusBarPage";
import Menu from "../../components/Menu";
import ModalLink from "../../components/ModalLink";

import api from "../../services/api";

import {
  ContainerLogo,
  Logo,
  ContainerContent,
  Title,
  SubTitle,
  ContainerInput,
  BoxIcon,
  Input,
  ButtonLink,
  ButtonLinkText,
} from "./styles";
import { saveLink } from "../../utils/storeLinks";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modaIslVisible, setModaIslVisible] = useState(true);

  const [data, setData] = useState({});

  async function authenticate() {
    const hasPassword = await LocalAuthentication.isEnrolledAsync();
    if (!hasPassword) {
      return;
    }
    const { success, error } = await LocalAuthentication.authenticateAsync();

    if (success) {
      Alert.alert("Sucesso", "Autenticação realizada com sucesso");
      setModaIslVisible(false);
    } else {
      Alert.alert(
        "Erro na autentcação 😔",
        "Feche e abra seu aplicativo para tentar novamente",
        [{ text: "OK", onPress: () => BackHandler.exitApp() }]
      );
    }
  }

  Platform.OS == "ios" && authenticate();

  async function handleShortLink() {
    setLoading(true);
    try {
      const response = await api.post("/shorten", {
        long_url: input,
      });
      setData(response.data);
      setModalVisible(true);
      //SUCESSI , PRECISAR SALVAR LINK
      saveLink("sujeitolinks", response.data);
    } catch {
      Alert.alert("Oops", "Algo deu errado");
    } finally {
      Keyboard.dismiss();
      setInput("");
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient
        colors={["#1ddbb9", "#132742"]}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <StatusBarPage barStyle="light-content" backgroundColor="#1ddbb9" />

        <Menu />

        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "position"}
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
                <Feather name="link" size={22} color="#FFF" />
              </BoxIcon>
              <Input
                placeholder="Cole seu link aqui..."
                placeholderTextColor="#fff"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                returnKeyType="send"
                value={input}
                onChangeText={setInput}
              />
            </ContainerInput>

            <ButtonLink onPress={handleShortLink}>
              {loading ? (
                <ActivityIndicator color="#121212" size="large" />
              ) : (
                <ButtonLinkText>Gerar Link</ButtonLinkText>
              )}
            </ButtonLink>
          </ContainerContent>
        </KeyboardAvoidingView>

        <Modal visible={modalVisible} transparent animationType="slide">
          <ModalLink onClose={() => setModalVisible(false)} data={data} />
        </Modal>

        {/* {Platform.OS !== "android" && (
          <Modal
            visible={modaIslVisible}
            transparent
            animationType="slide"
            onShow={authenticate}
          ></Modal>
        )} */}
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
