import {Wrapper} from "@/src/shared/components";
import {Header} from "@/src/shared/components/molecules";
import {SmartImage, SmartText} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import React from "react";
import {StyleSheet} from "react-native"
import {pallete} from "@/src/utils/pallete";
import {useLocalSearchParams, useRouter} from "expo-router";
import {ListDetail} from "@/src/shared/components/organims";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import {numberFormat, typeTransaction} from "@/src/utils/method";

type ParamsType = {
    data: string
    type: string
    transactionType: string
    direct?: string
}

export default function ReceiptScreen() {

    const {data, type, transactionType, direct} = useLocalSearchParams<ParamsType>();
    const navigation = useRouter()
    const payload = JSON.parse(data)
    const parsedForm = payload?.data
    const currency = parsedForm?.currency;

    const CreateChildReceipt = [
        {
            label: "Réference",
            value: parsedForm?.reference,
        },
        {
            label: "Type de transaction",
            value: "Création dépendant"
        },

        {
            label: "Depuis le portemonnaie",
            value: currency || "USD"
        },
        {
            label: "Nom du bénéficiaire",
            value: parsedForm?.beneficiaryData?.name
        },
        {
            label: "Montant",
            value: `${numberFormat(parseFloat(parsedForm?.amount), currency) }`
        },
        {
            label: "Frais de transaction",
            value: `${numberFormat(parseFloat(parsedForm?.fee), currency)}`
        },
        {
            label: "Total payé",
            value: `${numberFormat(parseFloat(parsedForm?.totalDebit), currency)}`
        },

    ]
    const LoadChildReceipt = [
        {
            label: "Réference",
            value: parsedForm?.reference,
        },
        {
            label: "Type de transaction",
            value: "Appro. dépendant"
        },

        {
            label: "Depuis le portemonnaie",
            value: currency || "USD"
        },
        {
            label: "Nom du bénéficiaire",
            value: parsedForm?.beneficiaryData?.name
        },
        {
            label: "Montant",
            value: `${numberFormat(parseFloat(parsedForm?.amount), currency)}`
        },
        {
            label: "Frais de transaction",
            value: `${numberFormat(parseFloat(parsedForm?.fee), currency)}`
        },
        {
            label: "Total payé",
            value: `${numberFormat(parseFloat(parsedForm?.totalDebit), currency)}`
        },

    ]

    const LoadWalletReceipt = [
        {
            label: "Réference",
            value: parsedForm?.reference,
        },
        {
            label: "Type de transaction",
            value: "Approvisionnement"
        },
        {
            label: "Depuis",
            value: `${parsedForm?.description?.split("-")[1].replace("_", " ").toLowerCase()} `
        },

        {
            label: "A mon portemonnaie",
            value: currency || "USD"
        },
        {
            label: "Montant",
            value: `${numberFormat(parseFloat(parsedForm?.amount), currency)}`
        },
        {
            label: "Frais de transaction",
            value: `${numberFormat(parseFloat(parsedForm?.fee), currency)}`
        },
        {
            label: "Total reçu",
            value: `${numberFormat(parseFloat(parsedForm?.totalDebit), currency)}`
        },

    ]
    const cashoutReceipt = [
        {
            label: "Réference",
            value: parsedForm?.reference,
        },
        {
            label: "Type de transaction",
            value: "Retrait"
        },
        {
            label: "Depuis mon portemonnaie",
            value: currency || "USD"
        },

        {
            label: "Au compte",
            value: `${parsedForm?.description?.split("-")[1].replace("_", " ").toLowerCase()} `
        },
        {
            label: "Montant",
            value: `${parseFloat(parsedForm?.amount ?? 0).toFixed(2)}  ${currency}`
        },
        {
            label: "Frais de transaction",
            value: `${numberFormat(parseFloat(parsedForm?.fee), currency)}`
        },
        {
            label: "Retrait total",
            value: `${numberFormat(parseFloat(parsedForm?.amount), currency)}`
        },

    ]
    const w2wReceipt = [
        {
            label: "Réference",
            value: parsedForm?.reference,
        },
        {
            label: "Type de transaction",
            value: "W2W"
        },

        {
            label: "Depuis mon portemonnaie",
            value: currency || "USD"
        },
        {
            label: "Nom du bénéficiaire",
            value: `${parsedForm?.beneficiaryData?.first_name} ${parsedForm?.beneficiaryData?.last_name}`,
        },
        {
            label: "Numéro du bénéficiaire",
            value: parsedForm?.beneficiaryData?.phone,
        },
        {
            label: "Montant",
            value: `${numberFormat(parseFloat(parsedForm?.amount), currency)}`
        },
        {
            label: "Frais de transaction",
            value: `${numberFormat(parseFloat(parsedForm?.fee), currency)}`
        },
        {
            label: "Total payé",
            value: `${numberFormat(parseFloat(parsedForm?.totalDebit), currency)}`
        },
    ]

    const handleBack = () => {
        switch (transactionType) {
            case  typeTransaction.createChild:
                return navigation.dismissTo("/(dashboard)/children")
            case typeTransaction.loadWallet:
                return navigation.dismissTo("/")
            default:
                return navigation.dismissTo("/")
        }
    }
    const displayReceipt = () => {
        switch (transactionType) {
            case  typeTransaction.createChild:
                if (direct === "loadChild")
                    return LoadChildReceipt

                return CreateChildReceipt
            case typeTransaction.loadWallet:
                return LoadWalletReceipt
            case typeTransaction.walletToWallet:
                return w2wReceipt
            case typeTransaction.cashout:
                return cashoutReceipt
            default:
                return []
        }
    }
    return (
        <Wrapper>
            <Header title="Récu transaction"/>
            <SmartImage
                source={images.Logo}
                containerStyle={styles.containerLogo}
            />
            <SmartText style={styles.title}>Opération Réussie</SmartText>
            <SmartText
                style={styles.subTitle}>{type === "createChild" ? "Création dépendant" : "transaction"}</SmartText>
            <ListDetail data={displayReceipt()}/>
            <SmartButton title="Retourner à l'acceuil" onPress={() => handleBack()}
                         style={{marginTop: 20, position: 'absolute', bottom: 50, width: '90%', left: '5%'}}/>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    containerLogo: {
        width: 100,
        height: 100,
        alignSelf: "center",
    },
    title: {
        alignSelf: "center",
        color: pallete.success,
        fontWeight: "700",
        fontSize: 18,
        marginBottom: 5,
    },
    subTitle: {
        alignSelf: "center",
        color: pallete.black,
    }
})