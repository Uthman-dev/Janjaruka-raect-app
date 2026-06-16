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
  LayoutAnimation,
  UIManager,
} from "react-native";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AuthScreen({ navigation }) {
  const [isSignup, setIsSignup] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Animation values for the signup fields
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // Handle Animation when switching modes
  useEffect(() => {
    // Configure layout animation for smooth container resizing
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: "easeInEaseOut", property: "opacity" },
      update: { type: "easeInEaseOut" },
      delete: { type: "easeInEaseOut", property: "opacity" },
    });

    if (isSignup) {
      // Fade in and slide up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Fade out and slide down
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isSignup]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (isSignup) {
      if (!formData.username.trim()) {
        newErrors.username = "Username is required";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (!agreedToTerms) {
        Alert.alert("Terms Required", "Please agree to the terms and conditions");
        return false;
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

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
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.brandText}>JANJARUKA</Text>
          </View>

          {/* Card Section */}
          <View style={styles.card}>
            <Text style={styles.formTitle}>
              {isSignup ? "Create a new account" : "Sign in to your account"}
            </Text>

            {/* Animated Container for Signup Specific Fields */}
            {isSignup && (
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <TextInput
                  style={[styles.input, errors.username && styles.inputError]}
                  placeholder="Username"
                  placeholderTextColor="#aab3b6"
                  value={formData.username}
                  onChangeText={(text) => handleInputChange("username", text)}
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

            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Password"
              placeholderTextColor="#aab3b6"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Animated Container for Confirm Password & Terms */}
            {isSignup && (
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <TextInput
                  style={[
                    styles.input,
                    errors.confirmPassword && styles.inputError,
                  ]}
                  placeholder="Confirm Password"
                  placeholderTextColor="#aab3b6"
                  secureTextEntry
                  value={formData.confirmPassword}
                  onChangeText={(text) =>
                    handleInputChange("confirmPassword", text)
                  }
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
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
                    {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxText}>Agree with terms</Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            <TouchableOpacity
              style={[
                styles.authButton,
                isSignup && !agreedToTerms && styles.disabledButton,
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
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() => console.log("Google sign in")}
                activeOpacity={0.7}
              >
                <Image
                  source={require("../assets/google.png")}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() => console.log("Twitter sign in")}
                activeOpacity={0.7}
              >
                <Image
                  source={require("../assets/x.png")}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialBtn}
                onPress={() => console.log("Facebook sign in")}
                activeOpacity={0.7}
              >
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
          </View>
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
    paddingBottom: 30,
  },
  header: {
    backgroundColor: "#ffd649",
    paddingTop: 60,
    paddingBottom: 50,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    // Add shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  brandText: {
    fontSize: 36,
    fontWeight: "900",
    color: "#003055",
    letterSpacing: 2,
  },
  card: {
    paddingHorizontal: 30,
    marginTop: 10,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 30,
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
    // Enhanced Shadow
    shadowColor: "#cfd8dc",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "transparent",
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
    // Enhanced Button Shadow
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
    // Social Icon Shadow
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
});