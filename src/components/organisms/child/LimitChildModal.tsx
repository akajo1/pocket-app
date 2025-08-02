import { sign } from "@/src/lib/constants";
import { useChildren } from "@/src/lib/hooks/useChildren";
import { childrenStyle } from "@/src/lib/styles/childrenStyle";
import React from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  isShown: boolean;
  selectedChildIndex: number;
  onCloseModal: Function;
};

const LimitChildModal = ({
  isShown,
  selectedChildIndex,
  onCloseModal,
}: Props) => {
  const { children } = useChildren();
  return (
    <Modal visible={isShown} animationType="slide" transparent={true}>
      <View style={childrenStyle.modalOverlay}>
        <View style={childrenStyle.modalContent}>
          <Text style={childrenStyle.modalTitle}>
            Gérer les limites - {children[selectedChildIndex]?.name}
          </Text>

          <View style={childrenStyle.inputContainer}>
            <Text style={childrenStyle.inputLabel}>
              Limite hebdomadaire ({sign})
            </Text>
            <TextInput
              style={childrenStyle.textInput}
              defaultValue={children[
                selectedChildIndex
              ]?.weeklyLimit.toString()}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>

          <View style={childrenStyle.inputContainer}>
            <Text style={childrenStyle.inputLabel}>
              Limite quotidienne ({sign})
            </Text>
            <TextInput
              style={childrenStyle.textInput}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>

          <View style={childrenStyle.limitOptions}>
            <Text style={childrenStyle.optionLabel}>Catégories autorisées</Text>
            {["Alimentation", "Éducation", "Loisirs", "Transport"].map(
              (category) => (
                <TouchableOpacity
                  key={category}
                  style={childrenStyle.categoryOption}
                >
                  <Text style={childrenStyle.categoryOptionText}>
                    {category}
                  </Text>
                  <View style={childrenStyle.checkbox} />
                </TouchableOpacity>
              )
            )}
          </View>

          <View style={childrenStyle.modalButtons}>
            <TouchableOpacity
              style={childrenStyle.cancelButton}
              onPress={() => onCloseModal(false)}
            >
              <Text style={childrenStyle.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={childrenStyle.createButton}
              onPress={() => onCloseModal(false)}
            >
              <Text style={childrenStyle.createButtonText}>Sauvegarder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LimitChildModal;
