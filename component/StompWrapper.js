import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useNetInfo } from "@react-native-community/netinfo";
import { BASE_URL } from "../apis/axiosInstance";
import { getListRoom } from "../apis/chatApi";
import { chatState } from "../recoil/atoms/chatState";
import { userState } from "../recoil/atoms/userState";
import { handleRoomResp } from "../utils/chatUltil";
import { chatMethodState } from "../recoil/atoms/chatMethodState";

export const ChatContext = React.createContext(null);

const StompWrapper = ({ children }) => {
  const user = useRecoilValue(userState);
  const [rooms, setRooms] = useRecoilState(chatState);
  const setChatMethod = useSetRecoilState(chatMethodState);
  const [userId, setUserId] = useState(null);
  const netInfo = useNetInfo();

  const stompClientRef = useRef(null);
  const roomsRef = useRef(null);

  const connect = () => {
    // const headers = { Authorization: `Bearer ${jwt}` };
    var socket = new SockJS(`${BASE_URL}/ws`);
    const stompClient = Stomp.over(socket);

    stompClient.connect({ userId: user?.phoneNumber }, onConnected, onError);
    stompClientRef.current = stompClient;
  };

  const sendMessage = (message) => {
    stompClientRef.current.send("/chat/message", {}, JSON.stringify(message));
  };

  const sendFirstMessage = (message) => {
    stompClientRef.current.send(
      "/chat/first-message",
      {},
      JSON.stringify(message)
    );
  };

  const onConnected = (data) => {
    console.log("onConnected");

    stompClientRef.current.subscribe("/user/queue/messages", onMessageReceived);
    stompClientRef.current.subscribe(
      "/user/queue/first-message",
      onFirstMessageReceived
    );
  };

  const onMessageReceived = (payload) => {
    console.log("onMessageReceived");
    var message = JSON.parse(payload.body);
    // console.log("message", message);
    addMessage(message);
  };

  const addMessage = (newMessage) => {
    let roomsTmp = JSON.parse(JSON.stringify(roomsRef.current));
    const room = roomsTmp.find((r) => r.id === newMessage.roomId);
    roomsTmp = roomsTmp.filter((r) => r.id !== room.id);

    const messages = room.messages;
    room.messages = [newMessage, ...messages];
    room.lastModified = new Date().toISOString();

    roomsTmp = [room, ...roomsTmp];
    setRooms(roomsTmp);
    roomsRef.current = roomsTmp;
  };

  const addRoom = (newRoom) => {
    roomsRef.current = [newRoom, ...roomsRef.current];
    setRooms(roomsRef.current);
  };

  const onFirstMessageReceived = (payload) => {
    console.log("onFirstMessageReceived");
    var newRoom = JSON.parse(payload.body);
    newRoom = handleRoomResp(newRoom, user.phoneNumber);
    addRoom(newRoom);
  };

  const onError = (error) => {
    console.log("Ko ket noi duoc");
    console.log(error);
  };

  const disconnect = () => {
    try {
      stompClientRef.current.disconnect((data) => {
        console.log("disconnected", data);
      }, {});
    } catch (err) {}
  };

  const fetchRoomData = async () => {
    try {
      let data = await getListRoom(user.phoneNumber);
      data = data.map((room) => handleRoomResp(room, user.phoneNumber));
      roomsRef.current = data;
      setRooms(data);
    } catch (err) {
      console.log({ err });
      console.log(err.response);
    }
  };

  useEffect(() => {
    if (!user) return;

    setChatMethod({ sendMessage, sendFirstMessage, addMessage, addRoom });

    console.log("userId", user.phoneNumber);
    setUserId(user.phoneNumber);
  }, [user]);

  useEffect(() => {
    if (!netInfo.isConnected || !userId) return;

    console.log("connecting...");
    connect();
    fetchRoomData();

    return disconnect;
  }, [netInfo.isConnected, userId]);

  return <>{children}</>;
};

export default StompWrapper;
