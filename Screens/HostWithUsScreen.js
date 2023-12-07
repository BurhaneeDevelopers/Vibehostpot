import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Location, TicketStar, Wallet1 } from "iconsax-react-native";
import GlobalStyles from "../Styles/GlobalStyles";
import LottieView from "lottie-react-native";

// SVGS
import WalletCoin from "../assets/Illustrations/WalletCoin.svg";
import SectionTitles from "../Components/SectionTitles";

const HostWithUsScreen = ({ navigation }) => {
  const animation = useRef();
  useEffect(() => {
    animation.current?.play();

    // Or set a specific startFrame and endFrame with:
    animation.current?.play(30, 120);
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
      className="h-screen w-screen  items-center justify-center mx-auto"
    >
      <ScrollView className="">
        <View className="pb-20">
          <View className="flex-row w-full items-center p-5">
            <Pressable
              onPress={() => navigation.goBack()}
              className="absolute ml-5"
            >
              <ArrowLeft size="32" color="#f9f9f9" />
            </Pressable>

            <Text
              className="text-3xl text-[#FF26B9] mx-auto"
              style={GlobalStyles.fontSemiBold}
            >
              Host With Us
            </Text>
          </View>

          <View className="relative justify-center items-center w-full flex-row ">
            <Text
              className="text-[#fff]/90 text-sm text-center mx-auto bg-[#101010] px-2.5 z-50"
              style={GlobalStyles.fontMedium}
            >
              The app is a part of beta testing! Stay Tunned!
            </Text>
          </View>

          <View className="p-5">
            <View className="mb-8 justify-center items-center">
              <Image
                className="w-96 h-96"
                source={require("../assets/Illustrations/ComingSoon.png")}
              />
              <Text
                className="text-white text-2xl text-center"
                style={GlobalStyles.fontBold}
              >
                Hold Your Breath! Vibecity will be Unleashed Soon!{" "}
              </Text>
              <Text
                className="text-gray-200 w-80 text-center"
                style={GlobalStyles.fontMedium}
              >
                Explore, Host, and Savor. Your city's hottest events, cafes,
                restaurants, and more – all in one app! Stay tuned for the
                ultimate experience. 🚀✨
              </Text>
            </View>
          </View>

          <View className="p-5">
            <View className="mb-3">
              <SectionTitles title={"Explore Hotspots and Cafe!"} />
            </View>

            <SavedCards />
            <SavedCards />
            <SavedCards />
            <SavedCards />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default HostWithUsScreen;

const SavedCards = () => {
  return (
    <View className="flex-row space-x-3 p-2 bg-[#FF26B9] rounded-xl h-24 my-2">
      <View
        className="overflow-hidden"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.21,
          shadowRadius: 8.19,
          elevation: 32,
        }}
      >
        <Image
          source={require("../assets/Images/Santorini.jpg")}
          className="w-20 h-20 rounded-lg"
        />
      </View>
      <View className="">
        <Text
          className="text-base text-[#101010] w-64"
          style={GlobalStyles.fontBold}
        >
          Dance party at the top of the town - 2022
        </Text>

        <View className="flex-row justify-between items-center">
          <View className="space-x-1 flex-row items-end">
            <Location size="18" color="#101010" variant="Bold" />
            <Text
              className="text-[#101010] text-base"
              style={GlobalStyles.fontMedium}
            >
              Greece
            </Text>
          </View>

          <View className="bg-[#E9FA00] px-5 py-1.5 rounded-lg justify-center items-center">
            <Text
              className="text-base text-[#101010]"
              style={GlobalStyles.fontBold}
            >
              Book
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
