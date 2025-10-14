import {Wrapper} from "@/src/shared/components";
import {Header} from "@/src/shared/components/molecules";
import {IconButton, SmartImage, SmartText} from "@/src/shared/components/atoms";
import {ChevronLeft, WalletIcon} from "lucide-react-native";
import images from "@/src/assets/images";
import React from "react";
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {pallete} from "@/src/utils/pallete";
import {height, typeTransaction, width} from "@/src/utils/method";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import {CreateChildConfirm} from "@/src/features/children/components/organisms";
import useCreateChild from "@/src/features/children/hook/useCreateChild";
import {useFee} from "@/src/shared/hooks/useFee";
import moment from "moment";

type ParamsType = {
    form: string
    type: string
    transactionType: string
}

function ConfirmationScreen() {
    const {form, type, transactionType} = useLocalSearchParams<ParamsType>();

    const createChildMutate = useCreateChild()
    const navigation = useRouter()
    const parsedForm = JSON.parse(form)
    const {data: fee, isLoading} = useFee(  {
        type,
        currency:parsedForm?.currency?.toLowerCase()
    })
    const currency = parsedForm.currency === "USD" ? "$" : "Fc";
    const feeMonney = (parseFloat(parsedForm?.initialAmount.toString()) * parseFloat(fee?.percentage?.toString()))/ 100
    const total = parseFloat(parsedForm?.initialAmount.toString()) + feeMonney


    const displayTransactionDetails = () => {
        switch (transactionType) {
            case typeTransaction.createChild:
                return <CreateChildConfirm data={parsedForm} />
            default:
               return <></>

        }
    };

    const currencyDisplay = () => {
        return <View style={styles.from}>
            <View style={{flexDirection:"row"}}>
                <WalletIcon size={20} color={pallete.dollars}/>
                <SmartText style={{fontSize: 14, color: pallete.white, marginLeft: 8}}>
                    Depuis le Portemonnaie
                </SmartText>
            </View>
            <SmartText style={styles.wallet}>{parsedForm.currency}</SmartText>
        </View>
    }

    const handleConfirmationClick = () => {
      switch (transactionType) {
          case typeTransaction.createChild:
             return  createChildMutate.mutate({...parsedForm, age: moment(parsedForm?.age)?.format("YYYY-MM-DD")})
          default:
              return

      }
    }
    return <Wrapper>
        <Header
            left={
                <IconButton
                    icon={<ChevronLeft/>}
                    onPress={() => navigation.back()}
                    variant="ghost"
                    size="medium"
                />
            }
            right={
                <SmartImage
                    source={images.Logo}
                    containerStyle={styles.containerLogo}
                />
            }
            title="Confirmatez la transaction"
        />
        <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
            {currencyDisplay()}
            {displayTransactionDetails()}


            <View style={styles.container}>
                <SmartText style={styles.title}>Transaction</SmartText>
                <View style={[styles.container, styles.transaction, {marginBottom: 10}]}>
                    <SmartText style={styles.subTitle}>Type de transaction</SmartText>
                    <SmartText style={styles.type}>
                        {transactionType === typeTransaction.createChild ? "Création de dependant" : "Inconnu"}
                    </SmartText>
                </View>
                <View style={[styles.container, styles.transaction]}>
                    <SmartText style={styles.subTitle}>Frais de transaction</SmartText>
                    <SmartText style={styles.text}>
                        {feeMonney}   {currency}
                    </SmartText>
                </View>
                <View style={[styles.container, styles.transaction,{marginTop:10}]}>
                    <SmartText style={styles.subTitle}>Total à payer</SmartText>
                    <SmartText style={styles.text}>
                        {total} {currency}
                    </SmartText>
                </View>

                <SmartButton
                    title="Confirmez la transaction"
                    disabled={createChildMutate.isPending  || isLoading}
                    icon={createChildMutate.isPending ? <ActivityIndicator color={pallete.white} size={20} /> : null}
                    onPress={()=>handleConfirmationClick()} style={{marginTop: 20}}/>
            </View>

        </ScrollView>
    </Wrapper>
}

export default ConfirmationScreen
const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
    },
    contentContainer:{
        flex:1
    },
    container:{
        width: width - 50,
        marginHorizontal: "auto",
        paddingVertical: 20
    },
    title:{
        fontSize: 24,
        marginBottom: 10,
        fontWeight: "600",
        color: pallete.blue,
    },

    text:{
        fontSize: 14,
        color: pallete.black
    },
    subTitle:{
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 3,
        color: pallete.black
    },
    transaction: {

        paddingVertical: 3,

        borderRadius: 8,

        flexDirection: "row",
        justifyContent: "space-between",
    },
    type:{

    },
    wallet: {
        fontSize: 32,
        color: pallete.gray,
        fontWeight: "900",
        marginLeft: 28,
    },
    from: {
        backgroundColor: pallete.grey,
        height: height / 10,
        width: width - 25,
        marginHorizontal: "auto",
        borderRadius: 20,
        padding: 20,
    },
})