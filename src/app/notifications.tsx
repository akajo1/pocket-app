import {Wrapper} from "@/src/shared/components";
import {Header} from "@/src/shared/components/molecules";
import {IconButton, SmartImage} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import {ChevronLeft} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import React from "react";
import {StyleSheet} from "react-native";
import {useRouter} from "expo-router";

export default function Notifications(){
    const navigation = useRouter()
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
            title="Mes Notifications"
        />
    </Wrapper>
}

const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
    },
});