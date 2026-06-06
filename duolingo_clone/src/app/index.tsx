import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center gap-6">
      <Text className="h1 mt-90 text-center color-lingua-purple">Lingua</Text>
      <TouchableOpacity
        onPress={() => router.push("/onboarding")}
        className="bg-brand-purple px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">View Onboarding</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
