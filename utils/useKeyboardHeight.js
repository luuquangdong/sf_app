import { useRef, useEffect, useState } from "react";
import { Dimensions, Keyboard } from "react-native";

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onKeyboardShow = (event) => {
    let deviceH = Dimensions.get("screen").height;
    let windowH = Dimensions.get("window").height;
    let bottomNavBarH = deviceH - windowH;
    setKeyboardHeight(event.endCoordinates.height + bottomNavBarH);
  };
  const onKeyboardHide = () => setKeyboardHeight(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardWillShow",
      onKeyboardShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardWillHide",
      onKeyboardHide
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  return keyboardHeight;
};
