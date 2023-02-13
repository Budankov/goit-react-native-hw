import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

import { useState } from "react";

const RegistrationScreen = () => {
  const [hidePass, setHidePass] = useState(true);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bcgImage}
        source={require("../../assets/images/auth/auth-bcg-image.jpg")}
      >
        <View style={styles.form}>
          <Image
            style={styles.avatar}
            source={require("../../assets/images/auth/avatar.jpg")}
          ></Image>
          <Text style={styles.title}>Реєстрація</Text>
          <TextInput style={styles.input} placeholder="Логін" />
          <TextInput
            style={styles.input}
            placeholder="Адреса електронної пошти"
          />
          <TextInput
            style={styles.input}
            secureTextEntry={hidePass}
            placeholder="Пароль"
          >
            <Icon
              style={styles.inputShowPasword}
              name={hidePass ? "eye-slash" : "eye"}
              onPress={() => setHidePass(!hidePass)}
            />
          </TextInput>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bcgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  form: {
    backgroundColor: "#FFF",
    height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    position: "absolute",
    width: 120,
    height: 120,
    top: -50,
    marginHorizontal: 128,
    borderRadius: 16,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 33,
    fontWeight: "bold",
    marginTop: 92,
  },
  input: {
    marginHorizontal: 16,
    borderWidth: 1,
    color: "#212121",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    backgroundColor: "#F6F6F6",
    placeholderTextColor: "#BDBDBD",
    padding: 16,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 16,
  },
  inputShowPasword: {
    fontSize: 16,
    right: 5,
  },
});

export default RegistrationScreen;
