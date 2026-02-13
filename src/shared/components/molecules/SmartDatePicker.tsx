import { height } from "@/src/utils/method";
import { pallete } from "@/src/utils/pallete";
import moment from "moment";
import React, {useState} from "react";
import { Modal, StyleSheet, View } from "react-native";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

type Props = {
  isShown: boolean;
  onChange: (date: DateType) => void;
  value: DateType;
  onCloseModal: () => void;
  typeDate?: "create" | "new"
};

const SmartDatePicker = ({ isShown, onChange, value, onCloseModal, typeDate ="create" }: Props) => {
  const defaultStyles = useDefaultStyles("light");

  return (
    <Modal
      visible={isShown}
      animationType="fade"
      style={styles.modal}
      transparent
      onRequestClose={() => {
        onCloseModal();
      }}
    >
      <View style={styles.containerDatePicker}>
        {
          typeDate === "create" ?  <DateTimePicker
              mode="single"
              locale="fr-FR"
              date={value}
              initialView="year"
              startDate={moment().subtract(18, "years").toDate()}
              endDate={moment().subtract(3, "years").toDate()}
              startYear={moment().subtract(18, "years").year()}
              endYear={moment().subtract(3, "years").year()}
              minDate={moment().subtract(18, "years").toDate()}
              maxDate={moment().subtract(3, "years").toDate()}
              onChange={({ date }) => {
                onChange(date);
              }}
              styles={{
                ...defaultStyles,

              }}
              style={styles.datePicker}
          />:  <DateTimePicker
              mode="single"
              locale="fr-FR"
              date={value}
              initialView="year"
              onChange={({ date }) => {
                onChange(date);
              }}
              styles={defaultStyles}
              style={styles.datePicker}
          />
        }

      </View>
    </Modal>
  );
};

export default SmartDatePicker;

const styles = StyleSheet.create({
  modal: { height: height / 1.5 },
  containerDatePicker: {
    backgroundColor: "#00000098",
    borderRadius: 10,
    padding: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  datePicker: {
    backgroundColor: pallete.white,
    borderRadius: 20,
    padding: 10,
  },
});
