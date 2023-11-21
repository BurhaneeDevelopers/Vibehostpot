import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import SectionTitles from "./SectionTitles";
import client, { urlFor } from "../sanity";
import { Car, Clock, Heart, Location, Star1 } from "iconsax-react-native";
import HR from "./HR";

const FeaturedRow = ({ id, title, navigation, featuredId, dataType }) => {
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data in that particular category
    const fetchDataInFeaturedCategory = () => {
      setLoading(true);
      try {
        client
          .fetch(
            `*[_type == "featured" && _id == $id]{
                      ...,
                      ${dataType}[] -> {
                        ...,
                        dishes[]->,
                        type-> {
                          name
                      }
                    },
                }[0]
            `,
            { id, dataType }
          )
          .then((data) => {
            setItemData(data?.[dataType]);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataInFeaturedCategory();
  }, []);

  const renderCards = (itemData, FeaturedCards) => {
    return itemData?.map((item) => (
      <FeaturedCards
        key={item?._id}
        id={item?._id}
        image={item?.image}
        rating={item?.rating}
        title={item?.name}
        location={item?.address}
        shortDescription={item?.short_description}
        ownerName={item?.ownerName}
        ownerProfileImage={item?.ownerProfileImage}
        dataType={dataType}
        navigation={navigation}
      />
    ));
  };

  return (
    <View>
      <View className="p-5">
        {/* Featured Title like `Hot Deals Just For You!, Top Picks!` */}
        <SectionTitles title={title} />
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {loading && <ActivityIndicator size="32" color="#E9FA00" />}
        <View className="px-5 flex-row items-center justify-center w-full">
          {featuredId == 4 && renderCards(itemData, ExploreCard)}
          {featuredId == 1 && renderCards(itemData, NearestPickCard)}
          {featuredId == 2 && renderCards(itemData, PopularCafeCards)}
          {featuredId == 3 && renderCards(itemData, RecommendedCard)}
        </View>
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;

const NearestPickCard = ({
  title,
  location,
  image,
  rating,
  shortDescription,
  navigation,
}) => {
  const urlifiedImage = urlFor(image).url();
  return (
    <>
      <Pressable onPress={() => navigation.navigate("CafeDetails")}>
        <View className="w-72 h-72 rounded-[30px] overflow-hidden mx-2 bg-[#262223]">
          <Image
            source={{ uri: urlifiedImage }}
            defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
            className="w-full h-32"
          />

          {/* <View className="absolute bg-[#101010]/30 w-full h-full" /> */}
          <View className="flex-col p-4 w-full space-y-1 z-10">
            <View className="flex-row justify-between items-center">
              {/* Location Name */}
              <Text
                className="text-xl text-[#f9f9f9]"
                style={GlobalStyles.fontBold}
              >
                {title}
              </Text>

              {/* <View className="flex-row justify-between items-center">
                  
                  <View className="flex-row items-center">
                    <Text
                      className="text-[#f9f9f9] text-xl"
                      style={GlobalStyles.fontBold}
                    >
                      $100
                    </Text>
                    <Text
                      className="text-[#f9f9f9]"
                      style={GlobalStyles.fontRegular}
                    >
                      /night
                    </Text>
                  </View>
                </View> */}
            </View>

            {/* Rating  */}
            <View className="flex-row items-center my-2">
              <Star1 size="18" color="#E9FA00" variant="Bold" />
              <Text className="text-[#f9f9f9]" style={GlobalStyles.fontRegular}>
                {rating}
              </Text>
            </View>

            {/* Location  */}
            <View className="flex-row items-start my-2">
              <Location size="18" color="#E9FA00" variant="Bold" />
              <Text
                className="text-base text-[#f9f9f9]"
                style={GlobalStyles.fontRegular}
              >
                {location}
              </Text>
            </View>

            <HR customClass={"bg-[#f9f9f9] mt-3 mb-1"} />

            <View className="">
              <Text
                className="text-gray-400 text-xs"
                numberOfLines={1}
                style={GlobalStyles.fontRegular}
              >
                {shortDescription}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>

      {/* TODO:  */}
    </>
  );
};

const PopularCafeCards = ({
  title,
  location,
  image,
  ownerName,
  ownerProfileImage,
  navigation,
  dataType,
}) => {
  const urlifiedImage = urlFor(image).url();
  const urlifiedProfileImage = urlFor(ownerProfileImage).url();
  return (
    <>
      <View className="w-80 h-80 rounded-[30px] overflow-hidden mx-2 bg-[#262223]">
        <ImageBackground
          source={{ uri: urlifiedImage }}
          defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
          className="w-full h-36"
        >
          {/* Button to Save Card */}
          <Pressable className="bg-[#E9FA00] justify-center items-center w-10 h-10 rounded-xl absolute top-3 right-5">
            <Heart size="24" color="#101010" />
          </Pressable>

          <View className="bg-black/50 justify-center items-center py-1 px-2 absolute top-3 rounded-lg left-5">
            <Text
              className="text-lg text-[#f9f9f9]"
              style={GlobalStyles.fontMedium}
            >
              {dataType}
            </Text>
          </View>

          <View className="bg-[#101010]/50 w-full h-14 absolute bottom-0 justify-center items-center">
            <View className="w-full px-5">
              <View className="flex-row items-center space-x-2">
                <Image
                  source={{ uri: urlifiedProfileImage }}
                  defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
                  className="w-10 h-10 rounded-full"
                />
                <Text
                  className="text-lg text-[#f9f9f9]"
                  style={GlobalStyles.fontMedium}
                >
                  {ownerName}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* <View className="absolute bg-[#101010]/30 w-full h-full" /> */}
        <View className="flex-col p-4 w-full z-10">
          <View className="flex-row justify-between items-center">
            {/* Location Name */}
            <Text
              className="text-2xl text-[#f9f9f9]"
              style={GlobalStyles.fontBold}
            >
              {title}
            </Text>
          </View>

          {/* Time  */}
          <View className="flex-row items-center mt-2 space-x-1">
            <Car size={"18"} color="#FF26B9" variant="Bold" />
            <Text
              className="text-white text-base"
              style={GlobalStyles.fontRegular}
            >
              3Km from you
            </Text>
          </View>

          {/* Location  */}
          <View className="flex-row items-center mt-1 space-x-1">
            <Location size="18" color="#FF26B9" variant="Bold" />
            <Text
              className="text-base text-[#f9f9f9]"
              style={GlobalStyles.fontRegular}
            >
              {location}
            </Text>
          </View>

          {/* Button  */}
          <Pressable
            className="p-2 mt-4 bg-[#E9FA00] active:bg-[#f1ff2f] rounded"
            onPress={() => navigation.navigate("RestaurantDetails")}
          >
            <Text className="text-[#101010] text-center">View Details</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const RecommendedCard = ({ title, location, image, navigation }) => {
  const urlifiedImage = urlFor(image).url();
  return (
    <>
      <View className="w-64 h-64 rounded-[30px] overflow-hidden mx-2 bg-[#262223]">
        <Image
          source={{ uri: urlifiedImage }}
          defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
          className="w-full h-32"
        />

        {/* <View className="absolute bg-[#101010]/30 w-full h-full" /> */}
        <View className="flex-col p-4 w-full space-y-1 mt-3 z-10">
          <View className="flex-row justify-between items-center">
            {/* Location Name */}
            <Text
              className="text-xl text-[#f9f9f9]"
              style={GlobalStyles.fontBold}
            >
              {title}
            </Text>
          </View>

          <View className="">
            <Text
              className="text-gray-400 text-base"
              numberOfLines={2}
              style={GlobalStyles.fontRegular}
            >
              Follows all safety measures for a clean and hygiene food
              experience Lorem ipsum dolor sit amet.
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const ExploreCard = ({ title, rating, image, navigation }) => {
  const urlifiedImage = urlFor(image).url();
  return (
    <View className="bg-white rounded-2xl w-64 h-24 p-2 flex-row space-x-2 mx-2">
      <View
        className="overflow-hidden rounded-xl"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.21,
          shadowRadius: 8.19,
          elevation: 32,
          // backgroundColor: "#0000",
        }}
      >
        <Image
          source={{ uri: urlifiedImage }}
          defaultSource={require("../assets/Images/User/Dummy-Profile.png")}
          className="w-20 h-20"
        />
      </View>

      <View className="space-y-1">
        <Text className="text-[#101010]" style={GlobalStyles.fontSemiBold}>
          {title}
        </Text>

        {/* Rating  */}
        <View className="flex-row items-center space-x-2 my-2">
          <View className="flex-row items-center">
            <Star1 size="18" color="#FF26B9" variant="Bold" />
            <Text className="text-[#101010]" style={GlobalStyles.fontMedium}>
              {rating}
            </Text>
          </View>

          <Text className="text-gray-400 text-center">•</Text>

          <View className="flex-row items-center">
            <Car size="16" color="#FF26B9" variant="Bold" />
            <Text className="text-[#101010]" style={GlobalStyles.fontMedium}>
              10Km
            </Text>
          </View>
        </View>

        <View className="p-1.5 bg-[#E9FA00] rounded-lg">
          <Text className="text-[#101010] text-center">View Details</Text>
        </View>
      </View>
    </View>
  );
};
