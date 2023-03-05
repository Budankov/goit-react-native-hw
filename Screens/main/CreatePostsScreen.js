import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { storage } from "../../firebase/config";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(CameraType.back);
  const [photo, setPhoto] = useState("");
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);

  const { userId, nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("У доступі до місцезнаходження відмовлено");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const takePhoto = async () => {
    console.log(location);
    console.log(comment);
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
  };

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreenPost");
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    try {
      const db = getFirestore();
      const newCollectionRef = collection(db, "post");
      await addDoc(newCollectionRef, {
        photo,
        comment,
        location,
        userId,
        nickname,
      });
      console.log(`Колекція створена успішно!`);
    } catch (error) {
      console.error("Помилка при створенні колекції:", error);
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();

      const data = ref(storage, `postImage/${uniquePostId}`);
      await uploadBytes(data, file);

      const processedPhoto = await getDownloadURL(data);
      return processedPhoto;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`);
    }
  };

  return (
    <View style={styles.containerBcg}>
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          ref={setCamera}
          onCameraReady={handleCameraReady}
        >
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                style={styles.takePhotoImage}
                source={{ uri: photo }}
              ></Image>
            </View>
          )}
          <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
            <Text style={styles.snap}>SNAP</Text>
          </TouchableOpacity>
        </Camera>
        <View style={styles.formWrapper}>
          <Text style={styles.title}>Завантажте фото</Text>
          <TextInput
            style={styles.input}
            placeholder="Назва..."
            onChangeText={setComment}
          />
          <TextInput style={styles.input} placeholder="Місцевість..." />
          <TouchableOpacity
            style={styles.submitBtn}
            activeOpacity={0.8}
            onPress={sendPhoto}
          >
            <Text style={styles.submitBtnText}>Опублікувати</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  containerBcg: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  camera: {
    height: "40%",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 32,
  },
  snap: {
    color: "#FFF",
  },
  snapContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#FF0000",
    width: 70,
    height: 70,
    marginTop: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#FFF",
    borderWidth: 1,
  },
  takePhotoImage: {
    width: 140,
    height: 100,
  },
  formWrapper: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  input: {
    color: "#212121",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    backgroundColor: "#FFFFFF",
    placeholderTextColor: "#BDBDBD",
    paddingTop: 15,
    paddingBottom: 15,
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    marginBottom: 16,
    position: "relative",
  },
  submitBtn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  submitBtnText: {
    color: "#FFF",
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
});

export default CreatePostsScreen;
