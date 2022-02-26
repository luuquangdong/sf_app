import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import AwesomeAlert from "react-native-awesome-alerts";

import { ICON_SIZE } from "../../constant/headerBar";
import { reloadState } from "../../recoil/atoms/reloadState";

const CreateResultTournamentScreen = ({ navigation, route }) => {
  const { result } = route.params;
  const [txt, setTxt] = useState(result ?? "");
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useRecoilState(reloadState);

  const [showAlert, setShowAlert] = useState(false);

  const handleOkPressed = async () => {
    setLoading(true);
    try {
      setLoading(false);
      setReload(!reload);
      // setShowAlert(true);
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          disabled={loading || !txt}
          onPress={handleOkPressed}
          style={{ marginRight: 8 }}
        >
          <MaterialIcons
            name="send"
            size={ICON_SIZE}
            color={loading || !txt ? "#DDD" : "#FFF"}
          />
        </TouchableOpacity>
      ),
    });
  }, [txt, loading]);

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 12 }}>
        <TextInput
          placeholder="Nhập kết quả thi đấu?"
          multiline
          style={styles.textIpt}
          value={txt}
          onChangeText={setTxt}
        />
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Thành công"
        message="Cập nhật thành công"
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
          setPhoneNumber(values.phoneNumber);
          setTimeout(() => navigation.pop(), 500);
        }}
      />
    </KeyboardAwareScrollView>
  );
};

export default CreateResultTournamentScreen;

const styles = StyleSheet.create({});
