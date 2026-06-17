import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

// The combined file handles Landing, Auth, AND Brief
import IntroScreen from "./screens/Intro"; 
import LocaleScreen from "./screens/LocaleScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import MenuScreen from "./screens/MenuScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* 
            1. Removed Auth and BriefIntro from here completely 
            2. Set animation to "none" so React Navigation stays out of the way
            3. Matched the background color to prevent any white flashes
          */}
          <Stack.Screen 
            name="Landing" 
            component={IntroScreen} 
            options={{ 
              animation: "none",
              cardStyle: { backgroundColor: "#f7fbfb" } 
            }} 
          />
          
          <Stack.Screen name="Locale" component={LocaleScreen} />
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}