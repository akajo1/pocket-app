import {ParamsType} from "@/src/utils/method";
import {feeResponse} from "@/src/shared/services/feeApi";
import {UserIcon, WalletIcon} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import React from "react";
import {TransactionFooter} from "@/src/shared/components";
import {CurrencyDisplay} from "@/src/shared/components/molecules";


type Props = {
    formData: ParamsType
    fee: feeResponse
    isLoading: boolean
    onSubmit: () => void
}
export default function UnloadChildConfirmation({formData, fee, isLoading, onSubmit}: Props) {
    const currency = formData.currency === "USD" ? "$" : "Fc";
    const feeAmount = Number(+formData?.amount * +fee?.percentage).toFixed(2)
    const total = Number(+formData?.amount + +feeAmount).toFixed(2)

    return <>
        <CurrencyDisplay
            icon={<UserIcon size={20} color={pallete.dollars}/>}
            subTitle="Depuis le dépendant"
            title={formData?.name}
        />

        <CurrencyDisplay
            icon={<WalletIcon size={20} color={pallete.dollars}/>}
            subTitle={"A mon Portemonaie"}
            title={formData?.currency}
        />


        <TransactionFooter
            currency={currency}
            isLoading={isLoading}
            transactionType="Appro. portemonnaie"
            feeAmount={feeAmount}
            onSubmit={onSubmit}
            totalAmount={total}
        />
    </>
}
