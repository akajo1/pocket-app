import { height } from "@/src/lib/constants";
import { useChildren } from "@/src/lib/hooks/useChildren";
import { childDetailStyle } from "@/src/lib/styles/childDetailStyle";
import { QuickAction, Transaction } from "@/src/lib/types";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import TransactionAnalytics from "../../charts/TransactionAnalytics";
import TransactionItem from "../TransactionItem";
import NfcChildSection from "./NfcChildSection";

type Props = {
  selectedChild: number;
  onQuickClick: QuickAction[];
  onNfcShowModal: (value: boolean) => void;
  onPressTransaction: (transaction: Transaction) => void;
};

const ChildDetail = ({
  selectedChild,
  onQuickClick,
  onNfcShowModal,
  onPressTransaction,
}: Props) => {
  const { useChildDetails } = useChildren();
  const { data } = useChildDetails(selectedChild);
  const [isNFCSupported, setIsNFCSupported] = useState<boolean>(false);

  return (
    <View style={{ marginHorizontal: 20 }}>
      <View style={childDetailStyle.detailsHeader}>
        <Text style={childDetailStyle.detailsTitle}>
          Détails - {data?.child.name}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ height: 300 }}
        style={{ height: height / 2 }}
      >
        <View style={childDetailStyle.childDetails}>
          <View style={childDetailStyle.quickActionsGrid3x3}>
            {onQuickClick.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={childDetailStyle.quickActionButton3x3}
                onPress={() => action.onPress()}
              >
                <View
                  style={[
                    childDetailStyle.quickActionIcon3x3,
                    { backgroundColor: action.color + "20" },
                  ]}
                >
                  <action.icon size={20} color={action.color} />
                </View>
                <Text style={childDetailStyle.quickActionLabel3x3}>
                  {action.label}
                </Text>
                {action.label === "NFC" && !isNFCSupported && (
                  <Text style={childDetailStyle.nfcUnavailableText}>
                    Non disponible
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View>
          <TransactionAnalytics transactions={data?.recentTransactions || []} />
        </View>
        <View style={childDetailStyle.childDetails}>
          <View style={childDetailStyle.transactionsSection}>
            <Text style={childDetailStyle.sectionTitle}>
              Transactions récentes
            </Text>
            {data?.recentTransactions.map((transaction, index) => (
              <TransactionItem
                transaction={transaction}
                key={index}
                onPress={() => onPressTransaction(transaction)}
              />
            ))}
          </View>
        </View>
        <View style={childDetailStyle.childDetails}>
          <NfcChildSection
            linkedNFCDevices={data?.nfcDevices}
            currentChild={data?.child.id}
            onNfcModal={onNfcShowModal}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChildDetail;
