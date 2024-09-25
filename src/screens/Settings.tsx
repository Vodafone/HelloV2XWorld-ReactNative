import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../utils/Colors.tsx";
import { Strings } from "../utils/Strings.tsx";
import { Credentials } from "../utils/Credentials.tsx";
import { Dropdown } from "react-native-element-dropdown";
import { StationTypes, getStationType } from "../utils/StationType.tsx";
import { ButtonView } from "../components/ButtonView.tsx";
import { ChangeStationType } from "../actions/ChangeStationType.tsx";

const changeStationType = new ChangeStationType();

export function SettingsScreen({ route, navigation }: { route: any, navigation: any }): React.JSX.Element {

  const { stationType } = route.params;
  const [stationTypeSelection, setStationTypeSelection] = useState<{stationType: string, value: number}>(getStationType(stationType));
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.backgroundView}>

      <Text style={styles.settingsText}>{Strings.settings}</Text>

      <View style={{ flexDirection: "column", gap: 10 }}>

        <View style={styles.section}>
          <Text style={styles.labelText}>{Strings.station_type}</Text>
          <Dropdown
            style={[styles.dropdownMenu, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.menuText}
            selectedTextStyle={styles.menuText}
            itemTextStyle={styles.menuText}
            data={StationTypes}
            labelField="stationType"
            valueField="value"
            value={stationTypeSelection.stationType}
            placeholder={stationTypeSelection.stationType}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setStationTypeSelection(item);
              setIsFocus(false);
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.labelText}>{Strings.application_id}</Text>
          <Text style={styles.valueText}>{Credentials.APPLICATION_ID}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.labelText}>{Strings.application_token}</Text>
          <Text style={styles.valueText}>{Credentials.APPLICATION_TOKEN}</Text>
        </View>

      </View>

      <View style={styles.buttonsSection}>

        <ButtonView label={Strings.cancel} enabled={true} onPress={() => navigation.pop()} />

        <ButtonView label={Strings.apply} enabled={true} onPress={ () => changeStationType.run(stationTypeSelection.value) } />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  backgroundView: {
    flex: 1,
    backgroundColor: Colors.colorPrimaryDark,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30
  },
  settingsText: {
    marginTop: 20,
    color: Colors.whiteColor,
    fontWeight: "bold",
    fontSize: 34
  },
  section: {
    width: "90%",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10
  },
  buttonsSection: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10
  },
  labelText: {
    width: "25%",
    color: Colors.whiteColor,
    fontSize: 18
  },
  valueText: {
    width: "65%",
    height: 30,
    borderRadius: 5,
    padding: 5,
    backgroundColor: Colors.whiteColor,
    alignSelf: "flex-end",
    color: Colors.blackColor,
    fontSize: 16,
    overflow: "hidden"
  },
  dropdownMenu: {
    width: "65%",
    height: 30,
    padding: 5,
    backgroundColor: Colors.whiteColor,
    borderRadius: 5,
    alignSelf: "flex-end",
    color: Colors.blackColor,
    fontWeight: "bold",
    fontSize: 16
  },
  menuText: {
    color: Colors.blackColor,
    fontSize: 16
  }
});
