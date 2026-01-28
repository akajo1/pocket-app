import {useRouter} from "expo-router";
import {useChildren} from "@/src/features/children/hook/useChildren";
import React, {useState} from "react";
import {useChildTransactions} from "@/src/features/children/hook/useChildTransactions";
import {NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View} from "react-native";
import {ChildrenCarousel} from "@/src/features/children/components/organisms";
import TransactionsList from "@/src/shared/components/organims/TransactionsList";
import TransactionDetailModal from "@/src/shared/modals/TransactionDetailModal";
import {Wrapper} from "@/src/shared/components";
import {height} from "@/src/utils/method";
import {Header} from "@/src/shared/components/molecules";
import {IconButton, SmartImage} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import {ChevronLeft} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";

export default function ChildTransactions() {
    const navigation = useRouter();
    const {data: children, isLoading: loadingChildren, refetch: refetchChildren} = useChildren();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
    const childId = children?.[currentIndex]?.id;
    const {
        data: transactions,
        isLoading: loadingTransactions,
        refetch: refetchTransactions,
    } = useChildTransactions({childId});

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
            title="Transactions Dépendant"
        />
        <ChildrenCarousel
            children={children}
            currentIndex={currentIndex}
            handleMomentumScrollEnd={handleMomentumScrollEnd}
        />
        <View style={styles.transactions}>
            <TransactionsList
                isLoading={loadingChildren || loadingTransactions}
                title="Toute les Transactions"
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