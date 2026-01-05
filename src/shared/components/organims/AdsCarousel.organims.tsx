import {height, width} from "@/src/utils/method";
import {pallete} from "@/src/utils/pallete";
import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {SmartImage} from "@/src/shared/components/atoms";


type Props = {
    ads: any[];
    currentIndex: number;
    handleMomentumScrollEnd: (event: any) => void;

};

const AdsCarousel = ({
                         ads,
                         currentIndex,
                         handleMomentumScrollEnd,
                     }: Props) => {
    if (!ads.length) return null;
    return (
        <View style={styles.containerFluid}>
            <FlatList
                data={ads}
                horizontal
                renderItem={({item}) => <SmartImage
                    source={{uri: "https://adsterra.com/blog/wp-content/uploads/2021/06/how-banners-make-you-money.png"}}
                    containerStyle={{
                        height: 180,
                        width: width - 30,
                        marginRight: 10
                    }}
                    resizeMode="cover"
                />}
                pagingEnabled
                keyExtractor={(_, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleMomentumScrollEnd}
            />

        </View>
    );
};

export default AdsCarousel;

const styles = StyleSheet.create({
    containerFluid: {
        height: height / 4.2,
        width: "90%",
        marginHorizontal: "auto",
        marginTop: 16,

    },
    container: {
        flex: 1,
        backgroundColor: pallete.bg,
    },
    dotContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 12,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: pallete.grey,
        marginHorizontal: 4,
        opacity: 0.5,
    },
    activeDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: pallete.blue, // violet cool
        opacity: 1,
        shadowColor: pallete.black,
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
});
