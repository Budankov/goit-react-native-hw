import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
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
        <KeyboardAvoidingView>
          <View style={styles.form}>
            <Image
              style={styles.avatar}
              source={require("../../assets/images/auth/avatar.jpg")}
            ></Image>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              style={styles.input}
              keyboardType={"default"}
              placeholder="Логін"
            />
            <TextInput
              style={styles.input}
              keyboardType={"email-address"}
              placeholder="Адреса електронної пошти"
            />
            <TextInput
              style={styles.input}
              keyboardType={"default"}
              secureTextEntry={hidePass}
              textContentType="password"
              autoCorrect={false}
              placeholder="Пароль"
            >
              {" "}
            </TextInput>
            <Icon
              style={styles.inputShowPasword}
              name={hidePass ? "eye-slash" : "eye"}
              onPress={() => setHidePass(!hidePass)}
            />
            <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8}>
              <Text style={styles.submitBtnText}>Зареєструватись</Text>
            </TouchableOpacity>
            <Text style={styles.singInText}>Вже є обліковий запис? Увійти</Text>
          </View>
        </KeyboardAvoidingView>
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
    justifyContent: "center",
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
    marginBottom: 16,
    position: "relative",
  },
  inputShowPasword: {
    position: "absolute",
    fontSize: 16,
    right: 20,
  },
  submitBtn: {
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  submitBtnText: {
    color: "#FFF",
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  singInText: {
    color: "#1B4371",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 16,
  },
});

export default RegistrationScreen;
