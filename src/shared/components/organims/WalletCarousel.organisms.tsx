import { Wallet } from "@/src/entities/dashboard/services/walletApi";
import { height } from "@/src/utils/method";
import { pallete } from "@/src/utils/pallete";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { WalletCardItem } from "../molecules";

type Props = {
  wallets: Wallet[];
  currentIndex: number;
  handleMomentumScrollEnd: (event: any) => void;
};

const WalletCarousel = ({
  wallets,
  currentIndex,
  handleMomentumScrollEnd,
}: Props) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(false);

  if (!wallets.length) return null;
  return (
    <View style={styles.containerFluid}>
      <FlatList
        data={wallets}
        horizontal
        renderItem={({ item }) => (
          <WalletCardItem
            data={item}
            isBalanceVisible={isBalanceVisible}
            onToggleVisibility={() => setIsBalanceVisible(!isBalanceVisible)}
          />
        )}
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
      <View style={styles.dotContainer}>
        {wallets.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && {
                ...styles.activeDot,
                backgroundColor: index === 0 ? pallete.dollars : pallete.green,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default WalletCarousel;

const styles = StyleSheet.create({
  containerFluid: {
    height: height / 4.2,
  },
  container: {
    flex: 1,
    backgroundColor: pallete.bg,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: pallete.grey,
    marginHorizontal: 4,
    opacity: 0.5,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: pallete.blue, // violet cool
    opacity: 1,
    shadowColor: pallete.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
});
