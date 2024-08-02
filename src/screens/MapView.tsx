import React, { useState, LegacyRef, useRef } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import MapView, { Camera, Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { Colors } from "../utils/Colors.tsx";
import { Strings } from "../utils/Strings.tsx";
import { MapButtonView } from "../components/MapButtonView.tsx";
import { Images } from "../utils/Images.tsx";
import { InitSDK } from "../actions/InitSDK.tsx";
import { GetRecentConnectivityStatus } from "../actions/GetRecentConnectivityStatus.tsx";
import { getStationType } from "../utils/StationType.tsx";

let sdk = new InitSDK();
let getRecentConnectivityStatus = new GetRecentConnectivityStatus();

export function MapScreen({ navigation }: { navigation: any }): React.JSX.Element {

  const map: LegacyRef<MapView> = useRef(null);

  const [sdkInitialized, setSDKInitialized] = useState(false);

  const [connectionStatus, setConnectionStatus] = useState("Connecting ..");

  const [currentLocation, setCurrentLocation] = useState({
    stationId: "",
    stationType: 5,
    speed: 0,
    bearing: 0,
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const [cams, setCAMs] = useState<{
    stationId: string,
    stationType: number,
    speed: number,
    bearing: number,
    latitude: number,
    longitude: number
  }[]>([]);

  if (!sdkInitialized) {
    sdk.run((event) => {
      setCAMs((event.cams.length > 50) ? event.cams.slice(0, 50) : event.cams);
    }, (event) => {
      if (event.latitude != undefined && event.longitude != undefined && event.speed != undefined && event.bearing != undefined) {
        setCurrentLocation({
          stationId: event.stationId,
          stationType: event.stationType,
          latitude: event.latitude,
          longitude: event.longitude,
          speed: (event.speed < 0) ? 0 : event.speed,
          bearing: event.bearing,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        });
        map.current?.animateCamera({ heading: event.bearing, center: { latitude:event.latitude, longitude: event.longitude }});
      }
    }, (event) => {
      setConnectionStatus(event.connectivity);
    });
    setSDKInitialized(true);
  }

  getRecentConnectivityStatus.run((status) => setConnectionStatus(status));

  const StatusTopView = ({}) => {
    return (
      <View style={styles.statusBackgroundView}>
        <Text style={styles.statusTitleText}>{Strings.Status}</Text>
        <Text style={styles.statusValueText}>{connectionStatus}</Text>
      </View>
    );
  };

  const ActionButtonsView = ({}) => {
    return (
      <View style={styles.actionButtonsView}>

        <MapButtonView image={Images.zoomOutIcon} onPress={onZoomOutPress} />

        <MapButtonView image={Images.zoomInIcon} onPress={onZoomInPress} />

        <MapButtonView image={Images.settingsIcon} onPress={() => {
          navigation.push("Settings", { stationType: currentLocation.stationType });
        }} />

      </View>
    );
  };

  const onZoomInPress = () => {
    map?.current?.getCamera().then((cam: Camera) => {
      if (Platform.OS === "android") {
        let camZoom = cam.zoom ?? 0;
        camZoom += 1;
        cam.zoom = camZoom;
      } else {
        let camAltitude = cam.altitude ?? 0;
        if (camAltitude > 100) {
          camAltitude /= 2;
        }
        cam.altitude = camAltitude;
      }
      map?.current?.animateCamera(cam);
    });
  };

  const onZoomOutPress = () => {
    map.current?.getCamera().then((cam: Camera) => {
      if (Platform.OS === "android") {
        let camZoom = cam.zoom ?? 0;
        camZoom -= 1;
        cam.zoom = camZoom;
      } else {
        let camAltitude = cam.altitude ?? 0;
        if (camAltitude < 10000000) {
          camAltitude *= 2;
        }
        cam.altitude = camAltitude;
      }
      map.current?.animateCamera(cam);
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        style={styles.container}
        rotateEnabled={true}
        zoomEnabled={true}
        provider={PROVIDER_DEFAULT}
        showsCompass={false}
        initialCamera={{
          center: {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          },
          pitch: 0,
          heading: currentLocation.bearing,
          altitude: 600,
          zoom: 18,
        }}>

        {
          (currentLocation.stationId != "") ? <Marker
            title={`ITS: StationID=${currentLocation.stationId}`}
            coordinate={currentLocation}
            description={`StationType=${getStationType(currentLocation.stationType).stationType}, Speed:${round(currentLocation.speed)}Km/h, Heading:${round(currentLocation.bearing)} degree`}
            image={Images.currentLocationArrow}
          /> : <View></View>
        }

        {cams.map((marker) => (
          <Marker
            key={marker.stationId}
            title={`CAM: StationID=${marker.stationId}`}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            description={`StationType=${getStationType(marker.stationType).stationType}, Speed=${round(marker.speed)}Km/h, Heading=${round(marker.bearing)} degree`}
            style={{ transform: [{ rotate: `${marker.bearing - currentLocation.bearing}deg` }] }}
            image={Images.camUserArrow}
          />
        ))}

      </MapView>

      <StatusTopView />

      <ActionButtonsView />

    </View>
  );
}

function round(value: number): number {
  return Math.round(value * 100) / 100
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBackgroundView: {
    backgroundColor: Colors.grayColorOpacity50,
    width: 200,
    maxHeight: 100,
    borderRadius: 10,
    justifyContent: "center",
    top: 0,
    right: 0,
    position: "absolute",
    padding: 30
  },
  statusTitleText: {
    color: Colors.blackColor,
    fontSize: 15,
    textAlign: "center"
  },
  statusValueText: {
    color: Colors.blackColor,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  actionButtonsView: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: Colors.transparent,
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    left: 0,
    right: 0
  }
});
