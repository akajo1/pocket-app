import { height, sign } from "@/src/lib/constants";
import { childrenStyle } from "@/src/lib/styles/childrenStyle";
import moment from "moment";
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";

type Props = {
  isShown: boolean;
  handleHidemodal: (e: boolean) => void;
};

const CreateChildWallet = ({ isShown, handleHidemodal }: Props) => {
  const [form, setForm] = useState({
    fullname: "",
    age: 0,
    amount: 0,
  });
  const defaultStyles = useDefaultStyles();
  const [isShownAge, setIsShownAge] = useState(false);

  const createChildWallet = () => {
    if (form.fullname && form.age && form.amount) {
      // Logique de création du wallet enfant
      handleHidemodal(false);
    }
  };
  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <Modal visible={isShown} animationType="slide" transparent={true}>
      <View style={childrenStyle.modalOverlay}>
        <View style={childrenStyle.modalContent}>
          <Text style={childrenStyle.modalTitle}>Créer un dépendant</Text>

          <View style={childrenStyle.inputContainer}>
            <Text style={childrenStyle.inputLabel}>Nom complet</Text>
            <TextInput
              style={childrenStyle.textInput}
              value={form.fullname}
              onChangeText={(value) => handleChange("fullname", value)}
              placeholder="Entrez le nom"
            />
          </View>

          <View style={childrenStyle.inputContainer}>
            <Text style={childrenStyle.inputLabel}>date de naissance</Text>
            <TouchableOpacity onPress={() => setIsShownAge(true)}>
              <Text style={childrenStyle.textInput}>
                {form.age
                  ? moment(form.age).format("DD/MM/YYYY")
                  : "Sélectionner une date"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={childrenStyle.inputContainer}>
            <Text style={childrenStyle.inputLabel}>
              Montant initial ({sign})
            </Text>
            <TextInput
              style={childrenStyle.textInput}
              value={form.amount.toString()}
              onChangeText={(value) => handleChange("amount", value)}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>

          <View style={childrenStyle.modalButtons}>
            <TouchableOpacity
              style={childrenStyle.cancelButton}
              onPress={() => handleHidemodal(false)}
            >
              <Text style={childrenStyle.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={childrenStyle.createButton}
              onPress={createChildWallet}
            >
              <Text style={childrenStyle.createButtonText}>Créer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        visible={isShownAge}
        animationType="fade"
        style={{ height: height / 1.5 }}
        transparent
      >
        <View
          style={{
            backgroundColor: "#00000098",
            borderRadius: 10,
            padding: 16,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DateTimePicker
            mode="single"
            locale="fr-FR"
            date={form.age}
            onChange={({ date }) => {
              handleChange("age", date);
              setIsShownAge(false);
            }}
            styles={defaultStyles}
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 10,
            }}
          />
        </View>
      </Modal>
    </Modal>
  );
};

export default CreateChildWallet;
