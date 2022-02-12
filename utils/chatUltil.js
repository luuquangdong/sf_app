const handleRoomResp = (room, meId) => {
  let guest =
    room.chatters?.[0].id === meId ? room.chatters?.[1] : room.chatters?.[0];
  let me =
    room.chatters?.[0].id === meId ? room.chatters?.[0] : room.chatters?.[1];

  if (!guest) guest = { name: "Vô danh", avatar: null };

  return { ...room, guest: guest, me: me };
};

export { handleRoomResp };
