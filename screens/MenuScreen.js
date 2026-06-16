import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Premium Vector Icons

export default function MenuScreen({ navigation }) {
  const menuItems = [
    { id: 1, name: "Notifications", icon: "notifications-outline" },
    { id: 2, name: "Favourites", icon: "star-outline" },
    { id: 3, name: "Settings", icon: "settings-outline" },
    { id: 4, name: "Profile", icon: "person-circle-outline" },
  ];

  const bottomItems = [
    { id: 5, name: "Terms of use", icon: "document-text-outline" },
    { id: 6, name: "About", icon: "information-circle-outline" },
  ];

  // Component for rendering individual list items
  const MenuItem = ({ item, showIcon }) => (
    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.6}
      onPress={() => console.log(`Pressed: ${item.name}`)}
    >
      {showIcon && (
        <View style={styles.iconContainer}>
          <Ionicons name={item.icon} size={24} color="#00B4A0" />
        </View>
      )}
      <Text style={showIcon ? styles.menuText : styles.bottomText}>
        {item.name}
      </Text>
      <Ionicons name="chevron-forward" size={20} color="#CBD5E1" style={{ marginLeft: 'auto' }} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header Area */}
      <View style={styles.header}>
        {/* Premium Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color="#00B4A0" />
        </TouchableOpacity>

        {/* Yellow "MENU" Title as per your design */}
        <View style={styles.titleContainer}>
          <Text style={styles.menuTitle}>MENU</Text>
        </View>

        {/* Spacer to balance the back button visually */}
        <View style={styles.spacer} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Options List */}
        <View style={styles.listSection}>
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} showIcon={true} />
          ))}
        </View>

        {/* Secondary Options List */}
        <View style={styles.bottomSection}>
          {bottomItems.map((item) => (
            <MenuItem key={item.id} item={item} showIcon={true} />
          ))}
        </View>

        <Text style={styles.versionText}>v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  // Header Styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: {
    padding: 4,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFD649", // Yellow Title as per design
    letterSpacing: 2, // Slight spacing for premium feel
    textTransform: "uppercase",
  },
  spacer: {
    width: 36, // Matches width of back button area to keep title centered
  },
  
  // List Styles
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  listSection: {
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
    // Subtle shadow for the main list block
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 32,
  },
  bottomSection: {
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F1F5F9",
  },
  iconContainer: {
    marginRight: 16,
    width: 28, // Fixed width to align text
    alignItems: "center",
  },
  menuText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#334155",
    letterSpacing: 0.2,
  },
  bottomText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748B",
  },
  versionText: {
    textAlign: "center",
    fontSize: 13,
    color: "#CBD5E1",
    marginTop: 40,
    fontWeight: "500",
  },
});