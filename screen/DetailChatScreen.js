import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import ChatAction from "../component/Chat/ChatAction";
import LineMessage from "../component/Chat/LineMessage";
import { useKeyboardHeight } from "../hooks/useKeyboardHeight";
import { useKeyboardHeightAnimated } from "../hooks/useKeyboardHeightAnimated";

const DATA = [
  {
    id: "1",
    sender: "Me",
    recieve: "AAA",
    createdTime: "1/1/2021",
    read: true,
    content: "Hello, how are you?",
  },
  {
    id: "2",
    sender: "Me",
    recieve: "AAA",
    createdTime: "1/1/2021",
    read: true,
    content: "Alo, are you heard me?",
  },
  {
    id: "3",
    sender: "Me",
    recieve: "AAA",
    createdTime: "1/1/2021",
    read: true,
    content: "Hey hey, just say something. Are you alive. OK OK?",
  },
  {
    id: "4",
    sender: "AAA",
    recieve: "Me",
    createdTime: "1/1/2021",
    read: true,
    content: "short...",
  },
  {
    id: "5",
    sender: "Me",
    recieve: "AAA",
    createdTime: "1/1/2021",
    read: true,
    content: "Hello, how are you?",
  },
  {
    id: "11",
    sender: "Me",
    recieve: "AAA",
    createdTime: "1/1/2021",
    read: true,
    content: "Hello, how are you?",
  },
  {
    id: "12",
    sender: "Me",
    recieve: "AAA",
    createdTime: "1/1/2021",
    read: true,
    content: "Alo, are you heard me?",
  },
  {
    id: "13",
    sender: "Me",
    recieve: "AAA",
    createdTime: "1/1/2021",
    read: true,
    content: "Hey hey, just say something. Are you alive. OK OK?",
  },
  {
    id: "14",
    sender: "AAA",
    recieve: "Me",
    createdTime: "1/1/2021",
    read: true,
    content: "long long long long long long long long long long long?",
  },
  {
    id: "15",
    sender: "Me",
    recieve: "AAA",
    createdTime: "1/1/2021",
    read: true,
    content: "Hello, how are you?",
  },
];

const DetailChat = () => {
  const [data, setData] = useState(DATA);
  const flatListRef = useRef();
  const keyboardHeight = useKeyboardHeight();
  const keyboardHeightAnimated = useKeyboardHeightAnimated();

  useEffect(() => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[0].isFirst = true;
    newData[newData.length - 1].isLast = true;
    for (let i = 1; i < data.length; i++) {
      newData[i].isFirst = newData[i].sender !== newData[i - 1].sender;
      newData[i - 1].isLast = newData[i].isFirst;
    }
    setData(newData);
  }, []);

  // return (
  //   <View style={[styles.container, { marginBottom: keyboardHeight }]}>
  //     <View style={styles.listMessage}>
  //       <FlatList
  //         ref={flatListRef}
  //         data={data}
  //         renderItem={({ item }) => <LineMessage message={item} />}
  //         keyExtractor={(item) => item.id}
  //         onContentSizeChange={() =>
  //           flatListRef.current.scrollToEnd({ animated: true })
  //         }
  //         ListFooterComponent={<Footer />}
  //       />
  //     </View>
  //     <View style={styles.actions}>
  //       <ChatAction />
  //     </View>
  //   </View>
  // );
  return (
    <View style={styles.container}>
      <View style={styles.listMessage}>
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={({ item }) => <LineMessage message={item} />}
          keyExtractor={(item) => item.id}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
          ListFooterComponent={<Footer />}
        />
      </View>
      <Animated.View style={{ marginBottom: keyboardHeightAnimated }}>
        <View style={styles.actions}>
          <ChatAction />
        </View>
      </Animated.View>
    </View>
  );
};

const Footer = () => {
  return <View style={{ height: 30 }}></View>;
};

export default DetailChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  listMessage: {
    flex: 1,
  },
  actions: {
    minHeight: 46,
    flexShrink: 1,
  },
});
