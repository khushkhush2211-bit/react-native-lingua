import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 pt-12 pb-8">
      {/* Header with logo and app name */}
      <View className="flex-row items-center gap-2 mb-16">
        <Image
          source={require("@/assets/images/icon.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text className="text-xl font-bold text-primary">lingua</Text>
      </View>

      {/* Main heading */}
      <View className="mb-6">
        <Text className="text-4xl font-bold text-primary">
          Your AI language
        </Text>
        <Text className="text-4xl font-bold text-brand-purple">teacher.</Text>
      </View>

      {/* Subtitle */}
      <Text className="text-base text-secondary mb-12">
        Real conversations, personalized lessons, anytime, anywhere.
      </Text>

      {/* Mascot character section */}
      <View className="flex-1 justify-center items-center">
        {/* Mascot placeholder with speech bubbles */}
        <View className="relative w-64 h-64 justify-center items-center">
          {/* Mascot - will be replaced with actual image */}
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ width: 192, height: 192 }}
          />

          {/* Speech bubbles positioned around mascot */}
          <View className="absolute top-0 left-0">
            <View className="bg-brand-blue px-4 py-2 rounded-2xl">
              <Text className="text-sm font-medium text-white">Hello!</Text>
            </View>
          </View>

          <View className="absolute top-12 right-0">
            <View className="bg-brand-purple px-4 py-2 rounded-2xl">
              <Text className="text-sm font-medium text-white">¡Hola!</Text>
            </View>
          </View>

          <View className="absolute bottom-0 right-0">
            <View className="bg-streak px-4 py-2 rounded-2xl">
              <Text className="text-sm font-medium text-white">你好!</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Get Started button */}
      <TouchableOpacity
        onPress={() => router.push("/")}
        className="bg-brand-purple rounded-3xl py-4 flex-row items-center justify-center gap-2"
      >
        <Text className="text-white text-lg font-semibold">Get Started</Text>
        <Text className="text-white text-xl">›</Text>
      </TouchableOpacity>
    </View>
  );
}
