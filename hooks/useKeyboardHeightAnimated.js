import { useRef, useEffect } from "react";
import { Animated, Keyboard } from "react-native";

export const useKeyboardHeightAnimated = () => {
  const keyboardHeightAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardWillShow = (e) => {
      Animated.timing(keyboardHeightAnimated, {
        duration: e.duration,
        toValue: e.endCoordinates.height,
        useNativeDriver: false,
      }).start();
    };

    const keyboardWillHide = (e) => {
      Animated.timing(keyboardHeightAnimated, {
        duration: e.duration,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    };

    const keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      keyboardWillShow
    );
    const keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      keyboardWillHide
    );

    return () => {
      keyboardWillHideSub.remove();
      keyboardWillShowSub.remove();
    };
  }, [keyboardHeightAnimated]);

  return keyboardHeightAnimated;
};
