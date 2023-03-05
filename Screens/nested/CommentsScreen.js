import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

// Icons
import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = () => {
  const [comment, setComment] = useState("");

  const createPost = () => {};

  return (
    <View style={styles.bcgContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Коментувати..."
          onChangeText={setComment}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          activeOpacity={0.8}
          onPress={createPost}
        >
          <AntDesign
            style={styles.submitBtnIcon}
            name="arrowup"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bcgContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#FFF",
  },
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 50,
    padding: 16,
    position: "relative",
  },
  submitBtn: {
    position: "absolute",
    right: 5,
    top: 5,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
  submitBtnIcon: {
    padding: 8,
    color: "#FFF",
  },
});

export default CommentsScreen;
