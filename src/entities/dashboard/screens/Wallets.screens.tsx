import images from "@/src/assets/images";
import {Wrapper} from "@/src/shared/components";
import {IconButton, SmartImage} from "@/src/shared/components/atoms";
import {GrafView, Header} from "@/src/shared/components/molecules";
import {WalletCarousel} from "@/src/shared/components/organims";
import TransactionDetailModal from "@/src/shared/modals/TransactionDetailModal";
import {pallete} from "@/src/utils/pallete";
import {Bell} from "lucide-react-native";
import React, {useState} from "react";
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet,} from "react-native";
import {useWallet} from "../hook/useWallet";
import {quickActions} from "../services/mocks";
import {useRouter} from "expo-router";
import {useTransactions} from "@/src/entities/dashboard/hook/useTransaction";
import TransactionsList from "@/src/shared/components/organims/TransactionsList";
import {useFocusEffect} from "@react-navigation/native";

const Wallets = () => {
    const {
        data: walletsData,
        isLoading: walletsLoading,
        refetch: refetchWallets,
    } = useWallet();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const navigation = useRouter();
    const [currentModal, setCurrentModal] = useState<{ [key: string]: boolean } | null>(null);

    const wallets = walletsData ?? []; // adapte selon ta structure
    const walletId = wallets?.[currentIndex]?.id;

    const {
        data: transactions,
        isLoading: transactionLoading,
        refetch: refetchTransactions,
    } = useTransactions({
        walletId,       // 👉 plus currentIndex, mais le vrai id
        pageSize: 3,
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


    useFocusEffect(() => {
            refetchWallets();
            if (walletId) {
                refetchTransactions();
            }
        }
    );

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
                wallets={walletsData}
                currentIndex={currentIndex}
                handleMomentumScrollEnd={handleMomentumScrollEnd}
            />

            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                {/*<QuickActionsGrid
                    title="Actions Rapides"
                    actions={quickActionsWithHandlers}
                    currentIndex={currentIndex}
                    isLoading={walletsLoading}
                />*/}
                <GrafView/>

                <TransactionsList
                    isLoading={walletsLoading || transactionLoading}
                    title="Transactions Récentes"
                    transactions={transactions}
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

export default Wallets;

const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
        alignSelf: "center",
    },
});
