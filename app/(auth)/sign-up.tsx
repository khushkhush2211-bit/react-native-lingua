import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import * as Linking from "expo-linking";
import { useAuth, useClerk, useSSO, useSignUp } from "@clerk/expo";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";

export default function SignUpScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { setActive } = useClerk();
  const { startSSOFlow } = useSSO();
  const { signUp } = useSignUp();
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();
  const { width: screenWidth } = useWindowDimensions();

  const maxWidth = Platform.OS === "web" ? Math.min(screenWidth, 430) : screenWidth;

  const initialEmail = useMemo(() => (typeof params.email === "string" ? params.email : ""), [params.email]);

  const [emailAddress, setEmailAddress] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialEmail) {
      setEmailAddress(initialEmail);
    }
  }, [initialEmail]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleGoogleSignUp = async () => {
    setErrorMessage(null);
    const { createdSessionId, setActive: setSSOActive } = await startSSOFlow({ 
      strategy: "oauth_google",
      redirectUrl: Linking.createURL('/')
    });
    if (createdSessionId && setSSOActive) {
      await setSSOActive({ session: createdSessionId });
      router.replace("/");
    }
  };

  const handleAppleSignUp = async () => {
    setErrorMessage(null);
    const { createdSessionId, setActive: setSSOActive } = await startSSOFlow({ 
      strategy: "oauth_apple",
      redirectUrl: Linking.createURL('/')
    });
    if (createdSessionId && setSSOActive) {
      await setSSOActive({ session: createdSessionId });
      router.replace("/");
    }
  };

  const handleFacebookSignUp = async () => {
    setErrorMessage(null);
    const { createdSessionId, setActive: setSSOActive } = await startSSOFlow({ 
      strategy: "oauth_facebook",
      redirectUrl: Linking.createURL('/')
    });
    if (createdSessionId && setSSOActive) {
      await setSSOActive({ session: createdSessionId });
      router.replace("/");
    }
  };

  const handleCreateAccount = async () => {
    if (!signUp) return;

    setErrorMessage(null);

    const result = await signUp.password({ emailAddress: emailAddress.trim(), password });
    if (result.error) {
      setErrorMessage(result.error.errors[0]?.longMessage ?? "Unable to create your account.");
      return;
    }

    await signUp.verifications.sendEmailCode();
  };

  const handleVerifyCode = async () => {
    if (!signUp) return;

    setErrorMessage(null);

    const result = await signUp.verifications.verifyEmailCode({ code });
    if (result.error) {
      setErrorMessage(result.error.errors[0]?.longMessage ?? "Unable to verify your code.");
      return;
    }

    if (signUp.status === "complete" && signUp.createdSessionId) {
      await setActive({ session: signUp.createdSessionId });
      router.replace("/");
    }
  };

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  // Verification screen
  if (signUp?.status === "missing_requirements" && signUp.unverifiedFields.includes("email_address") && signUp.missingFields.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: "center" }}>
        <ScrollView
          style={{ width: maxWidth }}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32, flexGrow: 1, justifyContent: "center", gap: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={() => {
              setCode("");
              setPassword("");
              setErrorMessage(null);
              void signUp.reset();
            }}
            style={{ width: 40, height: 40, justifyContent: "center" }}
          >
            <Text style={{ fontSize: 24, color: "#0D132B" }}>‹</Text>
          </TouchableOpacity>

          <Text className="font-bold text-primary" style={{ fontSize: 28, lineHeight: 36 }}>
            Verify your email
          </Text>
          <Text className="text-secondary" style={{ fontSize: 15, lineHeight: 22 }}>
            We sent a verification code to {emailAddress}.
          </Text>
          <View style={{
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 14,
          }}>
            <Text style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>Verification code</Text>
            <TextInput
              value={code}
              onChangeText={setCode}
              placeholder="000000"
              keyboardType="number-pad"
              style={{ fontSize: 16, color: "#0D132B", padding: 0 }}
            />
          </View>
          {errorMessage ? <Text style={{ color: "#FF4D4F", fontSize: 13 }}>{errorMessage}</Text> : null}
          <TouchableOpacity
            onPress={handleVerifyCode}
            style={{
              backgroundColor: "#6C4EF5",
              borderRadius: 16,
              paddingVertical: 18,
              alignItems: "center",
              shadowColor: "#6C4EF5",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Text className="text-white font-semibold" style={{ fontSize: 17 }}>Verify Code</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => void signUp.verifications.sendEmailCode()}
            style={{
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 16,
              paddingVertical: 18,
              alignItems: "center",
            }}
          >
            <Text className="font-semibold text-primary" style={{ fontSize: 17 }}>Resend Code</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Main sign-up screen
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: "center" }}>
      <ScrollView
        style={{ width: maxWidth }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.canGoBack() ? router.back() : router.replace("/onboarding")}
          style={{ width: 40, height: 40, justifyContent: "center", marginBottom: 8 }}
        >
          <Text style={{ fontSize: 28, color: "#0D132B" }}>‹</Text>
        </TouchableOpacity>

        {/* Heading */}
        <Text className="font-bold text-primary" style={{ fontSize: 28, lineHeight: 36, marginBottom: 4 }}>
          Create your account
        </Text>
        <Text className="text-secondary" style={{ fontSize: 15, lineHeight: 22, marginBottom: 16 }}>
          Start your language journey today ✨
        </Text>

        {/* Mascot peeking — overlaps onto the email input */}
        <View className="items-center" style={{ zIndex: 10, marginBottom: -40 }}>
          <Image
            source={images.mascotPeek}
            style={{ width: 200, height: 160 }}
            resizeMode="contain"
          />
        </View>

        {/* Email input */}
        <View style={{
          borderWidth: 1,
          borderColor: "#E5E7EB",
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingTop: 50,
          paddingBottom: 14,
          marginBottom: 12,
        }}>
          <Text style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>Email</Text>
          <TextInput
            value={emailAddress}
            onChangeText={setEmailAddress}
            placeholder="alex@gmail.com"
            placeholderTextColor="#B0B8C4"
            autoCapitalize="none"
            keyboardType="email-address"
            style={{ fontSize: 16, color: "#0D132B", padding: 0 }}
          />
        </View>

        {/* Password input */}
        <View style={{
          borderWidth: 1,
          borderColor: "#E5E7EB",
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 14,
          marginBottom: 8,
          flexDirection: "row",
          alignItems: "center",
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#B0B8C4"
              secureTextEntry={!showPassword}
              style={{ fontSize: 16, color: "#0D132B", padding: 0 }}
            />
          </View>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
            <Text style={{ fontSize: 18, color: "#9CA3AF" }}>{showPassword ? "🙈" : "👁"}</Text>
          </TouchableOpacity>
        </View>

        {errorMessage ? (
          <Text style={{ color: "#FF4D4F", fontSize: 13, marginBottom: 8 }}>{errorMessage}</Text>
        ) : null}

        {/* Sign Up button */}
        <TouchableOpacity
          onPress={handleCreateAccount}
          style={{
            backgroundColor: "#6C4EF5",
            borderRadius: 16,
            paddingVertical: 18,
            alignItems: "center",
            marginTop: 16,
            marginBottom: 24,
            shadowColor: "#6C4EF5",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 6,
          }}
        >
          <Text className="text-white font-bold" style={{ fontSize: 18 }}>Sign Up</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
          <Text style={{ paddingHorizontal: 16, fontSize: 13, color: "#9CA3AF" }}>or continue with</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
        </View>

        {/* Social buttons */}
        <View style={{ gap: 12, marginBottom: 24 }}>
          {/* Google */}
          <TouchableOpacity
            onPress={handleGoogleSignUp}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 16,
              paddingVertical: 16,
              gap: 12,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Image source={images.googleLogo} style={{ width: 24, height: 24 }} resizeMode="contain" />
            <Text className="font-semibold text-primary" style={{ fontSize: 16 }}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity
            onPress={handleFacebookSignUp}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 16,
              paddingVertical: 16,
              gap: 12,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Image source={images.facebookLogo} style={{ width: 24, height: 24 }} resizeMode="contain" />
            <Text className="font-semibold text-primary" style={{ fontSize: 16 }}>Continue with Facebook</Text>
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity
            onPress={handleAppleSignUp}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 16,
              paddingVertical: 16,
              gap: 12,
              backgroundColor: "#FFFFFF",
            }}
          >
            <Image source={images.appleLogo} style={{ width: 24, height: 24 }} resizeMode="contain" />
            <Text className="font-semibold text-primary" style={{ fontSize: 16 }}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Footer link */}
        <View style={{ alignItems: "center", paddingVertical: 16 }}>
          <Link href="/sign-in">
            <Text className="text-secondary" style={{ fontSize: 15 }}>
              Already have an account?{" "}
              <Text className="text-brand-purple font-bold">Log in</Text>
            </Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}