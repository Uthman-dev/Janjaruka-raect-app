import React, { useState } from "react";
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
} from "react-native";

export default function AuthScreen({ navigation }) {
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = () => {
    // In a real app, you would validate inputs and call an API here
    console.log(isSignup ? "Sign up submitted" : "Sign in submitted");
    navigation.navigate("BriefIntro");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.brandText}>JANJARUKA</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.formTitle}>
              {isSignup ? "Create a new account" : "Sign in to your account"}
            </Text>

            {isSignup && (
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#aab3b6"
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Email or Phone"
              placeholderTextColor="#aab3b6"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aab3b6"
              secureTextEntry
            />

            {isSignup && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#aab3b6"
                  secureTextEntry
                />
                <View style={styles.checkboxRow}>
                  <View style={styles.checkbox} />
                  <Text style={styles.checkboxText}>Agree with terms</Text>
                </View>
              </>
            )}

            <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
              <Text style={styles.authButtonText}>
                {isSignup ? "Sign up" : "Sign in"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or sign up with</Text>
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Text>G</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Text>X</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Text>f</Text>
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
  container: { flex: 1, backgroundColor: "#f7fbfb" },
  scrollContent: { flexGrow: 1 },
  header: {
    backgroundColor: "#ffd649",
    paddingVertical: 40,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: "center",
    marginBottom: 40,
  },
  brandText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#003055",
    letterSpacing: 1,
  },
  card: { paddingHorizontal: 24 },
  formTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#17a39a",
    marginBottom: 28,
    textAlign: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingHorizontal: 20,
    marginBottom: 16,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "#17a39a",
    borderRadius: 4,
  },
  checkboxText: { color: "#7b8b92", fontSize: 14 },
  authButton: {
    backgroundColor: "#ffd649",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#f6cf3a",
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 4,
  },
  authButtonText: { color: "#123", fontSize: 18, fontWeight: "700" },
  orText: {
    color: "#17a39a",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 16,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 24,
  },
  socialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  toggleText: { color: "#7b8b92", fontSize: 14 },
  toggleLink: { color: "#17a39a", fontSize: 14, fontWeight: "700" },
});
