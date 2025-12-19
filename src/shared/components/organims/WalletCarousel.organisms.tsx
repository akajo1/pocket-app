import {Wallet} from "@/src/entities/dashboard/services/walletApi";
import {height, width} from "@/src/utils/method";
import {pallete} from "@/src/utils/pallete";
import React, {useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import SkeletonLoading from 'expo-skeleton-loading'
import {SmartText} from "../atoms";
import {WalletCardItem} from "../molecules";
import {useWallet} from "@/src/entities/dashboard/hook/useWallet";

type Props = {
    wallets: Wallet[];
    currentIndex: number;
    handleMomentumScrollEnd: (event: any) => void;
    title?: string;
};

const WalletCarousel = ({
                            wallets,
                            currentIndex,
                            handleMomentumScrollEnd,
                            title,
                        }: Props) => {
    const {isLoading} = useWallet();
    const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(false);

    if (isLoading) return <SkeletonLoading background={pallete.gray} highlight={pallete.white}>
        <View style={[
            styles.containerFluid,
            {height: !!title ? height / 3.6 : height / 4.2, marginTop: 20},
        ]}>
            <View style={{
                width: width - 40,
                height: height / 6.2,
                backgroundColor: "#adadad",
                borderRadius: 10,
                marginHorizontal: "auto"
            }}/>
            <View style={{
                width: 40,
                marginTop: 20,
                height: 10,
                backgroundColor: "#adadad",
                borderRadius: 10,
                marginHorizontal: "auto"
            }}/>
        </View>
    </SkeletonLoading>

    if (!wallets?.length) return null;

    return (
        <View
            style={[
                styles.containerFluid,
                {height: !!title ? height / 3.6 : height / 4.2},
            ]}
        >
            {title && <SmartText style={styles.title}>{title}</SmartText>}
            <FlatList
                data={wallets}
                horizontal
                renderItem={({item}) => (
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
            {
                wallets.length > 1 ? <View style={styles.dotContainer}>
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
                </View> : null
            }

        </View>
    );
};

export default WalletCarousel;

const styles = StyleSheet.create({
    containerFluid: {
        height: height / 3.8,
    },
    title: {
        fontWeight: "700",
        fontSize: 16,
        marginLeft: width / 18,
        marginTop: 12,
        textTransform: "capitalize",
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
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
});
