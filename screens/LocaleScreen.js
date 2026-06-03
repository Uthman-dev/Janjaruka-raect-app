import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const ALL_COUNTIES = [
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Tana River",
  "Lamu",
  "Taita/Taveta",
  "Garissa",
  "Wajir",
  "Mandera",
  "Marsabit",
  "Isiolo",
  "Meru",
  "Tharaka-Nithi",
  "Embu",
  "Kitui",
  "Machakos",
  "Makueni",
  "Nyandarua",
  "Nyeri",
  "Kirinyaga",
  "Murang'a",
  "Kiambu",
  "Turkana",
  "West Pokot",
  "Samburu",
  "Trans Nzoia",
  "Uasin Gishu",
  "Elgeyo/Marakwet",
  "Nandi",
  "Baringo",
  "Laikipia",
  "Nakuru",
  "Narok",
  "Kajiado",
  "Kericho",
  "Bomet",
  "Kakamega",
  "Vihiga",
  "Bungoma",
  "Busia",
  "Siaya",
  "Kisumu",
  "Homa Bay",
  "Migori",
  "Kisii",
  "Nyamira",
  "Nairobi",
];

export default function LocaleScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCounty, setSelectedCounty] = useState(null);

  // Filter logic replaces your DOM innerHTML manipulation
  const filteredCounties = ALL_COUNTIES.filter((county) =>
    county.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.locationItem,
        selectedCounty === item && styles.selectedItem,
      ]}
      onPress={() => setSelectedCounty(item)}
    >
      <Text style={styles.locationIcon}>📍</Text>
      <Text style={styles.locationName}>{item} County</Text>
      {selectedCounty === item && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select your region</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search counties..."
          placeholderTextColor="#88bfb8"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Placeholder for your Color.svg Map */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>[ Map Illustration ]</Text>
      </View>

      <Text style={styles.listTitle}>
        {searchText.length > 0 ? "Matching Counties" : "Previous Locations"}
      </Text>

      <FlatList
        data={filteredCounties}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No matching counties found.</Text>
        }
      />

      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={[styles.selectBtn, !selectedCounty && styles.disabledBtn]}
          disabled={!selectedCounty}
          onPress={() => {
            console.log("Selected region:", selectedCounty);
            alert(`Proceeding with ${selectedCounty}`);
            // navigation.navigate('Home'); // Navigate to main app screen here
          }}
        >
          <Text style={styles.selectBtnText}>Select</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 20, paddingBottom: 10 },
  title: {
    textAlign: "center",
    color: "#17a39a",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
  },
  searchInput: {
    height: 48,
    borderWidth: 2,
    borderColor: "#ffd34a",
    borderRadius: 999,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#06324a",
    shadowColor: "#f6cf3a",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 3,
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  mapText: { color: "#9aaeb0", fontWeight: "600" },
  listTitle: {
    color: "#17a39a",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 8,
  },
  listContainer: { paddingHorizontal: 20, paddingBottom: 100 }, // Padding bottom prevents list from hiding behind fixed button
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  selectedItem: {
    borderColor: "#17a39a",
    borderWidth: 2,
    backgroundColor: "#f0fff8",
    shadowColor: "#17a39a",
    shadowOpacity: 0.2,
  },
  locationIcon: { fontSize: 20, marginRight: 14 },
  locationName: { fontSize: 16, fontWeight: "700", color: "#003055", flex: 1 },
  checkmark: { color: "#0b7f72", fontWeight: "800", fontSize: 18 },
  emptyText: { textAlign: "center", color: "#9aaeb0", marginTop: 20 },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: "center",
    pointerEvents: "box-none",
  },
  selectBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffd649",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 8,
    minWidth: 300,
  },
  disabledBtn: { opacity: 0.5 },
  selectBtnText: { color: "#fff", fontSize: 18, fontWeight: "800" },
  chevron: { color: "rgba(0,0,0,0.12)", fontSize: 24, marginLeft: 8 },
});
