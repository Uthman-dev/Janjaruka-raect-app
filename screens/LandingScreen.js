import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function LandingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logoText}>JANJARUKA</Text>
        <Text style={styles.title}>Welcome to Janja</Text>
        <Text style={styles.subtitle}>
          The smartest way to connect, share, and grow your bylaws. Sign in or
          create an account to continue.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Auth")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffd649" },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 18,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "900",
    color: "#003055",
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#003055",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#003055",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#003055",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
