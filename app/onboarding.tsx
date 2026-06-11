import { useAuth } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";

export default function Onboarding() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // Constrain to mobile-like width on web
  const maxWidth = Platform.OS === "web" ? Math.min(screenWidth, 430) : screenWidth;
  const isSmallScreen = screenHeight < 700;

  // Responsive mascot size based on available screen height
  const mascotSize = isSmallScreen ? screenHeight * 0.3 : screenHeight * 0.38;
  const mascotContainerHeight = mascotSize + 60;

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: "center" }}>
      <View
        className="flex-1 pb-8"
        style={{
          width: maxWidth,
          paddingHorizontal: 24,
          paddingTop: isSmallScreen ? 8 : 16,
        }}
      >
        {/* Header with fox logo and app name */}
        <View className="items-center" style={{ marginBottom: isSmallScreen ? 16 : 28 }}>
          <View className="flex-row items-center gap-2">
            <Image
              source={images.mascotLogo}
              style={{ width: 32, height: 32 }}
              resizeMode="contain"
            />
            <Text className="text-h3 font-bold text-primary">lingua</Text>
          </View>
        </View>

        {/* Main heading */}
        <View style={{ marginBottom: 8 }}>
          <Text
            className="font-bold text-primary"
            style={{ fontSize: isSmallScreen ? 28 : 34, lineHeight: isSmallScreen ? 34 : 42 }}
          >
            Your AI language
          </Text>
          <Text
            className="font-bold text-brand-purple"
            style={{ fontSize: isSmallScreen ? 28 : 34, lineHeight: isSmallScreen ? 34 : 42 }}
          >
            teacher.
          </Text>
        </View>

        {/* Subtitle */}
        <Text
          className="text-secondary"
          style={{
            fontSize: isSmallScreen ? 13 : 15,
            lineHeight: isSmallScreen ? 20 : 24,
            marginBottom: isSmallScreen ? 8 : 16,
          }}
        >
          Real conversations, personalized lessons,{"\n"}anytime, anywhere.
        </Text>

        {/* Mascot character section */}
        <View className="flex-1 justify-center items-center">
          <View
            className="relative items-center justify-center"
            style={{ width: maxWidth - 48, height: mascotContainerHeight }}
          >
            {/* Speech bubble - Hello (top left) */}
            <View
              className="absolute"
              style={{ top: 0, left: maxWidth * 0.08, zIndex: 10 }}
            >
              <View
                className="bg-white rounded-2xl"
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Text className="font-semibold text-primary" style={{ fontSize: 14 }}>
                  Hello!
                </Text>
              </View>
              {/* Speech bubble tail */}
              <View
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: 7,
                  borderRightWidth: 7,
                  borderTopWidth: 8,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderTopColor: "#FFFFFF",
                  position: "absolute",
                  bottom: -7,
                  left: 18,
                }}
              />
            </View>

            {/* Speech bubble - ¡Hola! (top right) */}
            <View
              className="absolute"
              style={{ top: mascotContainerHeight * 0.1, right: maxWidth * 0.05, zIndex: 10 }}
            >
              <View
                className="bg-white rounded-2xl"
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Text className="font-semibold text-brand-blue" style={{ fontSize: 14 }}>
                  ¡Hola!
                </Text>
              </View>
              {/* Speech bubble tail */}
              <View
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: 7,
                  borderRightWidth: 7,
                  borderTopWidth: 8,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderTopColor: "#FFFFFF",
                  position: "absolute",
                  bottom: -7,
                  right: 18,
                }}
              />
            </View>

            {/* Fox mascot */}
            <Image
              source={images.mascot}
              style={{
                width: mascotSize,
                height: mascotSize,
                marginTop: mascotContainerHeight * 0.08,
              }}
              resizeMode="contain"
            />

            {/* Speech bubble - 你好! (bottom right) */}
            <View
              className="absolute"
              style={{ bottom: 0, right: maxWidth * 0.1, zIndex: 10 }}
            >
              <View
                className="rounded-2xl"
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: "#FFE8E8",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 6,
                  elevation: 3,
                }}
              >
                <Text className="font-semibold" style={{ fontSize: 14, color: "#FF5A5A" }}>
                  你好!
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Pagination dots */}
        <View
          className="flex-row items-center justify-center"
          style={{ gap: 8, marginBottom: isSmallScreen ? 16 : 24 }}
        >
          <View
            className="rounded-full bg-brand-purple"
            style={{ width: 10, height: 10 }}
          />
          <View
            className="rounded-full"
            style={{ width: 8, height: 8, backgroundColor: "#D1D5DB" }}
          />
          <View
            className="rounded-full"
            style={{ width: 8, height: 8, backgroundColor: "#D1D5DB" }}
          />
          <View
            className="rounded-full"
            style={{ width: 8, height: 8, backgroundColor: "#D1D5DB" }}
          />
        </View>

        {/* Get Started button */}
        <TouchableOpacity
          onPress={() => router.push("/sign-up")}
          className="bg-brand-purple flex-row items-center justify-center"
          style={{
            paddingVertical: 18,
            borderRadius: 20,
            shadowColor: "#6C4EF5",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.35,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          <Text
            className="text-white font-semibold"
            style={{ fontSize: 17, marginRight: 8 }}
          >
            Get Started
          </Text>
          <Text className="text-white" style={{ fontSize: 22 }}>
            ›
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
