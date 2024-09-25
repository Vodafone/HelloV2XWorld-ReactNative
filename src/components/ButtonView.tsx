import { Text, TouchableOpacity } from "react-native";
import React from "react";

export class ButtonView extends React.Component<{ label: string, enabled: boolean, onPress: () => void }> {
  render() {
    let { label, enabled, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={{
        backgroundColor: (enabled) ? '#fffffff0' : '#ffffff50',
        borderRadius: 25,
      }}>
        <Text style={{
          paddingVertical: 12,
          paddingHorizontal: 2,
          height: 45,
          width: 130,
          fontSize: 16,
          color: "#000000",
          textAlign: "center",
          textAlignVertical: "center"
        }}>{label}</Text>
      </TouchableOpacity>
    );
  }
}
