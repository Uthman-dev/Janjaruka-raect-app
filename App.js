import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./screens/LandingScreen";
import AuthScreen from "./screens/AuthScreen";
import BriefIntroScreen from "./screens/BriefIntroScreen";
import LocaleScreen from "./screens/LocaleScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false, // Hides default top bar for custom UI
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="BriefIntro" component={BriefIntroScreen} />
        <Stack.Screen name="Locale" component={LocaleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
