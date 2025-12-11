import images from "@/src/assets/images";
import {Wrapper} from "@/src/shared/components";
import {IconButton, SmartImage, SmartText,} from "@/src/shared/components/atoms";
import {Header, QuickActionsGrid} from "@/src/shared/components/molecules";
import TransactionsList from "@/src/shared/components/organims/TransactionsList";
import TransactionDetailModal from "@/src/shared/modals/TransactionDetailModal";
import {pallete} from "@/src/utils/pallete";
import {useRouter} from "expo-router";
import {PlusIcon} from "lucide-react-native";
import React, {useCallback, useState} from "react";
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet,} from "react-native";
import {EmptyChildWalletScreen} from "../components/molecules";
import {ChildrenCarousel} from "../components/organisms";
import {useChildren} from "../hook/useChildren";
import {useChildTransactions} from "../hook/useChildTransactions";
import {quickActionsChild} from "../services/menu";
import {useFocusEffect} from "@react-navigation/native";

function ChildrenScreen() {
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

    const quickActionsWithHandlers = quickActionsChild?.map((action) => ({
        ...action,
        onPress: () => {
        },
    }));

    const handleTransactionPress = (transaction: any) => {
        setSelectedTransaction(transaction);
        setCurrentModal({transaction: true});
    };

    useFocusEffect(
        useCallback(() => {
            // on rafraîchit la liste des enfants
            refetchChildren();

            // et si un enfant est sélectionné, on rafraîchit aussi ses transactions
            if (childId) {
                refetchTransactions();
            }
        }, [refetchChildren, refetchTransactions, childId])
    );
    const displayChildren = () => {
        if (!children?.length)
            return (
                <EmptyChildWalletScreen
                    onPress={() =>
                        navigation.navigate("/(children)/createChildren")
                    }
                />
            );

        return (
            <>
                <ChildrenCarousel
                    children={children}
                    currentIndex={currentIndex}
                    handleMomentumScrollEnd={handleMomentumScrollEnd}

                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <QuickActionsGrid
                        actions={quickActionsWithHandlers}
                        // title="Actions Rapides"
                        isChild
                        isLoading={loadingChildren}
                    />
                    <SmartText
                        style={styles.tag}
                    >
                        Pas encore lié a un tag nfg
                    </SmartText>
                    <TransactionsList
                        title="Transactions Récentes"
                        transactions={transactions?.slice(0, 3) || []}
                        onTransactionPress={handleTransactionPress}
                        onViewAll={() => navigation.navigate("/(transactions)/allChildTransactions")}
                        isLoading={loadingChildren || loadingTransactions}
                    />
                </ScrollView>
                <TransactionDetailModal
                    visible={currentModal?.transaction ? true : false}
                    onClose={() => setCurrentModal(null)}
                    transaction={selectedTransaction}

                />
            </>
        );
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
                        icon={<PlusIcon size={24} color={pallete.grey}/>}
                        onPress={() => navigation.navigate("/(children)/createChildren")}
                        size="medium"
                    />
                }
                title="Dépendant"
            />
            {displayChildren()}
        </Wrapper>
    );
}

export default ChildrenScreen;

const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
    },
    tag: {
        marginVertical: 5,
        alignSelf: "center",
        color: pallete.red,
        width: "90%",
        textAlign: "center",
        paddingVertical: 8,
        borderRadius: 10,
        fontWeight: "600",
    }
});
