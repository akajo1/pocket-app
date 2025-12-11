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
import {typeTransaction} from "@/src/utils/method";

type ParamsType = {
    data: string
    type: string
    transactionType: string
}

export default function ReceiptScreen() {

    const {data, type, transactionType} = useLocalSearchParams<ParamsType>();
    const navigation = useRouter()
    const parsedForm = JSON.parse(data)
    const currency = parsedForm?.currency === "USD" ? "$" : "Fc";
    const CreateChildReceipt = [
        {
            label: "Réference",
            value: parsedForm?.referenceNumber,
        },
        {
            label: "Type de transaction",
            value: transactionType
        },

        {
            label: "Depuis le portemonnaie",
            value: parsedForm?.currency || "USD"
        },
        {
            label: "Nom du bénéficiaire",
            value: parsedForm?.name
        },
        {
            label: "Montant",
            value: `${parseFloat(parsedForm?.amount).toFixed(2)} ${currency}`
        },
        {
            label: "Frais de transaction",
            value: `${parseFloat(parsedForm?.fee)?.toFixed(2)} ${currency}`
        },
        {
            label: "Total payé",
            value: `${parseFloat(parsedForm?.totalDebit).toFixed(2)} ${currency}`
        },

    ]

    const LoadWalletReceipt = [
        {
            label: "Réference",
            value: parsedForm?.referenceNumber,
        },
        {
            label: "Type de transaction",
            value: transactionType
        },
        {
            label: "Depuis",
            value: parsedForm?.mode
        },

        {
            label: "A mon portemonnaie",
            value: parsedForm?.currency || "USD"
        },
        {
            label: "Montant",
            value: `${parseFloat(parsedForm?.amount).toFixed(2)} ${currency}`
        },
        {
            label: "Frais de transaction",
            value: `${parseFloat(parsedForm?.fee)?.toFixed(2)} ${currency}`
        },
        {
            label: "Total payé",
            value: `${parseFloat(parsedForm?.totalDebit).toFixed(2)} ${currency}`
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
            value: parsedForm?.currency || "USD"
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
            value: `${parseFloat(parsedForm?.amount).toFixed(2)} ${currency}`
        },
        {
            label: "Frais de transaction",
            value: `${parseFloat(parsedForm?.fee)?.toFixed(2)} ${currency}`
        },
        {
            label: "Total payé",
            value: `${parseFloat(parsedForm?.totalDebit).toFixed(2)} ${currency}`
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
                return CreateChildReceipt
            case typeTransaction.loadWallet:
                return LoadWalletReceipt
            case typeTransaction.walletToWallet:
                return w2wReceipt
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