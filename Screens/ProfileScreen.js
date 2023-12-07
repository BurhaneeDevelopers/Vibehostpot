import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Setting2, Edit, Location } from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import TabBar from "../Components/TabBar";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Context
import { useContext } from "react";
import { UserDetailsContext } from "../context/UserDetailsContext";

const ProfileScreen = ({ navigation }) => {
  const [post, setPosts] = useState(true);
  const [saved, setSaved] = useState(false);
  const [live, setLive] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [postItem, setPostItem] = useState([]);
  const [postCount, setPostCount] = useState(0);

  UNSPLASH_ACCESS_KEY = "6KEJery9EMaZFtuiQjELpzqV5sgo9vVWqm52b_gKYZ4";

  const fetchPostItem = async (count) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: "resorts", // You can modify the query to match your requirements
            per_page: count, // Specify the number of posts to fetch
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      const images = response.data.results.map((result) => result.urls.regular);
      setPostItem(images);
      setPostCount(count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
    }
  };

  useEffect(() => {
    // Specify the number of posts to fetch (you can use a random number here)
    const randomPostCount = Math.floor(Math.random() * 20) + 1; // Change 10 to your desired max post count
    fetchPostItem(randomPostCount);
  }, []);

  const PostCards = postItem.map((image, index) => ({
    img: { uri: image },
    title: `Hotspot ${index + 1}`,
    location: "Unknown",
    price: "100",
    rating: "4.5",
  }));

  const onRefresh = () => {
    setRefreshing(true);
    getUserEditedData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Display Dummy Random UserName and Name when username not set
  // const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve the Name and UserName from AsyncStorage
    // AsyncStorage.getItem("Name")
    //   .then((storedName) => {
    //     if (storedName) {
    //       setName(storedName);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error retrieving Name:", error);
    //   });

    AsyncStorage.getItem("UserName")
      .then((storedUserName) => {
        if (storedUserName) {
          setUserName(storedUserName);
        }
      })
      .catch((error) => {
        console.error("Error retrieving UserName:", error);
      });
  }, []);

  // const [editedProfileData, setEditedProfileData] = useState({}); // Initialize as an empty object

  // const getUserEditedData = async () => {
  //   const userEditedData = await AsyncStorage.getItem("userEditedData");

  //   if (userEditedData) {
  //     const parsedUserEditedData = JSON.parse(userEditedData);
  //     setEditedProfileData(parsedUserEditedData);
  //   }
  // };

  // useEffect(() => {
  //   getUserEditedData();
  // }, []);

  // Fetch UserDetails from Context
  const { userDetails } = useContext(UserDetailsContext);
  return (
    <SafeAreaView>
      <View className="bg-[#E9FA00] h-80 rounded-b-[30px]">
        <View className="flex-row justify-between w-full items-center p-5">
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft size="32" color="#101010" />
          </Pressable>

          <View className="flex-row items-center space-x-3">
            <Pressable onPress={() => navigation.navigate("ProfileEdit")}>
              <Edit size="32" color="#101010" />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Setting")}>
              <Setting2 size="32" color="#101010" />
            </Pressable>
          </View>
        </View>

        <View className="w-full justify-center items-center">
          <View className="space-y-2 justify-center items-center">
            {userDetails?.profileImage ? (
              <Image
                source={{ uri: userDetails?.profileImage }}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <Image
                source={require("../assets/Illustrations/Avatar.jpg")}
                className="w-24 h-24 rounded-full"
              />
            )}

            {/* {console.log(userDetails.profileImage)} */}

            <Text
              className="text-[#101010] text-xl"
              style={GlobalStyles.fontSemiBold}
            >
              @{userDetails?.userName || userName || "Loading..."}
            </Text>
          </View>

          <View className="flex-row justify-center w-full items-center p-5 space-x-5">
            <View className="flex-col items-center justify-center">
              <Text className="text-lg" style={GlobalStyles.fontBold}>
                {postCount}
              </Text>
              <Text
                className="text-lg text-[#FF26B9]"
                style={GlobalStyles.fontMedium}
              >
                Posts
              </Text>
            </View>

            <View className="flex-col items-center justify-center">
              <Text className="text-lg" style={GlobalStyles.fontBold}>
                252k
              </Text>
              <Text
                className="text-lg text-[#FF26B9]"
                style={GlobalStyles.fontMedium}
              >
                Followers
              </Text>
            </View>

            <View className="flex-col items-center justify-center">
              <Text className="text-lg" style={GlobalStyles.fontBold}>
                149
              </Text>
              <Text
                className="text-lg text-[#FF26B9]"
                style={GlobalStyles.fontMedium}
              >
                Following
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        className=""
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-4 mb-96">
          <TabBar setPosts={setPosts} setLive={setLive} setSaved={setSaved} />

          {post && (
            <>
              {loading && (
                <ActivityIndicator
                  size="32"
                  color="#E9FA00"
                  className="mx-auto my-5"
                />
              )}
              <View className="flex-row justify-center items-center flex-wrap gap-5 my-4 ">
                {PostCards.map((card, index) => (
                  <ImageBackground
                    key={index}
                    source={card.img}
                    className=" w-24 h-24 rounded-xl overflow-hidden"
                  ></ImageBackground>
                ))}
              </View>
            </>
          )}
          {saved && (
            <>
              <View className="my-5">
                {/* <SavedCards />
                <SavedCards />
                <SavedCards />
                <SavedCards /> */}
              </View>
            </>
          )}
          {live && (
            <>
              <Text className="text-white">Live Here</Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;