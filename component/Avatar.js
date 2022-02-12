import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Avatar = ({ url, name = "Anonymous", size = 40 }) => {
  const [valid, setValid] = useState(true);
  useEffect(() => {
    if (!url) setValid(false);
    else setValid(true);
  }, [url]);

  return (
    <View
      style={[
        styles.wrapper,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      {valid ? (
        <Image
          style={{ width: size, height: size, borderRadius: size / 2 }}
          source={{ uri: url }}
          onError={() => setValid(false)}
        />
      ) : (
        <Text style={[styles.text, { fontSize: size / 2 }]}>
          {name.substring(0, 1)}
        </Text>
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#F4F1BB",
    borderColor: "#999",
    overflow: "hidden",
  },
  text: {
    color: "#B6465F",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 0,
    margin: 0,
  },
});
