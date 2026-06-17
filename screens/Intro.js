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
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function IntroScreen({ navigation }) {
  // ─── Phases: 'landing' -> 'auth' -> 'brief' ───
  const [phase, setPhase] = useState("landing");
  const [isSignup, setIsSignup] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // ─── Yellow Box Animation Values ───
  const yellowHeight = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const yellowTop = useRef(new Animated.Value(0)).current;
  const yellowLeft = useRef(new Animated.Value(0)).current;
  const yellowWidth = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const yellowRadius = useRef(new Animated.Value(0)).current;

  // ─── Landing Content ───
  const landingOpacity = useRef(new Animated.Value(0)).current;
  const logoSize = useRef(new Animated.Value(200)).current;

  // ─── Auth Content ───
  const authOpacity = useRef(new Animated.Value(0)).current;
  const authTranslateY = useRef(new Animated.Value(30)).current;
  const signupFade = useRef(new Animated.Value(0)).current;
  const signupSlide = useRef(new Animated.Value(20)).current;

  // ─── Brief Content ───
  const briefLogoOpacity = useRef(new Animated.Value(0)).current;
  const briefLogoTranslateY = useRef(new Animated.Value(-15)).current;
  const briefTextOpacity = useRef(new Animated.Value(0)).current;
  const briefTextTranslateY = useRef(new Animated.Value(25)).current;
  const briefButtonOpacity = useRef(new Animated.Value(0)).current;
  const briefButtonTranslateY = useRef(new Animated.Value(30)).current;

  // ─── 1. Initial Landing Entrance ───
  useEffect(() => {
    if (phase === "landing") {
      Animated.parallel([
        Animated.timing(landingOpacity, {
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

  // ─── 2. Landing -> Auth Transition ───
  const handleGetStarted = () => {
    setIsAnimating(true);
    Animated.parallel([
      // Shrink yellow to 0
      Animated.timing(yellowHeight, {
        toValue: 0,
        duration: 1400,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
        useNativeDriver: false,
      }),
      Animated.timing(yellowRadius, {
        toValue: 40,
        duration: 1400,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
        useNativeDriver: false,
      }),
      // Fade out landing
      Animated.timing(landingOpacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(logoSize, {
        toValue: 0,
        duration: 600,
        useNativeDriver: false,
      }),
      // Fade in auth form
      Animated.timing(authOpacity, {
        toValue: 1,
        duration: 800,
        delay: 600,
        useNativeDriver: true,
      }),
      Animated.timing(authTranslateY, {
        toValue: 0,
        duration: 800,
        delay: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setPhase("auth");
      setIsAnimating(false);
    });
  };

  // ─── 3. Auth -> Brief Transition ───
  const handleAuth = () => {
    if (!validateForm() || isAnimating) return;
    setIsAnimating(true);

    // Target card dimensions
    const CARD_MARGIN = 24;
    const CARD_TOP = SCREEN_HEIGHT * 0.13;
    const CARD_WIDTH = SCREEN_WIDTH - CARD_MARGIN * 2;
    const CARD_HEIGHT = SCREEN_HEIGHT * 0.58;

    // Step 1: Fade out auth form immediately
    Animated.timing(authOpacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

    // Step 2: Sequence (Expand -> Morph)
    Animated.sequence([
      // A: Expand yellow back to full screen (resets position for the morph)
      Animated.parallel([
        Animated.timing(yellowHeight, {
          toValue: SCREEN_HEIGHT,
          duration: 400,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(yellowRadius, {
          toValue: 0,
          duration: 400,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(yellowTop, { toValue: 0, duration: 400, useNativeDriver: false }),
        Animated.timing(yellowLeft, { toValue: 0, duration: 400, useNativeDriver: false }),
        Animated.timing(yellowWidth, { toValue: SCREEN_WIDTH, duration: 400, useNativeDriver: false }),
      ]),
      // B: Morph yellow into the Brief Card
      Animated.parallel([
        Animated.timing(yellowHeight, {
          toValue: CARD_HEIGHT,
          duration: 800,
          easing: Easing.bezier(0.32, 0.72, 0, 1),
          useNativeDriver: false,
        }),
        Animated.timing(yellowTop, {
          toValue: CARD_TOP,
          duration: 800,
          easing: Easing.bezier(0.32, 0.72, 0, 1),
          useNativeDriver: false,
        }),
        Animated.timing(yellowLeft, {
          toValue: CARD_MARGIN,
          duration: 800,
          easing: Easing.bezier(0.32, 0.72, 0, 1),
          useNativeDriver: false,
        }),
        Animated.timing(yellowWidth, {
          toValue: CARD_WIDTH,
          duration: 800,
          easing: Easing.bezier(0.32, 0.72, 0, 1),
          useNativeDriver: false,
        }),
        Animated.timing(yellowRadius, {
          toValue: 32,
          duration: 800,
          easing: Easing.bezier(0.32, 0.72, 0, 1),
          useNativeDriver: false,
        }),
      ]),
    ]).start();

    // Step 3: Swap phase and stagger Brief content in
    setTimeout(() => setPhase("brief"), 400); // Matches Step A duration

    Animated.timing(briefLogoOpacity, {
      toValue: 1,
      duration: 500,
      delay: 450,
      useNativeDriver: true,
    }).start();
    Animated.timing(briefLogoTranslateY, {
      toValue: 0,
      duration: 500,
      delay: 450,
      useNativeDriver: true,
    }).start();

    Animated.timing(briefTextOpacity, {
      toValue: 1,
      duration: 600,
      delay: 700,
      useNativeDriver: true,
    }).start();
    Animated.timing(briefTextTranslateY, {
      toValue: 0,
      duration: 600,
      delay: 700,
      useNativeDriver: true,
    }).start();

    Animated.timing(briefButtonOpacity, {
      toValue: 1,
      duration: 500,
      delay: 900,
      useNativeDriver: true,
    }).start();
    Animated.timing(briefButtonTranslateY, {
      toValue: 0,
      duration: 500,
      delay: 900,
      useNativeDriver: true,
    }).start();
  };

  // ─── Toggle Signup/Signin ───
  useEffect(() => {
    if (phase === "auth") {
      if (isSignup) {
        Animated.parallel([
          Animated.timing(signupFade, { toValue: 1, duration: 600, useNativeDriver: true }),
          Animated.timing(signupSlide, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(signupFade, { toValue: 0, duration: 400, useNativeDriver: true }),
          Animated.timing(signupSlide, { toValue: 20, duration: 400, useNativeDriver: true }),
        ]).start();
      }
    }
  }, [isSignup, phase]);

  // ─── Form Logic ───
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (isSignup) {
      if (!formData.username.trim()) newErrors.username = "Username is required";
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
      if (!agreedToTerms) {
        Alert.alert("Terms Required", "Please agree to the terms and conditions");
        return false;
      }
    }
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, backgroundColor: phase === "brief" ? "#fff" : "#f7fbfb" }}>
          
          {/* ─── THE SINGLE YELLOW VIEW ─── */}
          <Animated.View
            style={[
              styles.yellowBox,
              {
                height: yellowHeight,
                top: yellowTop,
                left: yellowLeft,
                width: yellowWidth,
                borderRadius: yellowRadius,
              },
            ]}
          >
            {/* --- LANDING CONTENT --- */}
            {phase === "landing" && (
              <Animated.View
                style={{
                  opacity: landingOpacity,
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <Animated.Image
                  source={require("../assets/janjaruka-icon.png")}
                  style={[styles.logoImage, { width: logoSize, height: logoSize }]}
                  resizeMode="contain"
                />
                <Text style={styles.logoText}>JANJARUKA</Text>
                <Text style={styles.taglineText}>Your Journey Starts Here</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleGetStarted}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            {/* --- BRIEF TEXT CONTENT --- */}
            {phase === "brief" && (
              <Animated.View
                style={{
                  flex: 1,
                  paddingHorizontal: 28,
                  justifyContent: "center",
                  opacity: briefTextOpacity,
                  transform: [{ translateY: briefTextTranslateY }],
                }}
              >
                <Text style={styles.briefTitle}>Brief Introduction</Text>
                <Text style={styles.briefText}>
                  Welcome to <Text style={styles.highlight}>Janjaruka</Text>, the smartest
                  way to connect, share, and grow your community bylaws.
                </Text>
                <View style={styles.divider} />
                <Text style={styles.briefText}>
                  We are your go-to platform for creating, managing, and sharing
                  community rules in a simple, engaging way.
                </Text>
                <Text style={styles.briefText}>
                  We bridge the gap between complex legal language and everyday
                  life—demystifying local regulations to make them accessible and
                  collaborative for leaders, citizens, and organizations alike.
                </Text>
              </Animated.View>
            )}
          </Animated.View>

          {/* --- BRIEF EXTRAS (Logo & Button) --- */}
          {phase === "brief" && (
            <>
              <Animated.View
                style={[
                  styles.briefLogoContainer,
                  {
                    opacity: briefLogoOpacity,
                    transform: [{ translateY: briefLogoTranslateY }],
                  },
                ]}
              >
                <Text style={styles.logoText}>JANJARUKA</Text>
              </Animated.View>

              <Animated.View
                style={[
                  styles.briefButtonContainer,
                  {
                    opacity: briefButtonOpacity,
                    transform: [{ translateY: briefButtonTranslateY }],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.briefButton}
                  onPress={() => navigation.navigate("Locale")}
                  activeOpacity={0.8}
                >
                  <Text style={styles.briefButtonText}>Continue</Text>
                  <Text style={styles.briefArrow}>›</Text>
                </TouchableOpacity>
              </Animated.View>
            </>
          )}

          {/* --- AUTH FORM --- */}
          {phase === "auth" && (
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Spacer pushes form below the (now 0 height) yellow box */}
              <Animated.View style={{ height: yellowHeight }} />

              <View style={{ paddingHorizontal: 30, marginTop: 20, paddingBottom: 40 }}>
                <Animated.Text style={[styles.logoTextAuth, { opacity: authOpacity }]}>
                  JANJARUKA
                </Animated.Text>

                <Animated.View
                  style={{
                    opacity: authOpacity,
                    transform: [{ translateY: authTranslateY }],
                  }}
                  pointerEvents={isAnimating ? "none" : "auto"}
                >
                  <Text style={styles.formTitle}>
                    {isSignup ? "Create a new account" : "Sign in to your account"}
                  </Text>

                  {isSignup && (
                    <Animated.View style={{ opacity: signupFade, transform: [{ translateY: signupSlide }] }}>
                      <TextInput
                        style={[styles.input, errors.username && styles.inputError]}
                        placeholder="Username"
                        placeholderTextColor="#aab3b6"
                        value={formData.username}
                        onChangeText={(text) => handleInputChange("username", text)}
                      />
                      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
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
                  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                  <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                    <TextInput
                      style={styles.inputWithIcon}
                      placeholder="Password"
                      placeholderTextColor="#aab3b6"
                      secureTextEntry={!showPassword}
                      value={formData.password}
                      onChangeText={(text) => handleInputChange("password", text)}
                    />
                    <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
                      <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#7f8c8d" />
                    </TouchableOpacity>
                  </View>
                  {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                  {isSignup && (
                    <Animated.View style={{ opacity: signupFade, transform: [{ translateY: signupSlide }] }}>
                      <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
                        <TextInput
                          style={styles.inputWithIcon}
                          placeholder="Confirm Password"
                          placeholderTextColor="#aab3b6"
                          secureTextEntry={!showConfirmPassword}
                          value={formData.confirmPassword}
                          onChangeText={(text) => handleInputChange("confirmPassword", text)}
                        />
                        <TouchableOpacity style={styles.eyeButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)} activeOpacity={0.7}>
                          <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#7f8c8d" />
                        </TouchableOpacity>
                      </View>
                      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                      <TouchableOpacity style={styles.checkboxRow} onPress={() => setAgreedToTerms(!agreedToTerms)} activeOpacity={0.7}>
                        <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                          {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                        <Text style={styles.checkboxText}>Agree with terms</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  )}

                  <TouchableOpacity
                    style={[styles.authButton, isSignup && !agreedToTerms && styles.disabledButton]}
                    onPress={handleAuth}
                    disabled={(isSignup && !agreedToTerms) || isAnimating}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.authButtonText}>{isSignup ? "Sign up" : "Sign in"}</Text>
                  </TouchableOpacity>

                  <Text style={styles.orText}>or sign up with</Text>

                  <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                      <Image source={require("../assets/google.png")} style={styles.socialIcon} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                      <Image source={require("../assets/x.png")} style={styles.socialIcon} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                      <Image source={require("../assets/facebook.png")} style={styles.socialIcon} resizeMode="contain" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.toggleRow}>
                    <Text style={styles.toggleText}>
                      {isSignup ? "Already have an account? " : "Don't have an account? "}
                    </Text>
                    <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
                      <Text style={styles.toggleLink}>
                        {isSignup ? "Sign in" : "Create a new account"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              </View>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // ─── The Magic Yellow Box ───
  yellowBox: {
    position: "absolute",
    backgroundColor: "#ffd649",
    overflow: "hidden",
    shadowColor: "#003055",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },

  // ─── Landing Styles ───
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

  // ─── Auth Styles ───
  logoTextAuth: {
    fontSize: 28,
    fontWeight: "900",
    color: "#003055",
    letterSpacing: 2,
    marginBottom: 10,
    textAlign: "center",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
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
  inputWithIcon: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 10,
    marginLeft: 10,
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

  // ─── Brief Styles ───
  briefLogoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingTop: 20,
    zIndex: 10,
  },
  briefTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#003055",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  briefText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#003055",
    marginBottom: 16,
    opacity: 0.9,
  },
  highlight: {
    fontWeight: "800",
    opacity: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 48, 85, 0.15)",
    marginVertical: 16,
  },
  briefButtonContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 24,
    zIndex: 10,
  },
  briefButton: {
    backgroundColor: "#ffd649",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 20,
    shadowColor: "#003055",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    width: "100%",
    maxWidth: 320,
  },
  briefButtonText: {
    color: "#003055",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  briefArrow: {
    color: "#003055",
    fontSize: 26,
    marginLeft: 8,
    fontWeight: "400",
    lineHeight: 26,
  },
});