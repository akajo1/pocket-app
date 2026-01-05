import {StyleSheet, View} from "react-native";
import {SmartText} from "@/src/shared/components/atoms";
import {height, width} from "@/src/utils/method";
import {pallete} from "@/src/utils/pallete";

interface Props {
    icon: any,
    subTitle: string,
    title: string
}

const CurrencyDisplay = ({icon, subTitle, title}: Props) => {
    return <View style={styles.from}>
        <View style={{flexDirection: "row"}}>
            {icon}
            <SmartText style={{fontSize: 14, color: pallete.black, marginLeft: 8}}>
                {subTitle}
            </SmartText>
        </View>
        <SmartText style={styles.wallet}>{title}</SmartText>
    </View>
}

export default CurrencyDisplay


const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
    },
    contentContainer: {
        flex: 1
    },
    container: {
        width: width - 50,
        marginHorizontal: "auto",
        paddingVertical: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: "600",
        color: pallete.blue,
    },

    text: {
        fontSize: 14,
        color: pallete.black
    },
    subTitle: {
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
    type: {},
    wallet: {
        fontSize: 32,
        color: pallete.black,
        fontWeight: "900",
        marginLeft: 28,
    },
    from: {
        backgroundColor: pallete.white,
        height: height / 10,
        width: width - 25,
        marginHorizontal: "auto",
        borderRadius: 20,
        padding: 20,
        marginVertical: 10
    },
})