import {Wrapper} from "@/src/shared/components";
import {Header} from "@/src/shared/components/molecules";
import {IconButton, SmartImage, SmartText} from "@/src/shared/components/atoms";
import {ChevronLeft, WalletIcon} from "lucide-react-native";
import images from "@/src/assets/images";
import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {pallete} from "@/src/utils/pallete";
import {height, width} from "@/src/utils/method";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import {CreateChildConfirm} from "@/src/features/children/components/organisms";

type ParamsType = {
    form: string
    type: string
}

function ConfirmationScreen() {
    const {form, type} = useLocalSearchParams<ParamsType>();
    const navigation = useRouter()
    const parsedForm = JSON.parse(form)
    console.log("--Confirmation", form, type);
    const currency = parsedForm.currency === "USD" ? "$" : "Fc";

    const displayTransactionDetails = () => {
        switch (type) {
            case "createChild":
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
                        {type === "createChild" ? "Création de dependant" : "Inconnu"}
                    </SmartText>
                </View>
                <View style={[styles.container, styles.transaction]}>
                    <SmartText style={styles.subTitle}>Frais de transaction</SmartText>
                    <SmartText style={styles.text}>

                        0.00 {currency}
                    </SmartText>
                </View>
                <View style={[styles.container, styles.transaction,{marginTop:10}]}>
                    <SmartText style={styles.subTitle}>Total à payer</SmartText>
                    <SmartText style={styles.text}>

                        {parseFloat(parsedForm?.initialAmount.toString()).toFixed(2)} {currency}
                    </SmartText>
                </View>
                <SmartButton title="Confirmez la transaction" onPress={()=> navigation.navigate({
                    pathname:"/(transactions)/receiptScreen",
                    params:{
                        form,
                        type
                    }
                })}  style={{marginTop: 20}}/>
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