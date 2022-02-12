import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";

const MyImageV2 = ({ url, padding = 0 }) => {
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  const caculateSize = async () => {
    Image.getSize(url, (width, height) => {
      const desireWidth = screenWidth - 2 * padding;
      const scaleFactor = width / desireWidth;
      const imageHeight = height / scaleFactor;
      setImgWidth(desireWidth);
      setImgHeight(imageHeight);
    });
  };

  useEffect(() => {
    caculateSize();
  }, [url]);

  return (
    <View style={styles.container}>
      <Image
        style={{ width: imgWidth, height: imgHeight }}
        source={{ uri: url }}
      />
    </View>
  );
};

export default MyImageV2;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
