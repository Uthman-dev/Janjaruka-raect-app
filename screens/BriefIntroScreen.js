import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function BriefIntroScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Brief introduction</Text>
        <Text style={styles.text}>
          Janjaruka is your comprehensive guide to understanding and navigating
          local bylaws and regulations.
        </Text>
        <Text style={styles.text}>
          Our app provides clear, accessible information about rules in your
          area, helping you stay informed and compliant.
        </Text>
        <Text style={styles.text}>
          Explore different categories, save your favorite bylaws, and get
          answers to common questions. Make the most of your community by
          understanding the rules that shape it.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Locale")}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  card: {
    backgroundColor: "#ffd649",
    borderRadius: 40,
    padding: 30,
    marginTop: 40,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 36,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#003055",
    marginBottom: 16,
  },
  text: {
    fontSize: 15,
    lineHeight: 26,
    color: "#003055",
    opacity: 0.95,
    marginBottom: 12,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ffd649",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 28,
    elevation: 8,
  },
  buttonText: { color: "#003055", fontSize: 18, fontWeight: "700" },
});
