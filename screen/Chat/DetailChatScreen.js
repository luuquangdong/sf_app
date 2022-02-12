import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { createRoom } from "../../apis/chatApi";
import ChatAction from "../../component/Chat/ChatAction";
import LineMessage from "../../component/Chat/LineMessage";
import { useKeyboardHeight } from "../../hooks/useKeyboardHeight";
import { useKeyboardHeightAnimated } from "../../hooks/useKeyboardHeightAnimated";
import { userState } from "../../recoil/atoms/userState";
import { handleRoomResp } from "../../utils/chatUltil";
import { chatMethodState } from "../../recoil/atoms/chatMethodState";
import { chatState } from "../../recoil/atoms/chatState";

const DetailChat = ({ route }) => {
  const { roomId: rId, guest } = route.params;
  const chatMethod = useRecoilValue(chatMethodState);
  console.log(guest);

  // const { sendMessage, sendFirstMessage, addMessage, addRoom } =
  //   useContext(ChatContext);
  const { sendMessage, sendFirstMessage, addMessage, addRoom } = chatMethod;

  const [roomId, setRoomId] = useState(rId);

  const [data, setData] = useState([]);
  const [rooms, setRooms] = useRecoilState(chatState);
  const user = useRecoilValue(userState);

  const flatListRef = useRef();

  const keyboardHeight = useKeyboardHeight();
  const keyboardHeightAnimated = useKeyboardHeightAnimated();

  const handleSendMessage = async (message) => {
    if (!roomId) {
      const userIds = [guest.id, user.phoneNumber];
      let room = await createRoom(userIds);
      setRoomId(room.id);

      const data = {
        id: `${Date.now()}${user.phoneNumber}`,
        senderId: user.phoneNumber,
        roomId: room.id,
        receiveId: guest.id,
        content: message,
        read: false,
        createdTime: new Date(),
      };
      room.messages = [data];
      room = handleRoomResp(room, user.phoneNumber);

      addRoom(room);
      sendFirstMessage(room);
      return;
    }

    const data = {
      id: `${Date.now()}${user.phoneNumber}`,
      senderId: user.phoneNumber,
      roomId: roomId,
      receiveId: guest.id,
      content: message,
      read: false,
      createdTime: new Date(),
    };

    addMessage(data);
    sendMessage(data);
  };

  useEffect(() => {
    if (roomId) return;
    const room = rooms.find((r) => r.userIds.includes(guest.id));

    if (!room) return;
    const messages = room.messages;

    const newData = JSON.parse(JSON.stringify(messages));
    newData[0].isFirst = true;
    newData[newData.length - 1].isLast = true;
    for (let i = 1; i < newData.length; i++) {
      newData[i].isFirst = newData[i].senderId !== newData[i - 1].senderId;
      newData[i - 1].isLast = newData[i].isFirst;
    }

    setData(newData);
    setRoomId(room.id);
  }, []);

  useEffect(() => {
    if (!roomId) return;
    const room = rooms.find((r) => r.id === roomId);
    const messages = room.messages;

    const newData = JSON.parse(JSON.stringify(messages));
    newData[0].isFirst = true;
    newData[newData.length - 1].isLast = true;
    for (let i = 1; i < newData.length; i++) {
      newData[i].isFirst = newData[i].senderId !== newData[i - 1].senderId;
      newData[i - 1].isLast = newData[i].isFirst;
    }
    // console.log(newData);
    setData(newData);
  }, [rooms]);

  return (
    <View style={styles.container}>
      <View style={styles.listMessage}>
        <FlatList
          ref={flatListRef}
          data={data}
          inverted={true}
          renderItem={({ item }) => (
            <LineMessage message={item} guest={guest} />
          )}
          keyExtractor={(item) => item.id}
          onContentSizeChange={() =>
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
          }
          ListFooterComponent={<Spacer />}
          ListHeaderComponent={<Spacer />}
        />
      </View>
      <Animated.View style={{ marginBottom: keyboardHeightAnimated }}>
        <View style={styles.actions}>
          <ChatAction sendMessage={handleSendMessage} />
        </View>
      </Animated.View>
    </View>
  );
};

const Spacer = () => {
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
