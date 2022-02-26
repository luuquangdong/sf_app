import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Platform,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import mime from "mime";

import MainButton from "../MainButton";
import TextButton from "../TextButton";
import { COLORS } from "../../constant/colors";
import { textInput } from "../../constant/formStyle";
import { useNavigation } from "@react-navigation/native";
import useSportList from "../../utils/useSportList";
import Select from "../Select";
import { sportIdToObject } from "../../utils/userUtil";

const validationSchema = yup.object().shape({
  name: yup.string().required("Bạn chưa nhập tên giải đấu"),
  startTime: yup
    .string()
    .matches(
      /^[0,1,2,3]?\d\/[0,1]?\d\/\d{4}$/,
      "Phải nhập theo đúng định dạng: Ngày/tháng/năm"
    )
    .required("Ngày bắt đầu là bắt buộc"),
  endTime: yup
    .string()
    .matches(
      /^[0,1,2,3]?\d\/[0,1]?\d\/\d{4}$/,
      "Phải nhập theo đúng định dạng: Ngày/tháng/năm"
    )
    .required("Ngày kết thúc là bắt buộc"),
  location: yup.string().required("Địa điểm là bắt buộc"),
});

const PADDING = 12;
const bannerWidth = Dimensions.get("window").width - 4 * PADDING;

const EditTournamentComponent = ({ tournament, onOkPress, successMessage }) => {
  const [textHeight, setTextHeight] = useState(20);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [sport, setSport] = useState(() => {
    if (!tournament?.sportName) return null;
    return { id: tournament.sportId, label: tournament.sportName };
  });
  const sportList = useSportList();
  const formMilkRef = useRef(null);

  const handleSportChange = (selectedValue) => {
    console.log(formMilkRef.current);
    const errors = formMilkRef.current.errors;
    if (!selectedValue?.label) {
      formMilkRef.current.setErrors({
        ...errors,
        sport: "Bạn chưa chọn môn thể thao",
      });
    } else {
      formMilkRef.current.setErrors({ ...errors, sport: null });
    }
    setSport(selectedValue);
  };

  const handleChoosePhoto = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert("Không được phép truy cập thư viện ảnh");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      presentationStyle: 0,
    });
    console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }

    setPhoto(pickerResult);
  };

  const handleCancelBanner = () => {
    setPhoto(null);
  };

  const handleOkPressed = async (values, formProps) => {
    if (!sport?.id) {
      formProps.setErrors({ sport: "Bạn chưa chọn môn thể thao" });
      return;
    }
    if (!onOkPress) return;
    try {
      setLoading(true);
      let form = null;
      if (photo) {
        form = new FormData();
        form.append("banner", {
          name: photo.fileName ?? `${Date.now()}`,
          type: mime.getType(photo.uri),
          uri:
            Platform.OS === "ios"
              ? photo.uri.replace("file://", "")
              : photo.uri,
        });
      }
      await onOkPress(
        { ...values, sportId: sport.id, sportName: sport.label },
        form,
        formProps
      );
      setLoading(false);
      setShowAlert(true);
    } catch (err) {
      setLoading(false);
      console.log({ err });
    }
  };

  useEffect(() => {
    if (!tournament?.sport) return;
    setSport(sportIdToObject(tournament.sport.id, sportList));
  }, [sportList]);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Formik
        initialValues={{
          name: tournament?.name ?? "",
          startTime: tournament?.startTime ?? "",
          endTime: tournament?.endTime ?? "",
          location: tournament?.location ?? "",
          details: tournament?.details ?? "",
        }}
        onSubmit={handleOkPressed}
        validationSchema={validationSchema}
        innerRef={(p) => (formMilkRef.current = p)}
      >
        {({
          values,
          handleSubmit,
          errors,
          touched,
          handleChange,
          handleBlur,
        }) => (
          <>
            <View style={styles.bannerContainer}>
              <View style={styles.bannerLayout}>
                <Image
                  source={{ uri: photo?.uri ?? tournament?.banner?.url }}
                  style={styles.banner}
                  resizeMode="cover"
                />
              </View>
              {photo === null ? (
                <TextButton
                  text={
                    tournament?.banner != null ? "Đổi banner" : "Thêm banner"
                  }
                  onPress={handleChoosePhoto}
                />
              ) : (
                <TextButton text="Hủy" onPress={handleCancelBanner} />
              )}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Tên giải đấu</Text>
              <TextInput
                style={styles.input}
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
              />
              {errors.name && touched.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
            </View>
            <View>
              <Text style={styles.label}>Bộ môn:</Text>
              <Select
                items={sportList}
                selectedValue={sport}
                onItemChange={handleSportChange}
                label="Chọn bộ môn"
              />
              {errors.sport && <Text style={styles.error}>{errors.sport}</Text>}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Ngày bắt đầu</Text>
              <TextInput
                style={styles.input}
                value={values.startTime}
                onChangeText={handleChange("startTime")}
                onBlur={handleBlur("startTime")}
              />
              {errors.startTime && touched.startTime && (
                <Text style={styles.error}>{errors.startTime}</Text>
              )}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Ngày kết thúc</Text>
              <TextInput
                style={styles.input}
                value={values.endTime}
                onChangeText={handleChange("endTime")}
                onBlur={handleBlur("endTime")}
              />
              {errors.endTime && touched.endTime && (
                <Text style={styles.error}>{errors.endTime}</Text>
              )}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Địa điểm</Text>
              <TextInput
                style={styles.input}
                value={values.location}
                onChangeText={handleChange("location")}
                onBlur={handleBlur("location")}
              />
              {errors.location && touched.location && (
                <Text style={styles.error}>{errors.location}</Text>
              )}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Chi tiết</Text>
              <TextInput
                style={[styles.input, styles.details, { height: textHeight }]}
                value={values.details}
                onChangeText={handleChange("details")}
                onBlur={handleBlur("details")}
                onContentSizeChange={(e) =>
                  setTextHeight(e.nativeEvent.contentSize.height)
                }
                multiline
              />
            </View>
            <View style={{ height: 12 }} />
            <MainButton
              text="Xác nhận"
              onPress={handleSubmit}
              disabled={loading}
            />
            <View style={{ height: 12 }} />
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Thành công"
              message={successMessage}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              // showCancelButton={true}
              showConfirmButton={true}
              // cancelText="No, cancel"
              confirmText="OK"
              confirmButtonColor={COLORS.success}
              // onCancelPressed={() => {
              //   this.hideAlert();
              // }}
              onConfirmPressed={() => {
                setShowAlert(false);
              }}
              onDismiss={() => {
                setTimeout(() => navigation.pop(), 500);
              }}
            />
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default EditTournamentComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 12,
  },
  bannerContainer: {
    alignItems: "center",
    marginTop: PADDING,
  },
  bannerLayout: {
    width: bannerWidth,
    height: (bannerWidth * 9) / 16,
    backgroundColor: "#DDD",
  },
  banner: {
    width: bannerWidth,
    height: (bannerWidth * 9) / 16,
  },
  formGroup: {
    marginVertical: 4,
  },
  label: {
    color: "#666",
  },
  input: {
    ...textInput,
  },
  error: {
    color: "red",
  },
  details: {
    // minHeight: 100,
    alignItems: "flex-start",
    textAlignVertical: "top",
  },
});
