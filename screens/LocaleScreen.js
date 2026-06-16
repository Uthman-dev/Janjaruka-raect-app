import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
// Import Ionicons for premium, vector-based icons
import Ionicons from "react-native-vector-icons/Ionicons";

const ALL_COUNTIES = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita/Taveta",
  "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru",
  "Tharaka-Nithi", "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua",
  "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot",
  "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo/Marakwet", "Nandi",
  "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado", "Kericho",
  "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu",
  "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi",
];

const PREVIOUS_LOCATIONS = ["Embu", "Nairobi", "Kiambu"];

const normalize = (s) => {
  return (s || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[()'`,.\/\-]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
};

export default function LocaleScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCounty, setSelectedCounty] = useState(null);

  const isSearching = searchText.length > 0;
  const sourceList = isSearching ? ALL_COUNTIES : PREVIOUS_LOCATIONS;

  const filteredCounties = sourceList.filter((county) =>
    normalize(county).includes(normalize(searchText)),
  );

  const renderItem = ({ item }) => {
    const isSelected = selectedCounty === item;
    const shouldFade = !isSearching && !PREVIOUS_LOCATIONS.includes(item);

    return (
      <TouchableOpacity
        style={[
          styles.locationItem,
          isSelected && styles.selectedItem,
          shouldFade && styles.fadedItem,
        ]}
        onPress={() => setSelectedCounty(item)}
        activeOpacity={0.8}
      >
        {/* PREMIUM LOCATION ICON */}
        <Ionicons
          name="location-outline"
          size={22}
          color={isSelected ? "#16BBB3" : "#8E9A9F"}
          style={{ marginRight: 14 }}
        />

        <Text style={[styles.locationName, shouldFade && styles.fadedText]}>
          {item} County
        </Text>

        {/* PREMIUM CHECK ICON */}
        {isSelected && (
          <Ionicons name="checkmark-circle" size={22} color="#16BBB3" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select your region</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search a region"
            placeholderTextColor="#A0AAB5"
            value={searchText}
            onChangeText={setSearchText}
          />
          <View style={styles.searchIconContainer}>
            {/* PREMIUM SEARCH ICON */}
            <Ionicons name="search-outline" size={22} color="#A0AAB5" />
          </View>
        </View>
      </View>

      {/* Map – disappears completely when searching */}
      {!isSearching && (
        <View style={styles.mapContainer}>
          <Image
            source={require("../assets/kenyan-map.png")}
            style={styles.mapImage}
            resizeMode="contain"
            onError={() => console.log("Map image failed to load")}
          />
        </View>
      )}

      {!isSearching && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Previous Locations</Text>
        </View>
      )}

      <FlatList
        data={filteredCounties}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No matching regions found.</Text>
        }
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.selectButton,
            !selectedCounty && styles.disabledButton,
          ]}
          disabled={!selectedCounty}
          onPress={() => {
            console.log("Selected County:", selectedCounty);
            navigation.navigate("Categories");
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.selectButtonText}>Select</Text>
          {/* PREMIUM ARROW ICON */}
          <Ionicons name="arrow-forward" size={24} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    textAlign: "center",
    color: "#16BBB3",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.3,
    marginBottom: 20,
  },
  searchContainer: {
    position: "relative",
  },
  searchInput: {
    height: 52,
    backgroundColor: "#F5F7FA",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingRight: 52,
    fontSize: 16,
    color: "#1A2C3E",
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "#E9EDF2",
  },
  searchIconContainer: {
    position: "absolute",
    right: 18,
    top: "50%",
    marginTop: -11, // Adjusted centering for Icon
  },
  // Removed styles.searchIcon, styles.pinIcon, styles.checkIcon, styles.arrowIcon 
  // as we now use the size prop on Ionicons directly.
  
  mapContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  mapImage: {
    width: "100%",
    height: 320,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    color: "#16BBB3",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 4,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  selectedItem: {
    backgroundColor: "#F0FDFA",
    shadowColor: "#16BBB3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#16BBB3",
  },
  fadedItem: {
    opacity: 0.5,
  },
  locationName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2A3E",
  },
  fadedText: {
    color: "#A5B3C4",
  },
  emptyText: {
    textAlign: "center",
    color: "#A5B3C4",
    fontSize: 14,
    marginTop: 40,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 28,
    paddingTop: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F2F5",
  },
  selectButton: {
    backgroundColor: "#FFD64A",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#FFD64A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: "#A5B3C4",
    shadowOpacity: 0,
  },
  selectButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});