import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet, Dimensions, Platform
} from "react-native";
import { Colors } from "../utils/Colors.tsx";
import { Strings } from "../utils/Strings.tsx";
import PDF from "react-native-pdf";
import RNExitApp from "react-native-exit-app";
import { ButtonView } from "../components/ButtonView.tsx";
import { CheckLocationPermission } from "../actions/CheckLocationPermission.tsx";
import { AcceptTermsAndConditions } from "../actions/AcceptTermsAndConditions.tsx";

const locationPermissionChecker = new CheckLocationPermission();

export function SplashScreen({ navigation }: { navigation: any }): React.JSX.Element {

  let [accepted, setAccepted] = useState(false);

  return (
    <View style={styles.backgroundView}>

      <Text style={styles.termsAndConditionsText}>{Strings.terms_and_conditions}</Text>

      <View style={styles.pdfContainer}>
        <PDF
          source={(Platform.OS === "ios") ? require("../assets/terms_and_conditions.pdf") : { uri: "bundle-assets://terms_and_conditions.pdf" }}
          style={styles.pdf} scale={4} enableDoubleTapZoom={false} spacing={0} enableAntialiasing={false} maxScale={4} minScale={4}
          onPageChanged={(page, numberOfPages) => {
            if (page === numberOfPages) { setAccepted(true); }
          }}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 10 }}>

        <ButtonView label={Strings.exit} enabled={true} onPress={() => RNExitApp.exitApp()} />

        <ButtonView label={Strings.accept} enabled={accepted} onPress={async () => {
          if (accepted) {
            let granted = await locationPermissionChecker.run();
            if (granted) {
              await new AcceptTermsAndConditions().run(accepted);
              navigation.replace("Map")
            }
          }
        }} />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: Colors.colorPrimaryDark,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  termsAndConditionsText: {
    marginTop: 20,
    color: Colors.blackColor,
    fontWeight: "bold",
    fontSize: 32
  },
  pdfContainer: {
    flex: 1,
    width: Dimensions.get("window").width * 5 / 6,
    height: "auto",
    margin: 10,
    borderRadius: 15,
    borderColor: "#000000",
    borderWidth: 2
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 13,
    backgroundColor: "#ffffff"
  }
});
