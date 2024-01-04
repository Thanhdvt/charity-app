import React, {useContext, useState} from "react";
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {Ionicons,} from "@expo/vector-icons";
import {COLORS, images} from "../../../src/constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../context/AuthContext";

const CommentScreen = () => {
  const {userToken} = useContext(AuthContext);
  const navigation = useNavigation();
  const navigateGoBack = () => {
    navigation.goBack();
  };

  const [comments, setComments] = useState([
    {
      id: 1,
      text: "Bài đăng ý nghĩa!",
      user: { name: "Thành", avatar: images.avatar_1 },
      likes: 8,
      isLiked: false,
      createdAt: new Date("2023-11-23T24:00:00"),
    },
    {
      id: 2,
      text: "Cảm ơn bạn!",
      user: {
        name: "Hội chữ thập đỏ Việt Nam",
        avatar: images.profile,
      },
      likes: 7,
      isLiked: false,
      createdAt: new Date("2023-11-23T12:00:00"),
    },
    {
      id: 3,
      text: "Mong điều tốt đẹp với mọi người.",
      user: { name: "Thành", avatar: images.avatar_1 },
      likes: 5,
      isLiked: false,
      createdAt: new Date("2023-11-22T12:30:00"),
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment) {
      setComments((prevComments) => [
        ...prevComments,
        {
          id: comments.length + 1,
          text: newComment,
          user: {
            name: "Hội chữ thập đỏ Việt Nam",
            avatar: images.profile
          },
          likes: 0,
          isLiked: false,
          createdAt: new Date(),
        },
      ]);
      setNewComment("");
    }
  };

  const toggleLike = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  const calculateElapsedTime = (createdAt) => {
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `Khoảng ${days} ngày trước`;
    } else if (hours > 0) {
      return `Khoảng ${hours} giờ trước`;
    } else if (minutes > 0) {
      return `Khoảng ${minutes} phút trước`;
    } else {
      return `Khoảng ${seconds} giây trước`;
    }
  };

  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={navigateGoBack}>
              <Ionicons name="arrow-back" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.header}>{comments.length} Bình luận</Text>
          </View>

          <FlatList
              showsVerticalScrollIndicator={false}
              data={comments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                  <View style={styles.commentContainer}>
                    <View>
                      <View style={styles.userInfo}>
                        <Image source={item.user.avatar} style={styles.avatar} />
                        <Text style={styles.userName}>{item.user.name}</Text>
                      </View>
                      <Text style={styles.commentText}>{item.text}</Text>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: "60%", overflow: "hidden" }}>
                          <Text>{calculateElapsedTime(item.createdAt)}</Text>
                        </View>
                        <View style={{ width: "40%", overflow: "hidden" }}>
                          <Text style={{ fontWeight: "500" }}>
                            {item.likes} lượt thích
                          </Text>
                        </View>
                      </View>
                    </View>
                    {
                        userToken && (
                            <View style={styles.likeContainer}>
                              <TouchableOpacity onPress={() => toggleLike(item.id)}>
                                <FontAwesome
                                    name={item.isLiked ? "heart" : "heart-o"}
                                    size={24}
                                    color={item.isLiked ? "red" : "#000"}
                                />
                              </TouchableOpacity>
                            </View>
                        )
                    }
                  </View>
              )}
          />

          {
              userToken && (
                  <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a comment"
                        value={newComment}
                        onChangeText={(text) => setNewComment(text)}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={addComment}>
                      <FontAwesome name="send" size={24} color="#fff" />
                    </TouchableOpacity>
                  </View>
              )
          }
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60
  },
  header: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 30,
  },
  commentContainer: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
  },
  commentText: {
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#4caf50",
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  likeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto", // Đặt marginLeft thành "auto" để nút thả tim nằm gần bên phải
  },
});

export default CommentScreen;
