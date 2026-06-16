import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function BriefIntroScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Logo at top */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>JANJARUKA</Text>
      </View>

      {/* Main card */}
      <View style={styles.card}>
        <Text style={styles.title}>Brief Introduction</Text>
        
        {/* Broken into logical, readable chunks with nested styling for emphasis */}
        <Text style={styles.text}>
          Welcome to <Text style={styles.highlight}>Janjaruka</Text>, the smartest way to connect, share, and grow your community bylaws.
        </Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.text}>
          We are your go-to platform for creating, managing, and sharing community rules in a simple, engaging way. 
        </Text>
        <Text style={styles.text}>
          We bridge the gap between complex legal language and everyday life—demystifying local regulations to make them accessible and collaborative for leaders, citizens, and organizations alike.
        </Text>
      </View>

      {/* Continue button at bottom (Using Flexbox instead of Absolute Positioning) */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Locale")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Continue</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between", // Pushes logo to top, button to bottom safely
    paddingBottom: 40, // Ensures button doesn't hit the bottom edge/home indicator
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "900",
    color: "#003055",
    letterSpacing: 2,
  },
  card: {
    backgroundColor: "#ffd649",
    borderRadius: 32,
    padding: 28, // Slightly reduced padding to give text more room on small screens
    marginHorizontal: 24,
    shadowColor: "#003055",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#003055",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  text: {
    fontSize: 16,
    lineHeight: 24, // 1.5x font size for optimal readability
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
  buttonContainer: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  button: {
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
    width: "100%", // Makes button nicely span the width with padding
    maxWidth: 320,
  },
  buttonText: {
    color: "#003055", // FIXED: Changed from #fff to dark blue for readability on yellow
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  arrow: {
    color: "#003055", // FIXED: Changed from #fff to dark blue
    fontSize: 26,
    marginLeft: 8,
    fontWeight: "400",
    lineHeight: 26,
  },
});