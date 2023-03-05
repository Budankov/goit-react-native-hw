import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";

// Icons
import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");

  const { postId } = route.params;
  const { nickname } = useSelector((state) => state.auth);

  const createComment = async () => {
    console.log("db", db); // додати console.log()
    console.log("postId", postId); // додати console.log()
    console.log("comment", comment); // додати console.log()
    console.log("nickname", nickname); // додати console.log()
    await db
      .collection("post")
      .doc(postId)
      .collection("comments")
      .add({ comment, nickname });
    setComment(""); // очистка поля вводу після додавання коментаря
  };

  return (
    <View style={styles.bcgContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Коментувати..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          activeOpacity={0.8}
          onPress={createComment}
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
