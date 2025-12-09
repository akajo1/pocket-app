import {NativeScrollEvent, NativeSyntheticEvent, ScrollView} from "react-native";
import {WalletCarousel} from "@/src/shared/components/organims/index";
import React, {useState} from "react";
import {useWallet} from "@/src/entities/dashboard/hook/useWallet";
import {useRouter} from "expo-router";
import {useTransactions} from "@/src/entities/dashboard/hook/useTransaction";
import {GrafView} from "@/src/shared/components/molecules";
import TransactionDetailModal from "@/src/shared/modals/TransactionDetailModal";
import TransactionsList from "@/src/shared/components/organims/TransactionsList";

export default function ParentTab() {
    const {data} = useWallet();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const navigation = useRouter()
    const [currentModal, setCurrentModal] = useState<{
        [key: string]: boolean;
    } | null>(null);
    const {data: transactions, isLoading: transactionLoading} = useTransactions({
        walletId: currentIndex.toString(),
        type: "",
        dateTo: "",
        pageSize: 10,
        page: 1,
        dateFrom: "",
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

    return <ScrollView showsVerticalScrollIndicator={false}>
        <WalletCarousel
            wallets={data || []}
            currentIndex={currentIndex}
            handleMomentumScrollEnd={handleMomentumScrollEnd}

        />
        <GrafView/>
        <TransactionsList
            title="Transactions Récentes"
            transactions={transactions || []}
            onTransactionPress={handleTransactionPress}
            onViewAll={() => navigation.navigate("/allUserTransactions")}
            isLoading={transactionLoading}
        />
        <TransactionDetailModal
            visible={currentModal?.transaction ? true : false}
            onClose={() => setCurrentModal(null)}
            transaction={selectedTransaction}
        />
    </ScrollView>
}