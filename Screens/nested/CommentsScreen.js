import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

// Icons
import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { postID } = route.params;
  const { nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = async () => {
    const commentsRef = collection(db, `posts/${postID}/comments`);
    await addDoc(commentsRef, { comment, nickname });

    setComment("");
  };

  const getAllComments = async () => {
    const commentsQuery = query(
      collection(db, `posts/${postID}/comments`)
      // orderBy("date")
    );
    onSnapshot(commentsQuery, (data) =>
      setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  return (
    <View style={styles.bcgContainer}>
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList
            data={allComments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.nickname}</Text>
                <Text>{item.comment}</Text>
              </View>
            )}
          />
        </SafeAreaView>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            value={comment}
            onChangeText={setComment}
          ></TextInput>
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
