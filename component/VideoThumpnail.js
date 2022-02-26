import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as VideoThumbnails from "expo-video-thumbnails";

const screenWidth = Dimensions.get("window").width;

const VideoThumpnail = ({ uri }) => {
  const [isErr, setErr] = useState(false);
  const [imgUri, setImgUri] = useState(null);

  useEffect(async () => {
    try {
      const thumbnail = await VideoThumbnails.getThumbnailAsync(uri);
      if (thumbnail?.uri) {
        setImgUri(thumbnail.uri);
      } else {
        setImgUri(uri);
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);
  return (
    <View style={styles.container}>
      {!isErr ? (
        <Image
          source={{ uri: imgUri }}
          style={styles.img}
          onError={() => setErr(true)}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#CCC",
            width: screenWidth,
            height: (screenWidth * 9) / 16,
          }}
        >
          <Text style={{ textAlign: "center" }}>Video</Text>
        </View>
      )}
    </View>
  );
};

export default VideoThumpnail;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: screenWidth,
    height: (screenWidth * 9) / 16,
  },
});
