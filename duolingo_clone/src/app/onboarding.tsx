import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 pt-12 pb-8">
      {/* Header with logo and app name */}
      <View className="flex-row items-center gap-2 mb-16">
        <View className="w-10 h-10 bg-orange-400 rounded-full" />
        <Text className="text-xl font-bold text-primary">muolingo</Text>
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
      <View className="flex-1 justify-center items-center relative mb-8">
        {/* Speech bubbles */}
        <View className="absolute top-0 left-0">
          <View className="bg-blue-100 px-4 py-2 rounded-2xl">
            <Text className="text-sm font-medium text-gray-700">Hello!</Text>
          </View>
        </View>

        <View className="absolute top-16 right-0">
          <View className="bg-purple-100 px-4 py-2 rounded-2xl">
            <Text className="text-sm font-medium text-brand-purple">¡Hola!</Text>
          </View>
        </View>

        <View className="absolute bottom-12 right-2">
          <View className="bg-orange-50 px-4 py-2 rounded-2xl">
            <Text className="text-sm font-medium text-orange-600">你好!</Text>
          </View>
        </View>

        {/* Mascot placeholder */}
        <View className="w-48 h-48 bg-orange-400 rounded-full justify-center items-center">
          <Text className="text-6xl">🦊</Text>
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
