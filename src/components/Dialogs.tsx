import { Alert } from "react-native";
import { Strings } from "../utils/Strings.tsx";

export const okAlert = (title: string, message: string) => Alert.alert(title, message, [
  { text: Strings.ok, onPress: () => {} }
]);

export const okCancelAlert = (title: string, message: string, action: () => void) => Alert.alert(title, message, [
  {
    text: Strings.cancel,
    onPress: () => {},
    style: "cancel"
  },
  { text: Strings.ok, onPress: action }
]);
