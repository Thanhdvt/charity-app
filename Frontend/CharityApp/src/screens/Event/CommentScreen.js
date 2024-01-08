import React, {useContext, useEffect, useState} from "react";
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {Ionicons,} from "@expo/vector-icons";
import {COLORS, images} from "../../../src/constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../context/AuthContext";
import {getCommentByEventId} from "../../services/Comment/event/GetCommentByEventId";
import {getOrganizationById} from "../../services/CharityOrganization/{id}/GetOrganizationById";
import {getUserById} from "../../services/User/{id}/GetUserById";
import {createComment} from "../../services/Comment/CreateComment";

const CommentScreen = ({route}) => {
  const {userToken, userInfo} = useContext(AuthContext);
  const eventId = route.params.eventId;
  console.log(eventId)
  const navigation = useNavigation();
  const navigateGoBack = () => {
    navigation.goBack();
  };

  const comment = {
      id: 1,
      text: "Bài đăng ý nghĩa!",
      user: { name: "Thành", avatar: images.avatar_1 },
      likes: 0,
      isLiked: false,
      createdAt: new Date("2023-11-23T24:00:00"),
  }

  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    console.log(new Date())
    const fetchData = async () => {
      try {
        const res = await getCommentByEventId(eventId);
        const updatedList = await Promise.all(
            res.data.map(async (item) => {
              try {
                const userResponse = await getUserById(item.user_Id)
                const { image, name, email } = userResponse.data;
                return { ...item, image, name, email };
              } catch (error) {
                console.error('Error fetching user data', error);
                return item;
              }
            })
        );
        setComments(updatedList);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const addComment = () => {
    if (newComment) {
      setComments((prevComments) => [
        ...prevComments,
        {
          id: comments.length + 1,
          text: newComment,
          name: userInfo.name,
          image: userInfo.image,
          likes: 0,
          isLiked: false,
          time: new Date(),
        },
      ]);
      setNewComment("");
    }
    addNewComment()
  };

  const addNewComment = async () => {
    try {
      const comment = {
        event_Id: eventId,
        text: newComment,
        video: "<string>",
        time: new Date(),
        status: 2,
        picture: "<string>",
      }
      const res = await createComment(userToken, comment);
    } catch (e) {
      console.log(e);
    }
  }

  const toggleLike = () => {

  };


  const calculateElapsedTime = (time) => {
    const createdAt = new Date(time);
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
                        <Image source={item.image ? {uri: item.image} : images.avatar_default} style={styles.avatar} />
                        <Text style={styles.userName}>{item.name}</Text>
                      </View>
                      <Text style={styles.commentText}>{item.text}</Text>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ width: "60%", overflow: "hidden" }}>
                          <Text>{calculateElapsedTime(item?.time)}</Text>
                        </View>
                        <View style={{ width: "40%", overflow: "hidden" }}>
                          <Text style={{ fontWeight: "500" }}>
                            {comment.likes} lượt thích
                          </Text>
                        </View>
                      </View>
                    </View>
                    {
                        userToken && (
                            <View style={styles.likeContainer}>
                              <TouchableOpacity onPress={() => toggleLike()}>
                                <FontAwesome
                                    name={comment?.isLiked ? "heart" : "heart-o"}
                                    size={24}
                                    color={comment?.isLiked ? "red" : "#000"}
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
