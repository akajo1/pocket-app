import React from "react";
import { FlatList, Modal } from "react-native";
import { SmartText } from "../atoms";

type Props = {
  isShown: boolean;
  data: { label: string; value: string }[];
  onPress: (value: string) => void;
};

const SmartPicker = (props: Props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.isShown}>
      <FlatList
        data={props.data}
        renderItem={({ item }) => (
          <SmartText onPress={() => props.onPress(item.value)}>
            {item.label}
          </SmartText>
        )}
      />
    </Modal>
  );
};

export default SmartPicker;
