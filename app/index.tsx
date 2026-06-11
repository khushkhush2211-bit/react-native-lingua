import { useAuth, useClerk, useUser } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const { selectedLanguageId } = useUserStore();

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  if (!isSignedIn) {
    // @ts-ignore
    return <Redirect href="/onboarding" />;
  }

  // If the user hasn't selected a language, redirect to the language selection screen
  if (!selectedLanguageId) {
    // @ts-ignore
    return <Redirect href="/language-selection" />;
  }

  return (
    <View className="flex-1 justify-center items-center gap-6 px-6 bg-white">
      <Text className="h1 mt-90 text-center text-brand-purple">Lingua</Text>
      <Text className="text-center text-secondary">
        Signed in as {user?.primaryEmailAddress?.emailAddress ?? user?.fullName ?? "your account"}
      </Text>
      <Text className="text-center text-secondary font-bold">
        Selected Language ID: {selectedLanguageId}
      </Text>
      <TouchableOpacity
        onPress={() => signOut()}
        className="bg-brand-purple px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // @ts-ignore
        onPress={() => router.push("/language-selection")}
        className="px-6 py-3 rounded-lg border border-brand-purple"
      >
        <Text className="text-brand-purple font-semibold">Change Language</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // @ts-ignore
        onPress={() => router.push("/onboarding")}
        className="px-6 py-3 rounded-lg border border-brand-purple mt-2"
      >
        <Text className="text-brand-purple font-semibold">View onboarding</Text>
      </TouchableOpacity>
    </View>
  );
}
