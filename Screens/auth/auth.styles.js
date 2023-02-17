import { StyleSheet } from "react-native";

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
  formWrapper: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  form: {
    // marginHorizontal: 16,
  },
  avatarWrapper: {
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    top: -50,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  title: {
    fontFamily: "Roboto-Regular",
    fontWeight: "500",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 33,
    marginTop: 92,
  },
  input: {
    borderWidth: 1,
    color: "#212121",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    backgroundColor: "#F6F6F6",
    placeholderTextColor: "#BDBDBD",
    padding: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
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
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 33,
  },
  submitBtnText: {
    color: "#FFF",
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  singInText: {
    color: "#1B4371",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
  },
});

export default styles;
