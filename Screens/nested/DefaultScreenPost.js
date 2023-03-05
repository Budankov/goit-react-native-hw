import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Button } from "react-native";
import { db } from "../../firebase/config";

const DefaultScreenPost = ({ route, navigation }) => {
  const [post, setPost] = useState([]);

  const getAllPost = async () => {
    try {
      // const snapshot = await db.collection("post").get();
      // const postList = snapshot.docs.map((doc) => ({
      //   ...doc.data(),
      //   id: doc.id,
      // }));
      // setPost(postList);
      onSnapshot(collection(db, "posts"), (doc) => {
        const posts = doc.docs.map((el) => ({ ...el.data() }));
        setPost(posts);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={post}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.photo }} style={styles.image} />
          </View>
        )}
      />
      <Button
        title="MapScreen"
        onPress={() => navigation.navigate("MapScreen")}
      />
      <Button
        title="CommentsScreen"
        onPress={() => navigation.navigate("CommentsScreen")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    marginHorizontal: 10,
    height: 200,
  },
});

export default DefaultScreenPost;
