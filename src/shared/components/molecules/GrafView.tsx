import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import {View, StyleSheet} from "react-native"
import {pallete} from "@/src/utils/pallete";
import {SmartText} from "@/src/shared/components/atoms";
const data = [
    {value: 250, label: 'M'},
    {value: 500, label: 'T'},
    {value: 745, label: 'W'},
    {value: 320, label: 'T'},
    {value: 600, label: 'F'},
    {value: 256, label: 'S'},
    {value: 300, label: 'S'},
];


export default function GrafView() {
    return (
        <View style={styles.container}>
            <SmartText style={{fontSize: 18, fontWeight: "600", marginBottom: 10}}>Statistiques</SmartText>
            <BarChart
                data={data}
                noOfSections={2}
                barBorderRadius={4}
                frontColor={pallete.blue}
                barWidth={22}
                yAxisThickness={0}
                xAxisThickness={0}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width: "90%",
        marginHorizontal: "auto"
    }
})