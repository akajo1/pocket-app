import {Wallet} from "@/src/entities/dashboard/services/walletApi";
import {numberFormat, width} from "@/src/utils/method";
import {pallete} from "@/src/utils/pallete";
import {LinearGradient} from "expo-linear-gradient";
import {Eye, EyeOff} from "lucide-react-native";
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import IconButton from "../atoms/IconButton";

interface WalletCardProps {
    data: Wallet;
    isBalanceVisible: boolean;
    onToggleVisibility: () => void;
    onPress?: () => void;
    gradient?: string[];
}

export default function WalletCardItem({
                                           data,
                                           isBalanceVisible,
                                           onToggleVisibility,
                                           onPress,
                                       }: WalletCardProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            disabled={!onPress}
        >
            <LinearGradient
                colors={
                    data?.currency === "USD"
                        ? [pallete.dollars, pallete.orange]
                        : [pallete.franc, pallete.green]
                }
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.card}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Mon Portemonnaie</Text>
                    <IconButton
                        icon={
                            isBalanceVisible ? (
                                <EyeOff size={20} color={pallete.white}/>
                            ) : (
                                <Eye size={20} color={pallete.white}/>
                            )
                        }
                        onPress={onToggleVisibility}
                        variant="ghost"
                        size="small"
                        style={{backgroundColor: "transparent"}}
                    />
                </View>

                <Text style={styles.balance}>
                    {isBalanceVisible
                        ?  numberFormat(parseFloat(data?.available_balance),data?.currency)
                        : "••••••"}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 16,
        width: width - 40,
    },
    card: {
        padding: 24,
        borderRadius: 20,
        shadowColor: pallete.black,
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        color: pallete.white,
        fontSize: 16,
        opacity: 0.9,
    },
    balance: {
        color: pallete.white,
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 8,
    },
    cardNumber: {
        color: pallete.white,
        fontSize: 18,
        opacity: 0.8,
        marginBottom: 20,
        letterSpacing: 2,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardLabel: {
        color: pallete.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    cardExpiry: {
        color: pallete.white,
        fontSize: 14,
        opacity: 0.8,
    },
});
