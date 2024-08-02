import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "../screens/Splash";
import { MapScreen } from "../screens/MapView";
import { GetTermsAndConditionsAcceptance } from "../actions/GetTermsAndConditionsAcceptance.tsx";
import { View } from "react-native";
import { SettingsScreen } from "../screens/Settings.tsx";

const Stack = createNativeStackNavigator();

export function Navigator(): React.JSX.Element {

  let [entryPointChecked, setEntryPointChecked] = useState(false);
  let [entryPoint, setEntryPoint] = useState("Splash");

  new GetTermsAndConditionsAcceptance().run().then((accepted) => {
    setEntryPoint((!accepted) ? "Splash" : "Map");
    setEntryPointChecked(true);
  });

  return entryPointChecked ? (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={entryPoint}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false, orientation: "landscape" }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false, orientation: "landscape" }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, orientation: "landscape" }} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <View></View>
  );
}

