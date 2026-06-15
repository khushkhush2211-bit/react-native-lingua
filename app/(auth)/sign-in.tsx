import { isClerkAPIResponseError, useAuth, useClerk, useSSO, useSignIn } from "@clerk/expo";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import * as Linking from "expo-linking";
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
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";

export default function SignInScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const { setActive } = useClerk();
  const { startSSOFlow } = useSSO();
  const { signIn } = useSignIn();
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

  useEffect(() => {
    if (signIn?.status === "needs_second_factor" && code.length === 0) {
      void signIn.mfa.sendEmailCode();
    }
  }, [code.length, signIn]);

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    try {
      const { createdSessionId, setActive: setSSOActive } = await startSSOFlow({ 
        strategy: "oauth_google",
        redirectUrl: Linking.createURL('/')
      });
      if (createdSessionId && setSSOActive) {
        await setSSOActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Google sign-in failed.");
    }
  };

  const handleAppleSignIn = async () => {
    setErrorMessage(null);
    try {
      const { createdSessionId, setActive: setSSOActive } = await startSSOFlow({ 
        strategy: "oauth_apple",
        redirectUrl: Linking.createURL('/')
      });
      if (createdSessionId && setSSOActive) {
        await setSSOActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Apple sign-in failed.");
    }
  };

  const handleFacebookSignIn = async () => {
    setErrorMessage(null);
    try {
      const { createdSessionId, setActive: setSSOActive } = await startSSOFlow({ 
        strategy: "oauth_facebook",
        redirectUrl: Linking.createURL('/')
      });
      if (createdSessionId && setSSOActive) {
        await setSSOActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Facebook sign-in failed.");
    }
  };

  const handleContinue = async () => {
    if (!signIn) return;

    setErrorMessage(null);

    if (signIn.status === "needs_second_factor") {
      const result = await signIn.mfa.verifyEmailCode({ code });
      if (result.error) {
        setErrorMessage(result.error.errors[0]?.longMessage ?? "Unable to verify code.");
        return;
      }

      if (signIn.status === "complete" && signIn.createdSessionId) {
        await setActive({ session: signIn.createdSessionId });
        router.replace("/");
      }
      return;
    }

    if (signIn.status === "needs_first_factor" || signIn.status === "needs_identifier") {
      if (signIn.status === "needs_identifier") {
        const result = await signIn.create({ identifier: emailAddress.trim() });
        if (result.error) {
          if (
            isClerkAPIResponseError(result.error) &&
            result.error.errors.some((item) => ["form_identifier_not_found", "invitation_account_not_exists"].includes(item.code))
          ) {
            router.replace({ pathname: "/sign-up", params: { email: emailAddress.trim() } });
            return;
          }
          setErrorMessage(result.error.errors[0]?.longMessage ?? "Unable to continue sign in.");
          return;
        }

        return;
      }

      const result = await signIn.password({ password });
      if (result.error) {
        setErrorMessage(result.error.errors[0]?.longMessage ?? "Unable to sign in.");
        return;
      }

      if (signIn.status === "complete" && signIn.createdSessionId) {
        await setActive({ session: signIn.createdSessionId });
        router.replace("/");
      }
    }
  };

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  // MFA verification screen
  if (signIn?.status === "needs_second_factor") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: "center" }}>
        <ScrollView
          style={{ width: maxWidth }}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32, flexGrow: 1, justifyContent: "center", gap: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => {
              setCode("");
              setPassword("");
              setErrorMessage(null);
              void signIn.reset();
            }}
            style={{ width: 40, height: 40, justifyContent: "center" }}
          >
            <Text style={{ fontSize: 28, color: "#0D132B" }}>‹</Text>
          </TouchableOpacity>

          <Text className="font-bold text-primary" style={{ fontSize: 28, lineHeight: 36 }}>
            Verify your account
          </Text>
          <Text className="text-secondary" style={{ fontSize: 15, lineHeight: 22 }}>
            We sent a code to your email address.
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
            onPress={handleContinue}
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
            onPress={() => void signIn.mfa.sendEmailCode()}
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

  // Password entry screen (needs_first_factor)
  if (signIn?.status === "needs_first_factor") {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: "center" }}>
        <ScrollView
          style={{ width: maxWidth }}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <TouchableOpacity
            onPress={() => signIn.reset()}
            style={{ width: 40, height: 40, justifyContent: "center", marginBottom: 8 }}
          >
            <Text style={{ fontSize: 28, color: "#0D132B" }}>‹</Text>
          </TouchableOpacity>

          {/* Heading */}
          <Text className="font-bold text-primary" style={{ fontSize: 28, lineHeight: 36, marginBottom: 4 }}>
            Welcome back
          </Text>
          <Text className="text-secondary" style={{ fontSize: 15, lineHeight: 22, marginBottom: 16 }}>
            Enter your password to continue.
          </Text>

          {/* Mascot — overlaps onto the input */}
          <View className="items-center" style={{ zIndex: 10, marginBottom: -40 }}>
            <Image
              source={images.mascotPeek}
              style={{ width: 200, height: 160 }}
              resizeMode="contain"
            />
          </View>

          {/* Password input */}
          <View style={{
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingTop: 50,
            paddingBottom: 14,
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

          {/* Continue button */}
          <TouchableOpacity
            onPress={handleContinue}
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
            <Text className="text-white font-bold" style={{ fontSize: 18 }}>Continue</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
            <Text style={{ paddingHorizontal: 16, fontSize: 13, color: "#9CA3AF" }}>or continue with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
          </View>

          {/* Social buttons */}
          <View style={{ gap: 12, marginBottom: 24 }}>
            <TouchableOpacity
              onPress={handleGoogleSignIn}
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

            <TouchableOpacity
              onPress={handleFacebookSignIn}
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

            <TouchableOpacity
              onPress={handleAppleSignIn}
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

          {/* Use different email */}
          <View style={{ alignItems: "center", paddingVertical: 16 }}>
            <TouchableOpacity onPress={() => signIn.reset()}>
              <Text className="text-brand-purple font-bold" style={{ fontSize: 15 }}>Use a different email</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Initial email entry screen (needs_identifier)
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
          Welcome back
        </Text>
        <Text className="text-secondary" style={{ fontSize: 15, lineHeight: 22, marginBottom: 16 }}>
          Use your email to continue.
        </Text>

        {/* Mascot — overlaps onto the input */}
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
          marginBottom: 8,
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

        {errorMessage ? (
          <Text style={{ color: "#FF4D4F", fontSize: 13, marginBottom: 8 }}>{errorMessage}</Text>
        ) : null}

        {/* Continue button */}
        <TouchableOpacity
          onPress={handleContinue}
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
          <Text className="text-white font-bold" style={{ fontSize: 18 }}>Continue</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
          <Text style={{ paddingHorizontal: 16, fontSize: 13, color: "#9CA3AF" }}>or continue with</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }} />
        </View>

        {/* Social buttons */}
        <View style={{ gap: 12, marginBottom: 24 }}>
          <TouchableOpacity
            onPress={handleGoogleSignIn}
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

          <TouchableOpacity
            onPress={handleFacebookSignIn}
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

          <TouchableOpacity
            onPress={handleAppleSignIn}
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
          <Link href={{ pathname: "/sign-up", params: { email: emailAddress.trim() } }}>
            <Text className="text-secondary" style={{ fontSize: 15 }}>
              Don't have an account?{" "}
              <Text className="text-brand-purple font-bold">Sign up</Text>
            </Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}