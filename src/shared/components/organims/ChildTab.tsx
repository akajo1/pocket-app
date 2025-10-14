import {useRouter} from "expo-router";
import {useChildren} from "@/src/features/children/hook/useChildren";
import React, {useState} from "react";
import {useChildTransactions} from "@/src/features/children/hook/useChildTransactions";
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView} from "react-native";
import {ChildrenCarousel} from "@/src/features/children/components/organisms";
import {GrafView} from "@/src/shared/components/molecules";
import TransactionsList from "@/src/shared/components/organims/TransactionsList";
import TransactionDetailModal from "@/src/shared/modals/TransactionDetailModal";

export default function ChildTab(){
    const navigation = useRouter();
    const { data: children, isLoading } = useChildren();

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
    const { data: transactions } = useChildTransactions(
        children?.children[currentIndex]?.id
    );

    const [currentModal, setCurrentModal] = useState<{
        [key: string]: boolean;
    } | null>(null);

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
        setCurrentModal({ transaction: true });
    };
    return <ScrollView showsVerticalScrollIndicator={false}>
        <ChildrenCarousel
            children={children?.children || []}
            currentIndex={currentIndex}
            handleMomentumScrollEnd={handleMomentumScrollEnd}
        />
        <GrafView />
        <TransactionsList
            title="Transactions Récentes"
            transactions={transactions || []}
            onTransactionPress={handleTransactionPress}
            onViewAll={() => navigation.navigate("/allUserTransactions")}
        />
        <TransactionDetailModal
            visible={currentModal?.transaction ? true : false}
            onClose={() => setCurrentModal(null)}
            transaction={selectedTransaction}
        />
    </ScrollView>
}