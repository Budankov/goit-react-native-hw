import AppLoading from "expo-app-loading";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Font from "expo-font";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { useState } from "react";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const loadFont = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
  });
};

const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [asReady, setAsReady] = useState(false);

  console.log(state);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  if (!asReady) {
    return (
      <AppLoading
        startAsync={loadFont}
        onFinish={() => setAsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bcgImage}
          source={require("../../assets/images/auth/auth-bcg-image.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.formWrapper}>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? -95 : 85,
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require("../../assets/images/auth/avatar.jpg")}
                ></Image>
                <Text style={styles.title}>Реєстрація</Text>
                <TextInput
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  onSubmitEditing={keyboardHide}
                  value={state.login}
                  keyboardType={"default"}
                  placeholder="Логін"
                />
                <TextInput
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  onSubmitEditing={keyboardHide}
                  value={state.email}
                  keyboardType={"email-address"}
                  placeholder="Адреса електронної пошти"
                />
                <View>
                  <TextInput
                    style={styles.input}
                    onFocus={() => setIsShowKeyboard(true)}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    onSubmitEditing={keyboardHide}
                    value={state.password}
                    keyboardType={"default"}
                    secureTextEntry={hidePass}
                    textContentType="password"
                    autoCorrect={false}
                    maxLength={20}
                    placeholder="Пароль"
                  ></TextInput>
                  <Icon
                    style={styles.inputShowPasword}
                    name={hidePass ? "eye-slash" : "eye"}
                    onPress={() => setHidePass(!hidePass)}
                  />
                </View>
                <TouchableOpacity
                  style={styles.submitBtn}
                  activeOpacity={0.8}
                  onPress={keyboardHide}
                >
                  <Text style={styles.submitBtnText}>Зареєструватись</Text>
                </TouchableOpacity>
                <Text style={styles.singInText}>
                  Вже є обліковий запис? Увійти
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
    // justifyContent: "center",
  },
  formWrapper: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    // paddingTop: 80,
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
    fontFamily: "Roboto-Regular",
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
    right: 26,
    top: 16,
  },
  submitBtn: {
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 33,
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
