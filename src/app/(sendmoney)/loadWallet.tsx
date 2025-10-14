import {Wrapper} from "@/src/shared/components";
import {Header} from "@/src/shared/components/molecules";
import {IconButton, SmartImage} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import {ChevronLeft} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import React, {useState} from "react";
import {NativeScrollEvent, NativeSyntheticEvent, StyleSheet} from "react-native";
import { useRouter} from "expo-router";
import {useWallet} from "@/src/entities/dashboard/hook/useWallet";
import {useTransactions} from "@/src/entities/dashboard/hook/useTransaction";
import {WalletCarousel} from "@/src/shared/components/organims";

export default function LoadToWallet(){
    const navigation = useRouter();
    const { data } = useWallet();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleMomentumScrollEnd = (
        event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const width = event.nativeEvent.layoutMeasurement.width;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
    };

    return <Wrapper>
        <Header
            right={
                <SmartImage
                    source={images.Logo}
                    containerStyle={styles.containerLogo}
                />
            }
            left={
                <IconButton
                    icon={<ChevronLeft size={24} color={pallete.grey} />}
                    onPress={() => navigation.back()}
                    size="medium"
                />
            }
            title="Approvisionnement"
        />
        <WalletCarousel
            wallets={data?.wallets || []}
            currentIndex={currentIndex}
            handleMomentumScrollEnd={handleMomentumScrollEnd}
        />

    </Wrapper>
}

const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
        alignSelf: "center",
    },
});
