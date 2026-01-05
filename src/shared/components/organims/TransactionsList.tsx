import {pallete} from "@/src/utils/pallete";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {TransactionItem} from "../molecules";
import NoData from "../molecules/NoData";
import SkeletonLoading from "expo-skeleton-loading";
import {width} from "@/src/utils/method";

interface Transaction {
    id: number;
    type: "received" | "sent";
    amount: number;
    description: string;
    time: string;
    status?: "completed" | "pending";
    date?: string;
    category?: string;
    location?: string;
    merchant?: string;
    cardUsed?: string;
    reference?: string;
}

interface TransactionsListProps {
    title: string;
    transactions: Transaction[];
    onTransactionPress?: (transaction: Transaction) => void;
    onViewAll?: () => void;
    showViewAll?: boolean;
    isLoading?: boolean;
}

export default function TransactionsList({
                                             title,
                                             transactions,
                                             onTransactionPress,
                                             onViewAll,
                                             showViewAll = true,
                                             isLoading
                                         }: TransactionsListProps) {

    if (isLoading) return <>
        <SkeletonLoading background={pallete.gray} highlight={pallete.white}>
            <View style={[{
                height: 60,
                width: width - 50,
                marginHorizontal: "auto",
                backgroundColor: pallete.white,
                borderRadius: 10,
                marginTop: 50
            }]}/>
        </SkeletonLoading>;
        <SkeletonLoading background={pallete.gray} highlight={pallete.white}>
            <View style={[{
                height: 60,
                width: width - 50,
                marginHorizontal: "auto",
                backgroundColor: pallete.white,
                borderRadius: 10,
                marginTop: 10
            }]}/>
        </SkeletonLoading>
        <SkeletonLoading background={pallete.gray} highlight={pallete.white}>
            <View style={[{
                height: 60,
                width: width - 50,
                marginHorizontal: "auto",
                backgroundColor: pallete.white,
                borderRadius: 10,
                marginTop: 10
            }]}/>

        </SkeletonLoading>
        <SkeletonLoading background={pallete.gray} highlight={pallete.white}>
            <View style={[{
                height: 60,
                width: width - 50,
                marginHorizontal: "auto",
                backgroundColor: pallete.white,
                borderRadius: 10,
                marginTop: 10
            }]}/>

        </SkeletonLoading>
    </>

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {!transactions?.length ? (
                <NoData
                    icon={<FontAwesome5 name="history" size={44} color="black"/>}
                    description="Vous n’avez effectué aucune transaction pour le moment"
                />
            ) : (
                <>
                    <FlatList
                        data={transactions}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item: transaction}) => (
                            <TransactionItem
                                key={transaction.id}
                                transaction={transaction}
                                onPress={
                                    onTransactionPress
                                        ? () => onTransactionPress(transaction)
                                        : undefined
                                }
                                
                            />
                        )}
                    />

                    {showViewAll && onViewAll && (
                        <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll}>
                            <Text style={styles.viewAllText}>Voir tout</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginVertical: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 16,
    },
    viewAllButton: {
        alignItems: "center",
        paddingVertical: 12,
    },
    viewAllText: {
        color: pallete.blue,
        fontSize: 16,
        fontWeight: "600",
    },
});
