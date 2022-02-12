import React, { useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

const DEFAULT_HEIGHT = 200;

function useAnimatedBottom(show, height = DEFAULT_HEIGHT) {
  const animatedValue = React.useRef(new Animated.Value(0));

  const bottom = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, 0],
  });

  React.useEffect(() => {
    if (show) {
      Animated.timing(animatedValue.current, {
        toValue: 1,
        duration: 350,
        easing: Easing.bezier(0.28, 0, 0.63, 1),
        useNativeDriver: false, // 'bottom' is not supported by native animated module
      }).start();
    } else {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        duration: 250,
        easing: Easing.cubic,
        useNativeDriver: false,
      }).start();
    }
  }, [show]);

  return bottom;
}

export function BottomSheet({ children, show, onOuterClick }) {
  const { height: screenHeight } = useWindowDimensions();
  const [height, setHeight] = useState(200);
  const bottom = useAnimatedBottom(show, height);

  return (
    <>
      {show && (
        <Pressable
          onPress={onOuterClick}
          style={[styles.outerOverlay, { height: screenHeight }]}
        >
          <View />
        </Pressable>
      )}
      <Animated.View style={[styles.bottomSheet, { height, bottom }]}>
        <View onLayout={(e) => setHeight(e.nativeEvent.layout.height)}>
          {children}
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  outerOverlay: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    backgroundColor: "black",
    opacity: 0.3,
  },
  bottomSheet: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    backgroundColor: "#FFF",
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
  },
});
