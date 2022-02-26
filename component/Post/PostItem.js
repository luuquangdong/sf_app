import React, { useCallback, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import Comment from "../Comment";
import { likePost } from "../../apis/postApi";
import MyImageV2 from "../MyImageV2";
import { useSetRecoilState } from "recoil";
import { currentPostState } from "../../recoil/atoms/currentPostState";
import { formatCalendar } from "../../utils/dateUtils";
import Avatar from "../Avatar";
import MyVideo from "../MyVideo";

function PostItem({ onOptionPress, post: p, openComment }) {
  const [showComment, setShowComment] = useState(false);
  const setCurrentPost = useSetRecoilState(currentPostState);
  const [post, setPost] = useState(p);

  const handleCommentPress = useCallback(() => {
    if (Platform.OS === "web") {
      setShowComment((preShow) => !preShow);
      return;
    }
    setCurrentPost(post);
    if (openComment) openComment();
  }, []);

  const handleOptionPress = () => {
    if (onOptionPress) onOptionPress(post);
  };

  const handleLikePost = async () => {
    const likedPost = await likePost(post.id);
    const newPost = { ...post };
    newPost.liked = likedPost.liked;
    newPost.likeCount = likedPost.likeCount;
    setPost(newPost);
  };

  if (post.banned && !post.canEdit) {
    return null;
  }

  return (
    <View style={[styles.container, post.banned && styles.banned]}>
      <View style={styles.post}>
        <View style={styles.header}>
          <Avatar
            name={post.author.name}
            url={post.author.avatar?.url}
            size={40}
          />
          <View style={styles.title}>
            <Text style={styles.name}>{post.author.name}</Text>
            <Text style={styles.time}>{formatCalendar(post.createdTime)}</Text>
          </View>
          <TouchableOpacity onPress={handleOptionPress}>
            <Ionicons name="ellipsis-horizontal" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text>{post.content}</Text>
        </View>
        {post.image && <MyImageV2 url={post.image.url} />}
        {post.video && <MyVideo uri={post.video.url} id={post.video.id} />}
        <View style={styles.action}>
          <TouchableOpacity style={styles.like} onPress={handleLikePost}>
            <MaterialIcons
              name="thumb-up"
              size={20}
              color={post.liked ? "#00A7E1" : "#666"}
            />
            <Text>{` ${post.likeCount}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.comment} onPress={handleCommentPress}>
            <Text>{`${post.commentCount} Bình luận`}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showComment && <Comment postId={post.id} />}
    </View>
  );
}

export default React.memo(PostItem);

const PADDING = 8;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
  },
  post: {
    // padding: 8,
    paddingVertical: PADDING,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: PADDING,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  title: {
    marginLeft: 8,
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    color: "blue",
  },
  time: {
    fontSize: 12,
    color: "#666",
  },
  content: {
    marginVertical: 8,
    flexShrink: 1,
    paddingHorizontal: PADDING,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
    paddingHorizontal: PADDING,
  },
  like: {
    flexDirection: "row",
  },
  comment: {
    flexDirection: "row",
  },
  banned: {
    borderColor: "red",
    borderWidth: 2,
    opacity: 0.4,
  },
});
