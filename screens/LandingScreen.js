import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
// Added Ionicons import for the eye icon
import { Ionicons } from "@expo/vector-icons"; 

const SCREEN_HEIGHT = Dimensions.get("window").height;
const HEADER_HEIGHT = 0; // Yellow part shrinks to 0

export default function CombinedLandingAuthScreen({ navigation }) {
  // Screen State
  const [isLanding, setIsLanding] = useState(true);
  const [formMounted, setFormMounted] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Added states for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Animation Values
  const headerHeight = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const headerContentOpacity = useRef(new Animated.Value(1)).current;
  const logoSize = useRef(new Animated.Value(200)).current;
  const taglineOpacity = useRef(new Animated.Value(1)).current;
  const borderRadius = useRef(new Animated.Value(0)).current;

  const authTitleOpacity = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(30)).current;

  // Signup fields animation values
  const signupFade = useRef(new Animated.Value(0)).current;
  const signupSlide = useRef(new Animated.Value(20)).current;

  // Initial Landing Entrance Animation (Slower, softer spring)
  useEffect(() => {
    if (isLanding) {
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 1200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(logoSize, {
          toValue: 200,
          friction: 10,
          tension: 25,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, []);

  // Transition: Landing -> Auth (Smoother, cascading timings)
  const handleGetStarted = () => {
    setFormMounted(true);

    Animated.parallel([
      Animated.timing(headerHeight, {
        toValue: HEADER_HEIGHT,
        duration: 1400,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
        useNativeDriver: false,
      }),
      Animated.timing(borderRadius, {
        toValue: 40,
        duration: 1400,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
        useNativeDriver: false,
      }),
      Animated.timing(headerContentOpacity, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(logoSize, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(authTitleOpacity, {
        toValue: 1,
        duration: 800,
        delay: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 800,
        delay: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(formTranslateY, {
        toValue: 0,
        duration: 800,
        delay: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsLanding(false);
    });
  };

  // Handle Animation when switching Sign in / Sign up
  useEffect(() => {
    if (!isLanding) {
      if (isSignup) {
        Animated.parallel([
          Animated.timing(signupFade, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(signupSlide, {
            toValue: 0,
            duration: 600,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(signupFade, {
            toValue: 0,
            duration: 400,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(signupSlide, {
            toValue: 20,
            duration: 400,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  }, [isSignup]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (isSignup) {
      if (!formData.username.trim()) newErrors.username = "Username is required";
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      else if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      if (!agreedToTerms) {
        Alert.alert("Terms Required", "Please agree to the terms and conditions");
        return false;
      }
    }
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = () => {
    if (validateForm()) {
      console.log(isSignup ? "Sign up submitted" : "Sign in submitted", formData);
      navigation.navigate("BriefIntro");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Animated Header Section */}
          <Animated.View
            style={[
              styles.header,
              {
                height: headerHeight,
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius,
              },
            ]}
          >
            <Animated.View
              style={{
                opacity: headerContentOpacity,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.Image
                source={require("../assets/janjaruka-icon.png")}
                style={[styles.logoImage, { width: logoSize, height: logoSize }]}
                resizeMode="contain"
              />
              <Text style={styles.logoText}>JANJARUKA</Text>
              <Animated.Text
                style={[styles.taglineText, { opacity: taglineOpacity }]}
              >
                Your Journey Starts Here
              </Animated.Text>

              {isLanding && (
                <Animated.View
                  style={{
                    opacity: taglineOpacity,
                    transform: [{ translateY: formTranslateY }],
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleGetStarted}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.buttonText}>Get Started</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </Animated.View>
          </Animated.View>

          {/* Auth Form Section */}
          {formMounted && (
            <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
              <Animated.Text
                style={[styles.logoTextAuth, { opacity: authTitleOpacity }]}
              >
                JANJARUKA
              </Animated.Text>

              <Animated.View
                style={{
                  opacity: formOpacity,
                  transform: [{ translateY: formTranslateY }],
                }}
                pointerEvents={isLanding ? "none" : "auto"}
              >
                <Text style={styles.formTitle}>
                  {isSignup
                    ? "Create a new account"
                    : "Sign in to your account"}
                </Text>

                {isSignup && (
                  <Animated.View
                    style={{
                      opacity: signupFade,
                      transform: [{ translateY: signupSlide }],
                    }}
                  >
                    <TextInput
                      style={[styles.input, errors.username && styles.inputError]}
                      placeholder="Username"
                      placeholderTextColor="#aab3b6"
                      value={formData.username}
                      onChangeText={(text) =>
                        handleInputChange("username", text)
                      }
                    />
                    {errors.username && (
                      <Text style={styles.errorText}>{errors.username}</Text>
                    )}
                  </Animated.View>
                )}

                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="Email"
                  placeholderTextColor="#aab3b6"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                {/* Password Field with Eye Icon */}
                <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                  <TextInput
                    style={styles.inputWithIcon}
                    placeholder="Password"
                    placeholderTextColor="#aab3b6"
                    secureTextEntry={!showPassword} // Toggles based on state
                    value={formData.password}
                    onChangeText={(text) => handleInputChange("password", text)}
                  />
                  <TouchableOpacity 
                    style={styles.eyeButton} 
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={22} 
                      color="#7f8c8d" 
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {isSignup && (
                  <Animated.View
                    style={{
                      opacity: signupFade,
                      transform: [{ translateY: signupSlide }],
                    }}
                  >
                    {/* Confirm Password Field with Eye Icon */}
                    <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
                      <TextInput
                        style={styles.inputWithIcon}
                        placeholder="Confirm Password"
                        placeholderTextColor="#aab3b6"
                        secureTextEntry={!showConfirmPassword} // Toggles based on state
                        value={formData.confirmPassword}
                        onChangeText={(text) =>
                          handleInputChange("confirmPassword", text)
                        }
                      />
                      <TouchableOpacity 
                        style={styles.eyeButton} 
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        activeOpacity={0.7}
                      >
                        <Ionicons 
                          name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                          size={22} 
                          color="#7f8c8d" 
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.confirmPassword && (
                      <Text style={styles.errorText}>
                        {errors.confirmPassword}
                      </Text>
                    )}

                    <TouchableOpacity
                      style={styles.checkboxRow}
                      onPress={() => setAgreedToTerms(!agreedToTerms)}
                      activeOpacity={0.7}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          agreedToTerms && styles.checkboxChecked,
                        ]}
                      >
                        {agreedToTerms && (
                          <Text style={styles.checkmark}>✓</Text>
                        )}
                      </View>
                      <Text style={styles.checkboxText}>Agree with terms</Text>
                    </TouchableOpacity>
                  </Animated.View>
                )}

                <TouchableOpacity
                  style={[
                    styles.authButton,
                    isSignup &&
                      !agreedToTerms &&
                      styles.disabledButton,
                  ]}
                  onPress={handleAuth}
                  disabled={isSignup && !agreedToTerms}
                  activeOpacity={0.8}
                >
                  <Text style={styles.authButtonText}>
                    {isSignup ? "Sign up" : "Sign in"}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.orText}>or sign up with</Text>

                <View style={styles.socialRow}>
                  <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                    <Image
                      source={require("../assets/google.png")}
                      style={styles.socialIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                    <Image
                      source={require("../assets/x.png")}
                      style={styles.socialIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                    <Image
                      source={require("../assets/facebook.png")}
                      style={styles.socialIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.toggleRow}>
                  <Text style={styles.toggleText}>
                    {isSignup
                      ? "Already have an account? "
                      : "Don't have an account? "}
                  </Text>
                  <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
                    <Text style={styles.toggleLink}>
                      {isSignup ? "Sign in" : "Create a new account"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fbfb",
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "#ffd649",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoImage: {
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "900",
    color: "#003055",
    letterSpacing: 2,
    marginBottom: 4,
  },
  logoTextAuth: {
    fontSize: 28,
    fontWeight: "900",
    color: "#003055",
    letterSpacing: 2,
    marginBottom: 10,
    textAlign: "center",
  },
  taglineText: {
    fontSize: 14,
    color: "#003055",
    opacity: 0.7,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#003055",
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#002140",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  // Normal input (kept for email and username)
  input: {
    height: 55,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    paddingHorizontal: 25,
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
    shadowColor: "#cfd8dc",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "transparent",
  },
  // New container for inputs that have icons inside them (Password fields)
  inputContainer: {
    height: 55,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    paddingHorizontal: 25,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#cfd8dc",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "transparent",
  },
  // Style for the text input that sits inside the inputContainer
  inputWithIcon: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
    paddingVertical: 0, // Removes default padding to center text properly
  },
  // Button wrapping the eye icon
  eyeButton: {
    padding: 10,
    marginLeft: 10, // Space between text and icon
  },
  inputError: {
    borderColor: "#ff6b6b",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 15,
    marginTop: -5,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 5,
    marginLeft: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#17a39a",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#17a39a",
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    top: 1,
  },
  checkboxText: {
    color: "#7f8c8d",
    fontSize: 15,
    fontWeight: "500",
  },
  authButton: {
    backgroundColor: "#ffd649",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#ffd649",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: "#e0e0e0",
    shadowOpacity: 0,
    elevation: 0,
  },
  authButtonText: {
    color: "#2c3e50",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  orText: {
    color: "#95a5a6",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 24,
    fontWeight: "600",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    marginBottom: 30,
  },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#bdc3c7",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  socialIcon: {
    width: 28,
    height: 28,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 30,
  },
  toggleText: {
    color: "#7f8c8d",
    fontSize: 15,
  },
  toggleLink: {
    color: "#17a39a",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 4,
  },
});