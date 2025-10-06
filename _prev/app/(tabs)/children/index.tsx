import EmptyChildWalletScreen from "@/_prev/components/molecules/EmptyChildrenWallet";
import { quickActionsChild } from "@/_prev/lib/constants";
import {
  ChildrenCarousel,
  LimitChildModal,
  LoadChildWalletModal,
  UnloadChildWallet,
} from "@/src/components/organisms";

import NFCLinkingModal from "@/src/shared/modals/NFCLinkingModal";
import TransactionDetailModal from "@/src/shared/modals/TransactionDetailModal";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

function ChildrenScreen() {
  const { selectedChildId } = useLocalSearchParams();
  const { children } = useChildren();
  const router = useRouter();
  const [selectedChildIndex, setSelectedChildIndex] = useState(findChildIndex);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [currentModal, setCurrentModal] = useState<{
    [key: string]: boolean;
  } | null>(null);

  function findChildIndex() {
    if (selectedChildId) {
      const index = children.findIndex(
        (child) => child.id.toString() === selectedChildId
      );
      return index !== -1 ? index : 0;
    }
    return 0;
  }
  const handleCurrentModal = (key: string, value: boolean) => {
    setCurrentModal({ [`${key.toLowerCase()}`]: value });
  };
  const quickActionsWithHandlers = quickActionsChild.map((action) => ({
    ...action,
    onPress: () => {
      setCurrentModal({ [`${action.key.toLowerCase()}`]: true });
    },
  }));

  const onScroll = (event: any) => {
    const slideSize = 320 + 16; // card width + margin
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setSelectedChildIndex(index);
  };

  const displayChildren = () => {
    if (!children?.length)
      return (
        <EmptyChildWalletScreen
          onPress={() => router.navigate("/(tabs)/children/createChildren")}
        />
      );

    return (
      <>
        <ChildrenCarousel
          childrenWallets={children}
          onScroll={onScroll}
          selectedChildIndex={selectedChildIndex}
        />
        <ChildDetail
          selectedChild={children[selectedChildIndex].id}
          onQuickClick={quickActionsWithHandlers}
          onNfcShowModal={(value) => handleCurrentModal("addnfc", value)}
          onPressTransaction={(trans) => {
            setSelectedTransaction(trans);
            handleCurrentModal("transaction", true);
          }}
        />

        <LoadChildWalletModal
          isShown={currentModal?.charger === true ? true : false}
          handleHidemodal={() => handleCurrentModal("charger", false)}
          selectedChildIndex={selectedChildIndex}
        />
        <UnloadChildWallet
          isShown={currentModal?.unload === true ? true : false}
          handleHidemodal={() => handleCurrentModal("unload", false)}
          selectedChildIndex={selectedChildIndex}
        />
        <LimitChildModal
          isShown={currentModal?.limit === true ? true : false}
          selectedChildIndex={selectedChildIndex}
          onCloseModal={() => handleCurrentModal("limit", false)}
        />
        <TransactionDetailModal
          visible={currentModal?.transaction ? true : false}
          onClose={() => setCurrentModal(null)}
          transaction={selectedTransaction}
        />
        <NFCLinkingModal
          visible={currentModal?.addnfc ? true : false}
          onClose={() => handleCurrentModal("addnfc", false)}
          childName={children[selectedChildIndex]?.name || ""}
          childId={children[selectedChildIndex]?.id || 0}
          onLinkSuccess={() => {}}
        />
      </>
    );
  };
  return (
    <SafeAreaView style={childrenStyle.container}>
      <View style={childrenStyle.header}>
        <Text style={childrenStyle.headerTitle}>Mes dépendants</Text>
        <TouchableOpacity
          style={childrenStyle.addButton}
          onPress={() => router.navigate("/(tabs)/children/createChildren")}
        >
          <Plus size={24} color={colors.blue} />
        </TouchableOpacity>
      </View>
      {displayChildren()}
    </SafeAreaView>
  );
}

export default ChildrenScreen;
