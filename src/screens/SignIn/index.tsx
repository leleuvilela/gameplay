import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, Image, Alert } from "react-native";

import { ButtonIcon } from "../../components/ButtonIcon";
import IllustrationImg from "../../assets/illustration.png";
import { Background } from "../../components/Background";
import { styles } from "./styles";
import { useAuth } from "../../hooks/auth";
import { ActivityIndicator } from "react-native";
import { theme } from "../../global/styles/theme";

export function SignIn() {
  const { loading, signIn } = useAuth();

  function handleSignIn() {
    try {
      signIn();
    } catch (e) {
      Alert.alert(e);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se{"\n"}e organize suas{"\n"}
            jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games{"\n"}
            favoritos com seus amigos
          </Text>
          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <ButtonIcon title="Entrar com Discord" onPress={handleSignIn} />
          )}
        </View>
      </View>
    </Background>
  );
}
