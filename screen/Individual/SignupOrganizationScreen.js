import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import mime from "mime";
import AwesomeAlert from "react-native-awesome-alerts";

import MainButton from "../../component/MainButton";
import { COLORS } from "../../constant/colors";
import { signupOrg } from "../../apis/userApi";

const screenWidth = Dimensions.get("window").width;

const SignupOrganizationScreen = ({ navigation }) => {
  const [idCardFile, setIdCardFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const handlePickerPressed = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert("Không được phép truy cập thư viện ảnh");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      presentationStyle: 0,
    });
    if (pickerResult.cancelled === true) {
      return;
    }

    setIdCardFile(pickerResult);
  };

  const handleCancelPressed = () => {
    setIdCardFile(null);
  };

  const handleSignupPressed = async () => {
    if (!idCardFile) return;
    setLoading(true);

    const data = new FormData();
    data.append("idCardFile", {
      name: idCardFile.fileName ?? `${Date.now()}`,
      type: mime.getType(idCardFile.uri),
      uri:
        Platform.OS === "ios"
          ? idCardFile.uri.replace("file://", "")
          : idCardFile.uri,
    });

    try {
      await signupOrg(data);
      setShowAlert(true);
    } catch (err) {
      console.log({ err });
      Alert.alert("Có lỗi xảy ra, đăng ký thất bại!");
    }

    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 8, backgroundColor: "#DDD" }}>
        <Text>
          Để đăng ký thành tổ chức, bạn phải xác thực danh tính của bạn bằng mặt
          trước của thẻ căn cước công dân. Việc này với mục đích là bạn phải
          chịu trách nhiệm cho những gì bạn sẽ tổ chức.
        </Text>
      </View>
      <View style={{ height: 8 }} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={handlePickerPressed}
          style={styles.pickerWrapper}
        >
          <Text style={styles.pickerTxt}>
            {idCardFile ? "Đổi ảnh" : "Đăng ảnh căn cước"}
          </Text>
        </TouchableOpacity>
      </View>
      {idCardFile && (
        <View>
          <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
            <TouchableOpacity onPress={handleCancelPressed}>
              <Text style={styles.cancelTxt}>Hủy</Text>
            </TouchableOpacity>
          </View>
          <Image style={styles.img} source={{ uri: idCardFile.uri }} />
        </View>
      )}
      <View style={{ flex: 1 }} />
      <View style={styles.signupBtnWrapper}>
        <MainButton
          text="Đăng ký"
          onPress={null}
          disabled={loading || !idCardFile}
          onPress={handleSignupPressed}
        />
      </View>
      <View style={{ height: 8 }} />
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Thành công"
        message="Đăng ký thành công, sẽ mất từ một đến hai ngày để admin phê duyệt. Kết quả sẽ được thông báo cho bạn sau"
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
    </View>
  );
};

export default SignupOrganizationScreen;

const styles = StyleSheet.create({
  cancelTxt: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderColor: "#DDD",
    borderWidth: 0.5,
    fontSize: 12,
    color: "red",
  },
  signupBtnWrapper: {
    paddingHorizontal: 16,
  },
  pickerWrapper: {
    paddingVertical: 8,
    backgroundColor: "#2BA84A",
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  pickerTxt: {
    textAlign: "center",
    color: "#FFF",
  },
  img: {
    width: screenWidth,
    height: (screenWidth * 9) / 16,
    resizeMode: "contain",
  },
});
