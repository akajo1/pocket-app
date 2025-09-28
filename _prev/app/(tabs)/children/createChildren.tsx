import WalletCard from "@/src/components/molecules/WalletCard";
import { colors } from "@/src/lib/colors";
import { height, sign } from "@/src/lib/constants";
import { useWallets } from "@/src/lib/hooks/useWallets";
import { childrenStyle } from "@/src/lib/styles/childrenStyle";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";

import moment from "moment";

import {
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import z from "zod";

type Props = {};

const createChildrenValidation = z.object({
  fullname: z
    .string("ce champ est obligatoire")
    .min(2, "le nom  doit contenir au moins 2 caractères")
    .max(100, "le nom  doit contenir entre 2 et 100 caractères"),
  age: z
    .date("Séléctionner l'année de naissance")
    .min(
      moment().subtract(18, "years").toDate(),
      "l'age doit être entre 3 et 18 ans"
    )
    .max(
      moment().subtract(3, "years").toDate(),
      "l'age doit être entre 3 et 18 ans"
    ),
  amount: z
    .number("le montant est obligatoire")
    .min(0.01, "le montant doit être superieur à 0"),
});

export default function createChildren({}: Props) {
  const router = useRouter();
  const { wallets } = useWallets();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isValide, setIsValide] = useState(false);

  const [form, setForm] = useState({
    fullname: "",
    age: 0,
    amount: 0,
  });

  const defaultStyles = useDefaultStyles();
  const [isShownAge, setIsShownAge] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const createChildWallet = async () => {
    // if (form.fullname && form.age && form.amount) {
    //   createChild({
    //     ...form,
    //     initialAmount: form.amount,
    //     age: form.age,
    //     name: form.fullname,
    //   });
    // }

    try {
      setIsValide(false);
      await createChildrenValidation.parse({
        ...form,
        amount: parseFloat(form.amount),
      });
    } catch (error) {
      const errors = error.issues.map((item) => [item.path[0], item.message]);
      setErrors(Object.fromEntries(errors));
      return;
    }
    setIsValide(true);
  };

  useEffect(() => {
    if (isValide) {
      router.navigate({
        pathname: "/confirmationScreen",
        params: {
          form: JSON.stringify(form),
          type: "create-child",
          selectedWalletCurrency: wallets?.currency,
        },
      });
    }
  }, [isValide]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    const issue = { ...errors };
    delete issue[key];
    setErrors(issue);
  };

  return (
    <SafeAreaView
      style={[childrenStyle.container, { backgroundColor: colors.white }]}
    >
      <View style={[childrenStyle.header, { flexDirection: "row-reverse" }]}>
        <Text style={[childrenStyle.headerTitle, { fontSize: 18 }]}>
          Nouveau dependant
        </Text>
        <TouchableOpacity
          style={childrenStyle.addButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={colors.blue} />
        </TouchableOpacity>
      </View>

      <WalletCard
        title="Mon Portemonnaie"
        balance={parseFloat(wallets?.balance?.toString()) || 0.0}
        isBalanceVisible={isBalanceVisible}
        onToggleVisibility={() => setIsBalanceVisible(!isBalanceVisible)}
      />

      <View style={{ padding: 24 }}>
        <View style={childrenStyle.inputContainer}>
          <Text style={childrenStyle.inputLabel}>Nom complet</Text>
          <TextInput
            style={childrenStyle.textInput}
            value={form.fullname}
            onChangeText={(value) => handleChange("fullname", value)}
            placeholder="Entrez le nom"
          />
          <Text style={childrenStyle.errorText}>{errors?.fullname || ""}</Text>
        </View>

        <View style={childrenStyle.inputContainer}>
          <Text style={childrenStyle.inputLabel}>date de naissance</Text>
          <TouchableOpacity
            onPress={() => {
              setIsShownAge(true);
            }}
          >
            <Text style={childrenStyle.textInput}>
              {form.age
                ? moment(form.age).format("DD/MM/YYYY")
                : "Sélectionner une date"}
            </Text>
          </TouchableOpacity>
          <Text style={childrenStyle.errorText}>{errors?.age || ""}</Text>
        </View>

        <View style={childrenStyle.inputContainer}>
          <Text style={childrenStyle.inputLabel}>Montant initial ({sign})</Text>
          <TextInput
            style={childrenStyle.textInput}
            value={form.amount.toString()}
            onChangeText={(value) => handleChange("amount", value)}
            placeholder="0.00"
            keyboardType="numeric"
          />
          <Text style={childrenStyle.errorText}>{errors?.amount || ""}</Text>
        </View>
      </View>
      <View
        style={[
          {
            position: "absolute",
            bottom: 10,
            width: "100%",
            paddingHorizontal: 24,
          },
        ]}
      >
        <TouchableOpacity
          style={[childrenStyle.createButton]}
          onPress={() => createChildWallet()}
        >
          <Text style={childrenStyle.createButtonText}>Créer</Text>
        </TouchableOpacity>
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
            initialView="year"
            startDate={moment().subtract(18, "years").toDate()}
            endDate={moment().subtract(3, "years").toDate()}
            startYear={moment().subtract(18, "years").year()}
            endYear={moment().subtract(3, "years").year()}
            minDate={moment().subtract(18, "years").toDate()}
            maxDate={moment().subtract(3, "years").toDate()}
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
    </SafeAreaView>
  );
}
