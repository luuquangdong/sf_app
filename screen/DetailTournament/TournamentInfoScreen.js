import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { tournamentState } from "../../recoil/atoms/tournamentState";
import TextButton from "../../component/TextButton";
import { requestToJoinTournament } from "../../apis/tournamentApi";
import { dataBackState } from "../../recoil/atoms/dataBackState";
import { getListTournamentPost } from "../../apis/postApi";
import Menu2 from "../../component/Post/Menu2";
import ReportPostMenu from "../../component/Post/ReportPostMenu";
import LocalErrorBoundary from "../../component/LocalErrorBoudary";
import CommentBottomSheet from "../../component/Comment/CommentBottomSheet";
import Separator from "../../component/Separator";
import PostItem from "../../component/Post/PostItem";
import { reloadState } from "../../recoil/atoms/reloadState";

const STATUS = {
  WAITING: "Chưa bắt đầu",
  HAPPENING: "Đang diễn ra",
  FINISHED: "Kết thúc",
};

const bannerWidth = Dimensions.get("window").width;
const bannerHeight = (bannerWidth * 9) / 16;

const TournamentInfoScreen = ({ navigation }) => {
  const [dataBack, setDataBack] = useRecoilState(dataBackState);
  const [tournament, setTournament] = useRecoilState(tournamentState);
  const reload = useRecoilValue(reloadState);
  const [posts, setPosts] = useState([]);

  const [isShowMenu, setShowMenu] = useState(false);
  const [isShowReport, setShowReport] = useState(false);

  const selectedItemRef = useRef(null);
  const sheetRef = useRef(null);

  // const me = useRecoilValue(userState);

  const handleOpenComment = useCallback((post) => {
    selectedItemRef.current = post;
    sheetRef.current.snapToIndex(0);
  }, []);

  const showReport = useCallback(() => {
    setShowReport(true);
  }, []);

  const hideReport = useCallback(() => {
    setShowReport(false);
  }, []);

  const hideMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const handleOptionPress = useCallback((post) => {
    selectedItemRef.current = post;
    setShowMenu(true);
  }, []);

  const handleEditPressed = () => {
    navigation.navigate("EditTournamentInfo");
  };

  const handleJoinPressed = async () => {
    try {
      await requestToJoinTournament(tournament.id);
      setTournament({ ...tournament, requested: true });
    } catch (err) {
      console.log({ err });
    }
  };

  const handleCreatePostPressed = async () => {
    navigation.navigate("CreateTournamentPost", {
      tournamentId: tournament.id,
    });
  };

  const handleUpdateTournamentResult = async () => {
    navigation.navigate("CreateResultTournament", {
      tournamentId: tournament.result,
    });
  };

  const removePost = (postId) => {
    const index = posts.findIndex((p) => p.id === postId);
    setPosts([...posts.slice(0, index), ...posts.slice(index + 1)]);
  };

  const fetchListTournamentPosts = async () => {
    try {
      const data = await getListTournamentPost(tournament.id);
      setPosts(data);
      console.log(data);
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    console.log(tournament);
    if (!tournament) return;
    if (posts.length !== 0) return;
    fetchListTournamentPosts();
  }, [tournament]);

  useFocusEffect(
    React.useCallback(() => {
      if (!dataBack) return;
      setPosts([dataBack, ...posts]);
      setDataBack(null);
    }, [dataBack])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.inner}>
        {/* {tournament.banner != null && <MyImageV2 url={tournament.banner.url} />} */}
        {tournament.banner != null && (
          <Image
            source={{ uri: tournament.banner.url }}
            style={{ width: bannerWidth, height: bannerHeight }}
            resizeMode="cover"
          />
        )}
        <View style={styles.info}>
          <View style={styles.heading}>
            <Text style={styles.textHeading}>{tournament.name}</Text>
          </View>
          <Text>
            <Text style={styles.title}>Bộ môn: </Text>
            {`${tournament.sportName}`}
          </Text>
          <Text>
            <Text style={styles.title}>Thời gian: </Text>{" "}
            {`${tournament.startTime} - ${tournament.endTime}`}
          </Text>
          <Text>
            <Text style={styles.title}>Trạng thái: </Text>
            {STATUS[tournament?.status]}
          </Text>
          <Text>
            <Text style={styles.title}>Địa điểm: </Text>
            {`${tournament.place || "Bách khoa Hà Nội"}`}
          </Text>
          <View>
            <Text style={styles.title}>Chi Tiết:</Text>
            <Text>{`${tournament.details || "hoạt động hay và bổ ích"}`}</Text>
          </View>
        </View>
        <View>
          {tournament.canEdit ? (
            <View style={{ alignItems: "center" }}>
              <TextButton text="Sửa thông tin" onPress={handleEditPressed} />
            </View>
          ) : tournament.requested ? (
            // <Button title="Hủy yêu cầu" />
            <View>
              <Text
                style={{
                  textTransform: "uppercase",
                  textAlign: "center",
                  padding: 5,
                  borderRadius: 4,
                  backgroundColor: "#DDD",
                }}
              >
                Đã gửi yêu cầu
              </Text>
            </View>
          ) : tournament.joined ? null : ( // <Button title="Hủy tham gia" />
            <Button title="Xin tham gia" onPress={handleJoinPressed} />
          )}
          {/* {tournament.canEdit ? (
            <View style={{ alignItems: "center" }}>
              <TextButton text="Sửa thông tin" onPress={handleEditPressed} />
            </View>
          ) : tournament.joined ? (
            <Button title="Hủy tham gia" />
          ) : (
            <Button title="Xin tham gia" onPress={handleJoinPressed} />
          )} */}
        </View>
        {/* <View style={styles.result}>
          <Text style={styles.textHeading}>Kết quả thi đấu</Text>
          <View>
            {tournament.result ? (
              <Text>{tournament.result}</Text>
            ) : (
              <Text style={{ textAlign: "center" }}>Chưa có kết quả</Text>
            )}
          </View>
          {tournament.canEdit && (
            <View style={{ alignItems: "center" }}>
              <TextButton
                text="Điều chỉnh kết quả thi đấu"
                onPress={handleUpdateTournamentResult}
              />
            </View>
          )}
        </View> */}
        <View style={styles.postTitle}>
          <Text style={styles.textHeading}>Bài viết</Text>
          {tournament.canEdit && (
            <TouchableOpacity>
              <Ionicons
                name="add-circle-outline"
                size={24}
                onPress={handleCreatePostPressed}
              />
            </TouchableOpacity>
          )}
        </View>
        {posts.length === 0 ? (
          <View>
            <Text style={{ textAlign: "center" }}>Chưa có bài viết nào</Text>
          </View>
        ) : (
          posts.map((item) => {
            return (
              <View key={item?.id}>
                <PostItem
                  post={item}
                  openComment={handleOpenComment}
                  onOptionPress={handleOptionPress}
                />
                <Separator />
              </View>
            );
          })
        )}
        <View style={{ height: 36 }} />
      </ScrollView>
      <Menu2
        isShow={isShowMenu}
        hide={hideMenu}
        post={selectedItemRef.current}
        showReport={showReport}
        removePost={removePost}
      />
      <ReportPostMenu
        isShow={isShowReport}
        hide={hideReport}
        post={selectedItemRef.current}
      />
      <LocalErrorBoundary>
        <CommentBottomSheet ref={sheetRef} />
      </LocalErrorBoundary>
    </SafeAreaView>
  );
};

export default TournamentInfoScreen;

const borderBottom = {
  borderBottomWidth: 0.5,
  borderColor: "#DDD",
  marginTop: 16,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  inner: {
    padding: 12,
  },
  info: {
    ...borderBottom,
  },
  heading: {},
  textHeading: {
    fontSize: 20,
    textAlign: "center",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    color: "#555",
  },
  result: {
    ...borderBottom,
  },
  postTitle: {
    ...borderBottom,
    flexDirection: "row",
    alignItems: "center",
  },
});
