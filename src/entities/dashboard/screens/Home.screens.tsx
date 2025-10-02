import images from "@/src/assets/images";
import { Wrapper } from "@/src/shared/components";
import { IconButton, SmartImage } from "@/src/shared/components/atoms";
import { Header, QuickActionsGrid } from "@/src/shared/components/molecules";
import { WalletCarousel } from "@/src/shared/components/organims";
import TransactionsList from "@/src/shared/components/organims/TransactionsList";
import { pallete } from "@/src/utils/pallete";
import { Bell } from "lucide-react-native";
import React from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { useWallet } from "../hook/useWallet";
import { quickActions } from "../services/mocks";

type Props = {};

const Home = (props: Props) => {
  const { data } = useWallet();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const width = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const quickActionsWithHandlers = quickActions?.map((action) => ({
    ...action,
    onPress: () => {},
  }));

  return (
    <Wrapper>
      <Header
        left={
          <SmartImage
            source={images.Logo}
            containerStyle={styles.containerLogo}
          />
        }
        right={
          <IconButton
            icon={<Bell size={24} color={pallete.grey} />}
            onPress={() => {}}
            size="medium"
          />
        }
        title="Portemonnaie"
      />
      <WalletCarousel
        wallets={data?.wallets || []}
        currentIndex={currentIndex}
        handleMomentumScrollEnd={handleMomentumScrollEnd}
      />

      <QuickActionsGrid
        title="Actions Rapides"
        actions={quickActionsWithHandlers}
        currentIndex={currentIndex}
      />

      <TransactionsList
        title="Transactions Récentes"
        transactions={[]}
        onTransactionPress={() => {}}
        onViewAll={() => {}}
      />
    </Wrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  containerLogo: {
    width: 40,
    height: 40,
    alignSelf: "center",
  },
});
