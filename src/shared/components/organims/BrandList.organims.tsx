import {FlatList, StyleSheet, View} from "react-native";
import {BrandItem} from "@/src/shared/components/molecules";

type BrandListType = {
    brands: any[],
    currenBrandSelected: any,
    onCurrentBrandSelected: (brand: any) => void,
}

function BrandList({brands, onCurrentBrandSelected, currenBrandSelected}: BrandListType) {
    return <View style={styles.container}>
        <FlatList
            data={brands}
            renderItem={({item: brand, index}) => (<BrandItem key={index} item={{
                    ...brand,
                    onSelected: onCurrentBrandSelected,
                    isSelected: currenBrandSelected,
                }}/>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    </View>
}

export default BrandList;

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginBottom: 20,
    }
})