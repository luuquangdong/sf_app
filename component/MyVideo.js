import { StyleSheet, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { Video } from "expo-av";

const screenWidth = Dimensions.get("window").width;

const MyVideo = ({ uri, id }) => {
  const [status, setStatus] = useState({});

  return (
    <View>
      <Video
        style={styles.video}
        source={{
          uri: uri,
        }}
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};

export default MyVideo;

const styles = StyleSheet.create({
  video: {
    alignSelf: "center",
    width: screenWidth,
    height: (screenWidth * 9) / 16,
  },
});

const handleUri = (uri, id) => {
  const cloud_name = uri.split("/")[3];
  return `https://player.cloudinary.com/embed/?cloud_name=${cloud_name}&public_id=${id}&controls=true`;
};
