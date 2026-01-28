import {Wrapper} from "@/src/shared/components";
import {useWallet} from "@/src/entities/dashboard/hook/useWallet";
import React, {useState} from "react";
import {useTransactions} from "@/src/entities/dashboard/hook/useTransaction";
import {NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from "react-native";
import {Header} from "@/src/shared/components/molecules";
import {IconButton, SmartImage} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import {ChevronLeft} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import {WalletCarousel} from "@/src/shared/components/organims";
import TransactionsList from "@/src/shared/components/organims/TransactionsList";
import TransactionDetailModal from "@/src/shared/modals/TransactionDetailModal";
import {height} from "@/src/utils/method";
import {useRouter} from "expo-router";


export default function AllUserTransactions() {
    const {
        data: walletsData,
        isLoading: walletsLoading,
        refetch: refetchWallets,
    } = useWallet();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const walletId = walletsData?.[currentIndex]?.id;


    const navigation = useRouter()
    const [currentModal, setCurrentModal] = useState<{
        [key: string]: boolean;
    } | null>(null);

    const {
        data: transactions,
        isLoading: transactionLoading,
        refetch: refetchTransactions,
    } = useTransactions({
        walletId,      
        pageSize: 20,
    });

    const handleMomentumScrollEnd = (
        event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const width = event.nativeEvent.layoutMeasurement.width;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
    };

    const handleTransactionPress = (transaction: any) => {
        setSelectedTransaction(transaction);
        setCurrentModal({transaction: true});
    };
    return <Wrapper>
        <Header
            right={
                <SmartImage
                    source={images.Logo}
                    containerStyle={styles.containerLogo}
                />
            }
            left={
                <IconButton
                    icon={<ChevronLeft size={24} color={pallete.grey}/>}
                    onPress={() => navigation.back()}
                    size="medium"
                />
            }
            title="Transactions"
        />
        <WalletCarousel
            wallets={walletsData || []}
            currentIndex={currentIndex}
            handleMomentumScrollEnd={handleMomentumScrollEnd}
        />
        <View style={styles.transactions}>
            <TransactionsList
                isLoading={walletsLoading || transactionLoading}
                title="Toutes les Transactions"
                transactions={transactions || []}
                onTransactionPress={handleTransactionPress}
                showViewAll={false}
            />
        </View>
        <TransactionDetailModal
            visible={currentModal?.transaction ? true : false}
            onClose={() => setCurrentModal(null)}
            transaction={selectedTransaction}
        />
    </Wrapper>
}
const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
        alignSelf: "center",
    },
    transactions: {
        height: height / 1.8
    }
});