import {View} from "react-native";
import {SmartText} from "@/src/shared/components/atoms";
import {pallete} from "@/src/utils/pallete";
type dataType ={
    label: string
    value: string
}
type TabButtonProps = {
    activeTab: string;
    onPress: (activeTab: string) => void;
    data: dataType[]
}

export default function TabButton({activeTab, onPress, data}:TabButtonProps){
    return (
        <View style={styles.container}>
            {
                data.map((item, index) => <SmartText isPressable key={index} style={{ textAlign: "center", color: item.value === activeTab ? pallete.white : pallete.black}} containerStyle={[styles.containTable, {
                    backgroundColor: item.value === activeTab ? pallete.blue : "transparent",
                }]} onPress={() => onPress(item.value)}>{item.label}</SmartText>)
            }
        </View>
    )
}

const styles = {
    container: {
        width: '90%',
        marginHorizontal: "auto",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 10,
        marginVertical: 10,
    },
    containTable:{
        paddingVertical: 15,
        flex:1,
        borderRadius:10,
        color: pallete.black,
        fontWeight: "600",
        borderWidth:1,
        borderColor: pallete.gray,
        marginHorizontal: 5,


    }
}