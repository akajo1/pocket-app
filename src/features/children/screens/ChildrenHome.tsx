import images from "@/src/assets/images";
import {Wrapper} from "@/src/shared/components";
import {IconButton, SmartImage, SmartText,} from "@/src/shared/components/atoms";
import {Header, NFCDeviceCard, QuickActionsGrid} from "@/src/shared/components/molecules";
import TransactionsList from "@/src/shared/components/organims/TransactionsList";
import TransactionDetailModal from "@/src/shared/modals/TransactionDetailModal";
import {pallete} from "@/src/utils/pallete";
import {useRouter} from "expo-router";
import {Plus, PlusIcon, Wifi} from "lucide-react-native";
import React, {useCallback, useEffect, useState} from "react";
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, TouchableOpacity, View,} from "react-native";
import {EmptyChildWalletScreen} from "../components/molecules";
import {ChildrenCarousel} from "../components/organisms";
import {useChildren} from "../hook/useChildren";
import {useChildTransactions} from "../hook/useChildTransactions";
import {quickActionsChild} from "../services/menu";
import {useFocusEffect} from "@react-navigation/native";
import {sendMoneyType, typeTransaction} from "@/src/utils/method";
import LimitModal from "@/src/shared/modals/LimitModal";
import useLimit from "@/src/features/children/hook/useLimit";
import NFCLinkingModal from "@/src/shared/modals/NFCLinkingModal";
import {useNFC} from "@/src/shared/hooks/useNFC";
import {NFCDevices} from "@/src/shared/components/organims";

function ChildrenScreen() {
    const navigation = useRouter();
    const {data: childrenList, isLoading: loadingChildren, refetch: refetchChildren} = useChildren();
    const children = childrenList?.data || []
    const limitMutation = useLimit()
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
    const [limitVisible, setLimitVisible] = useState<boolean>(false);
    const childId = children?.[currentIndex]?.id;
    const [showNFCModal, setShowNFCModal] = useState(false);
    const { isNFCSupported, isNFCEnabled } = useNFC();
    const {
        data: transactionsList,
        isLoading: loadingTransactions,
        refetch: refetchTransactions,
    } = useChildTransactions({childId});
    const transactions = transactionsList?.data || []
    const [currentModal, setCurrentModal] = useState<{
        [key: string]: boolean;
    } | null>(null);

    // Simuler des appareils NFC liés
    const [linkedNFCDevices, setLinkedNFCDevices] = useState({
        1: [
            {
                id: 'nfc_001',
                type: 'bracelet',
                name: 'Bracelet Emma',
                linkedAt: '2024-01-10T10:30:00Z',
                isActive: true,
                lastUsed: '2024-01-15T14:30:00Z'
            }
        ],
        2: [
            {
                id: 'nfc_002',
                type: 'tag',
                name: 'Tag Lucas',
                linkedAt: '2024-01-12T09:15:00Z',
                isActive: true,
                lastUsed: '2024-01-15T10:15:00Z'
            }
        ]
    });

    const handleMomentumScrollEnd = (
        event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const width = event.nativeEvent.layoutMeasurement.width;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
    };
    const handleLimitNavigation = () => {
        setLimitVisible(true)
    }
    const handleCloseLimit = ()=> {
        setLimitVisible(false)
    }
    const handleConfirmChangeLimit = (data)=> {
        limitMutation.mutate({
            childId,
            ...data,
        })
    }
    const quickActionsWithHandlers = quickActionsChild?.map((action) => ({
        ...action,
        onPress: () => {
            switch (action.key) {
                case "charger":
                    return navigation.navigate({
                            pathname: "/(children)/loadChild",
                            params: {
                                childId: childId,
                                currency: children[currentIndex]?.currency,
                                transactionType: typeTransaction.createChild,
                                type: sendMoneyType.w2c
                            }
                        }
                    )
                case "unload":
                    return navigation.navigate({
                            pathname: "/(children)/unloadChild",
                            params: {
                                childId: childId,
                                currency: children[currentIndex]?.currency,
                                transactionType: typeTransaction.createChild,
                                type: sendMoneyType.w2c
                            }
                        }
                    )
                case 'limit':
                    handleLimitNavigation()
                    return
                case "nfc":
                    setShowNFCModal(true)
                    return
                default:
                    return
            }
        },
    }));

    const handleTransactionPress = (transaction: any) => {
        setSelectedTransaction(transaction);
        setCurrentModal({transaction: true});
    };

    const handleNFCLink = (nfcId: string, deviceType: string) => {
        const selectedChild = children?.[currentIndex];
        if (selectedChild) {
            const newDevice = {
                id: nfcId,
                type: deviceType,
                name: `${deviceType === 'bracelet' ? 'Bracelet' : 'Tag'} ${selectedChild.name}`,
                linkedAt: new Date().toISOString(),
                isActive: true
            };

            setLinkedNFCDevices(prev => ({
                ...prev,
                [selectedChild.id]: [...(prev[selectedChild.id] || []), newDevice]
            }));
        }
    };

    const removeNFCDevice = (childId: number, deviceId: string) => {
        setLinkedNFCDevices(prev => ({
            ...prev,
            [childId]: prev[childId]?.filter(device => device.id !== deviceId) || []
        }));
    };

    const toggleNFCDeviceStatus = (childId: number, deviceId: string) => {
        setLinkedNFCDevices(prev => ({
            ...prev,
            [childId]: prev[childId]?.map(device =>
                device.id === deviceId
                    ? { ...device, isActive: !device.isActive }
                    : device
            ) || []
        }));
    };


    useEffect(() => {
        if(limitMutation.isSuccess){
            setLimitVisible(false)
        }
    },[limitMutation.isSuccess])
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

                    {
                        !isNFCSupported ?  <SmartText
                            style={styles.tag}
                        >
                           NFC Non disponible
                        </SmartText> :  null
                    }

                    <TransactionsList
                        title="Transactions Récentes"
                        transactions={transactions?.slice(0, 3) || []}
                        onTransactionPress={handleTransactionPress}
                        onViewAll={() => navigation.navigate("/(transactions)/allChildTransactions")}
                        isLoading={loadingChildren || loadingTransactions}
                    />
                    {
                        isNFCSupported && <NFCDevices
                        linkedNFCDevices={linkedNFCDevices}
                        currentChild={childId}
                        onRemoveNFCDevice={removeNFCDevice}
                        onToggleNFCDeviceStatus={toggleNFCDeviceStatus}
                        onShowNFCDevice={()=> {}}
                      />
                    }

                </ScrollView>
                <TransactionDetailModal
                    visible={currentModal?.transaction ? true : false}
                    onClose={() => setCurrentModal(null)}
                    transaction={selectedTransaction}
                />
                <NFCLinkingModal  visible={showNFCModal}
                                  onClose={() => setShowNFCModal(false)} child={children?.[currentIndex]} onLinkSuccess={handleNFCLink} />
                <LimitModal visible={limitVisible} child={children?.[currentIndex]} onClose={handleCloseLimit} onSubmit={handleConfirmChangeLimit} isPending={limitMutation.isPending}/>
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


