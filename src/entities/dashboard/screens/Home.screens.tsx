import images from "@/src/assets/images";
import {Wrapper} from "@/src/shared/components";
import {IconButton, SmartImage} from "@/src/shared/components/atoms";
import {Header, QuickActionsGrid} from "@/src/shared/components/molecules";
import {WalletCarousel} from "@/src/shared/components/organims";
import TransactionDetailModal from "@/src/shared/modals/TransactionDetailModal";
import {pallete} from "@/src/utils/pallete";
import {Bell} from "lucide-react-native";
import React, {useState} from "react";
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet,} from "react-native";
import {useTransactions} from "../hook/useTransaction";
import {useWallet} from "../hook/useWallet";
import {quickActions} from "../services/mocks";
import {useRouter} from "expo-router";
import TransactionsList from "@/src/shared/components/organims/TransactionsList";

const Home = (props: Props) => {
    const {data, isLoading} = useWallet();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const navigation = useRouter()
    const [currentModal, setCurrentModal] = useState<{
        [key: string]: boolean;
    } | null>(null);
    const {data: transactions, isLoading: transactionLoading} = useTransactions({
        walletId: currentIndex.toString(),
        category: "",
        endDate: "",
        limit: 10,
        page: 1,
        type: "",
    });

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
        onPress: () => navigation.navigate(`/${action.key}`),
    }));

    const handleTransactionPress = (transaction: any) => {
        setSelectedTransaction(transaction);
        setCurrentModal({transaction: true});
    };
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
                        icon={<Bell size={24} color={pallete.grey}/>}
                        onPress={() => navigation.navigate("/notifications")}
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

            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                <QuickActionsGrid
                    title="Actions Rapides"
                    actions={quickActionsWithHandlers}
                    currentIndex={currentIndex}
                    isLoading={isLoading}
                />

                <TransactionsList
                    isLoading={isLoading || transactionLoading}
                    title="Transactions Récentes"
                    transactions={transactions?.transactions?.slice(0, 3) || []}
                    onTransactionPress={handleTransactionPress}
                    onViewAll={() => navigation.navigate("/allUserTransactions")}
                />
            </ScrollView>
            <TransactionDetailModal
                visible={currentModal?.transaction ? true : false}
                onClose={() => setCurrentModal(null)}
                transaction={selectedTransaction}
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
