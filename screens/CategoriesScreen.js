import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Get window dimensions (Note: In a real app, use useWindowDimensions hook for rotation support)
const { width } = Dimensions.get("window");

// Determine if screen is narrow to switch grid layout
const isSmallScreen = width < 380; 
// Calculate card width dynamically
// If small screen, take full width minus padding. If large, split in 2 minus gaps.
const cardWidth = isSmallScreen ? width - 40 : (width - 50) / 2;

export default function CategoriesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: 1, name: "General", icon: "apps-outline" },
    { id: 2, name: "Hawking", icon: "storefront-outline" },
    { id: 3, name: "Parking", icon: "car-outline" },
    { id: 4, name: "Solid waste", icon: "trash-outline" },
    { id: 5, name: "Public Nuisance", icon: "volume-high-outline" },
    { id: 6, name: "Business Licensing", icon: "briefcase-outline" },
  ];

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#00B4A0" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Categories</Text>

          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Menu")}
          >
            <Ionicons name="menu-outline" size={24} color="#00B4A0" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search categories..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={18} color="#CBD5E1" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Categories Grid */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {filteredCategories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryCard,
                  { width: cardWidth }, // Apply dynamic width here
                ]}
                activeOpacity={0.9}
                onPress={() => console.log(`Selected: ${cat.name}`)}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={cat.icon} size={32} color="#003055" />
                </View>
                {/* Added numberOfLines to prevent ugly text wrapping on small screens */}
                <Text style={styles.categoryName} numberOfLines={2}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {filteredCategories.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color="#CBD5E1" />
              <Text style={styles.emptyText}>No categories found</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#1E293B",
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    // If single column (small screen), center it, otherwise space-between
    justifyContent: isSmallScreen ? "center" : "space-between", 
  },
  categoryCard: {
    // Width is now set dynamically in the component
    backgroundColor: "#FFD649",
    borderRadius: 24,
    marginBottom: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 160, // Ensure consistent height
    shadowColor: "#FFD649",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#003055",
    textAlign: "center",
    lineHeight: 18,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    width: "100%",
  },
  emptyText: {
    fontSize: 16,
    color: "#94A3B8",
    fontWeight: "500",
    marginTop: 12,
  },
});