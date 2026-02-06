import {Wrapper} from "@/src/shared/components";
import {useWallet} from "@/src/entities/dashboard/hook/useWallet";
import React, {useState} from "react";
import {useTransactions} from "@/src/entities/dashboard/hook/useTransaction";
import {NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Header, Input, SmartDatePicker} from "@/src/shared/components/molecules";
import {IconButton, SmartImage, SmartText} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import {Calendar, ChevronLeft} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import {WalletCarousel} from "@/src/shared/components/organims";
import TransactionsList from "@/src/shared/components/organims/TransactionsList";
import TransactionDetailModal from "@/src/shared/modals/TransactionDetailModal";
import {height, width} from "@/src/utils/method";
import {useRouter} from "expo-router";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { transactionFilterSchema} from "@/src/features/children/services/schema";


export default function AllUserTransactions() {
    const {
        data: walletsList,
        isLoading: walletsLoading,
        refetch: refetchWallets,
    } = useWallet();
    const walletsData = walletsList?.data || []
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isShowFromDate, setIsShowFromDate] = useState<boolean>(false);
    const [currentFromDate, setCurrentFromDate] = useState<any>();

    const [isShowToDate, setIsShowToDate] = useState<boolean>(false);
    const [currentToDate, setCurrentToDate] = useState<any>();

    const walletId = walletsData?.[currentIndex]?.id;


    const navigation = useRouter()
    const [currentModal, setCurrentModal] = useState<{
        [key: string]: boolean;
    } | null>(null);

    const {
        data: transactionLists,
        isLoading: transactionLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useTransactions({
        walletId,      
        pageSize: 10,
        dateFrom: currentFromDate,
        dateTo: currentToDate
       /* type: string;

        search: string*/
    });

    const transactions =  transactionLists?.pages.flatMap(p => p.data) || []

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(transactionFilterSchema),
        mode: "onChange",
        defaultValues: {
            dateFrom: "",
            dateTo: "",
            status: "",
            type: "",
            search: "",
        },
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

    const handleChangeDate = (date: any, currentDateType: "from" | "to") => {

        if(currentDateType === "from") {
            setCurrentFromDate(date);
            setIsShowFromDate(false)
            setValue("dateFrom", date)
            return
        }

        setCurrentToDate(date);
        setIsShowToDate(false)
        setValue("dateTo", date)
        return


    }

    const resetForm = () => {
        reset()
        setCurrentFromDate();
        setCurrentToDate();
        setValue("dateFrom", "")
        setValue("dateTo", "")
    }
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
        <View style={{paddingHorizontal: 20,borderWidth:1, borderColor: pallete.gray, paddingVertical: 20}}>
            <SmartText style={{textAlign:"center", fontSize:16, fontWeight:700, marginBottom: 5}}>Filtre des transactions</SmartText>
            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Controller
                    control={control}
                    name="dateFrom"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            label="de"
                            placeholder="--/--/----"
                            type="date"
                            value={value}
                            onBlur={onBlur}
                            containerStyle={{width: width/2.3}}
                            icon={<Calendar size={20} color={pallete.black} />}
                            error={errors.dateFrom?.message}
                            onPress={() => {
                                setIsShowFromDate(true)
                                setIsShowToDate(false)
                            }}
                            // editable={!register.isPending}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="dateTo"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <Input
                                label="à"
                                placeholder="--/--/----"
                                type="date"
                                value={value}
                                onBlur={onBlur}
                                containerStyle={{width: width/2.3}}
                                icon={<Calendar size={20} color={pallete.black} />}
                                error={errors.dateTo?.message}
                                onPress={() => {
                                    setIsShowToDate(true)
                                    setIsShowFromDate(false)
                                }}
                                // editable={!register.isPending}
                            />
                        </>
                    )}
                />


            </View>
            <TouchableOpacity style={{alignItems:"center"}} onPress={resetForm}>
                <Text style={{fontWeight: "600"}}>Effacer le filtre </Text>
            </TouchableOpacity>
        </View>
        <View style={styles.transactions}>
            <TransactionsList
                isLoading={walletsLoading || transactionLoading}
                title="Toutes les Transactions"
                transactions={transactions || []}
                onTransactionPress={handleTransactionPress}
                showViewAll={hasNextPage}
                showAllText={isFetchingNextPage ? "Chargement..." : "Voir plus"}
                onViewAll={() => fetchNextPage()}
            />
        </View>
        <TransactionDetailModal
            visible={currentModal?.transaction ? true : false}
            onClose={() => setCurrentModal(null)}
            transaction={selectedTransaction}
        />
        <SmartDatePicker
            isShown={isShowFromDate}
            onChange={(date) => handleChangeDate(date, "from")}
            value={currentFromDate}
            onCloseModal={() => setIsShowFromDate(false)}
            typeDate="new"
        />

        <SmartDatePicker
            isShown={isShowToDate}
            onChange={(date) => handleChangeDate(date, "to")}
            value={currentToDate}
            onCloseModal={() => setIsShowToDate(false)}
            typeDate="new"
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
        height: height / 2.7
    }
});