import {Pressable, StyleSheet, View} from "react-native";
import {SmartText} from "@/src/shared/components/atoms";
import {pallete} from "@/src/utils/pallete";
type DataType = {
    label: string,
    value: string,
}
type Props = {
    item: DataType,
    isSelected: boolean,
    onPress: (item: DataType) => void,
}

export default function RadioButton({item, isSelected, onPress}: Props) {
    return (
       <Pressable onPress={()=> onPress(item)}>
           <View style={styles.container}>
               <View style={styles.radioContainer}>
                   {isSelected ? <View style={styles.radio}/> : null}
               </View>
               <SmartText style={styles.label}>{item.label}</SmartText>
           </View>
       </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    radioContainer:{
        borderWidth: 1,
        width: 20,
        height: 20,
        borderRadius: 20/ 2,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radio:{
     width: 14,
        height: 14,
        backgroundColor: pallete.blue,
        borderRadius: 16 / 2
    },
    label: {
        fontSize: 14,
    }
})