import {Header} from "@/src/shared/components/molecules";
import {StyleSheet, View} from "react-native";
import {SmartImage, SmartText} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import React from "react";
import {Wrapper} from "@/src/shared/components";
import {OtpInput} from "react-native-otp-entry";
import {width} from "@/src/utils/method";
import {pallete} from "@/src/utils/pallete";
import {AuthNavigationProps} from "@/src/entities/auth/services/types";

type PinScreenProps = {
    onChangeScreen: (screen: string, payload: any) => void;
    payload: any;
}

const PinScreen = ({ onChangeScreen, payload }: PinScreenProps) => {

    return  <Wrapper>
        <Header
            left={<View style={{width: 30}}/>}
            right={<View style={{width: 30}}/>}
            title="Connexion"
        />

        <SmartImage
            source={images.fullLogo}
            containerStyle={styles.containerLogo}
        />

        <SmartText style={{textAlign:"center", fontSize: 22, marginBottom: 60}}>{payload.screen === "pin" ? "Entrer votre Pin": "Confirmer votre pin"}</SmartText>
        <OtpInput
            numberOfDigits={4}
            focusColor="green"
            autoFocus
            hideStick={false}
            placeholder="******"
            blurOnFilled={true}
            disabled={false}
            type="numeric"
            secureTextEntry
            focusStickBlinkingDuration={500}
            onTextChange={(text) => console.log(text)}
            onFilled={(text) =>  onChangeScreen("pin", { ...payload,pin: text})}
            textInputProps={{
                accessibilityLabel: "Pin code",
            }}
            textProps={{
                accessibilityRole: "text",
                accessibilityLabel: "Pin digit",
                allowFontScaling: false,
            }}
            theme={{
                containerStyle: {
                    width: "90%",
                    marginHorizontal: "auto",
                },
                pinCodeContainerStyle: {
                    borderRadius: 10,
                    height: 60,
                    width: width/ 5,
                    backgroundColor: pallete.gray,
                    borderColor: pallete.gray,
                },
                pinCodeTextStyle: {
                    fontSize: 30
                },
                focusStickStyle: {
                    backgroundColor: pallete.white
                },
                focusedPinCodeContainerStyle: {
                    backgroundColor: pallete.info,
                    borderColor: pallete.info,
                },
                placeholderTextStyle: {},
                filledPinCodeContainerStyle: {},
                disabledPinCodeContainerStyle: {},
            }}

        />
    </Wrapper>
}

export default PinScreen;

const styles = StyleSheet.create({
    containerLogo: {
        width: 150,
        height: 150,
        alignSelf: "center",
    }
});