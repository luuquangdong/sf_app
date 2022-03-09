import React, { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import mime from "mime";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AwesomeAlert from "react-native-awesome-alerts";
import { useRecoilValue, useSetRecoilState } from "recoil";

import MyImage from "../component/MyImage";
import { ICON_SIZE } from "../constant/headerBar";
import { userState } from "../recoil/atoms/userState";
import { dataBackState } from "../recoil/atoms/dataBackState";
import { createPost } from "../apis/postApi";
import { COLORS } from "../constant/colors";
import VideoThumpnail from "../component/VideoThumpnail";

const CreatePostScreen = ({ navigation }) => {
  const user = useRecoilValue(userState);
  const setDataBack = useSetRecoilState(dataBackState);

  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [hasText, setHasText] = useState(false);
  const [description, setDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleUploadImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Không được phép truy cập thư viện ảnh");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      presentationStyle: 0,
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    setImageFile(pickerResult);
    setVideoFile(null);
  };

  const handlePickVideoPressed = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Không được phép truy cập thư viện ảnh");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      presentationStyle: 0,
      mediaTypes: "Videos",
      videoMaxDuration: 60,
    });
    console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }
    setVideoFile(pickerResult);
    setImageFile(null);
  };

  const handleCancelVideoPressed = () => {
    setVideoFile(null);
  };

  const handleCancelPress = () => {
    setImageFile(null);
  };

  const handleCreatePostPress = async () => {
    const data = new FormData();
    data.append("authorId", user?.phoneNumber);
    if (description) {
      data.append("content", description);
    }
    if (imageFile) {
      data.append("image", {
        name: imageFile.fileName ?? `${Date.now()}`,
        type: mime.getType(imageFile.uri),
        uri:
          Platform.OS === "ios"
            ? imageFile.uri.replace("file://", "")
            : imageFile.uri,
      });
    }
    if (videoFile) {
      data.append("video", {
        name: videoFile.fileName ?? `${Date.now()}`,
        type: mime.getType(videoFile.uri),
        uri:
          Platform.OS === "ios"
            ? videoFile.uri.replace("file://", "")
            : videoFile.uri,
      });
    }
    setLoading(true);
    try {
      const p = await createPost(data);
      setDataBack(p);
      setLoading(false);
      setShowAlert(true);
    } catch (err) {
      console.log({ err });
      setLoading(false);
      Alert.alert("Có lỗi xảy ra, đăng bài thất bại!");
    }
  };

  const handleTextChange = (newTxt) => {
    const tmp = newTxt;
    setDescription(tmp);
    setHasText(tmp.length != 0);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          disabled={
            loading || !(hasText || imageFile !== null || videoFile !== null)
          }
          onPress={handleCreatePostPress}
          style={{ marginRight: 8 }}
        >
          <MaterialIcons
            name="send"
            size={ICON_SIZE}
            color={
              loading || !(hasText || imageFile !== null || videoFile !== null)
                ? "#CCC"
                : "#FFF"
            }
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, loading, imageFile, description, videoFile]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.action}>
        <TouchableOpacity style={styles.actionBtn} onPress={handleUploadImage}>
          <Text>Đăng ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={handlePickVideoPressed}
        >
          <Text>Đăng video</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputSection}>
        <TextInput
          placeholder="Bạn đang nghĩ gì?"
          multiline
          style={styles.textIpt}
          value={description}
          onChangeText={handleTextChange}
        />
      </View>
      <View style={{ flex: 1 }} />
      {imageFile && (
        <View>
          <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
            <TouchableOpacity onPress={handleCancelPress}>
              <Text style={styles.cancelTxt}>Hủy</Text>
            </TouchableOpacity>
          </View>
          <MyImage
            width={imageFile.width}
            height={imageFile.height}
            url={imageFile.uri}
          />
        </View>
      )}
      {videoFile && (
        <View>
          <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
            <TouchableOpacity onPress={handleCancelVideoPressed}>
              <Text style={styles.cancelTxt}>Hủy</Text>
            </TouchableOpacity>
          </View>
          {/* <MyImage
            width={videoFile.width}
            height={videoFile.height}
            url={
              Platform.OS === "ios"
                ? videoFile.uri.replace("file://", "")
                : videoFile.uri
            }
          /> */}
          <VideoThumpnail
            // uri={
            //   Platform.OS === "ios"
            //     ? videoFile.uri.replace("file://", "")
            //     : videoFile.uri
            // }
            uri={videoFile.uri}
          />
        </View>
      )}
      <View style={{height: 24}}/>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Thành công"
        message="Đăng bài thành công"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor={COLORS.success}
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
        onDismiss={() => {
          setTimeout(() => navigation.pop(), 500);
        }}
      />
    </KeyboardAwareScrollView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 12,
  },
  inputSection: {
    flex: 1,
    paddingHorizontal: 12,
  },
  textIpt: {
    fontSize: 18,
    color: "#26547C",
    minHeight: 60,
  },
  action: {
    flexDirection: "row",
    backgroundColor: "#FFF",
  },
  actionBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  cancelTxt: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderColor: "#DDD",
    borderWidth: 0.5,
    fontSize: 12,
    color: "red",
  },
});
