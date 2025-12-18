import images from "@/src/assets/images";
import {Wrapper} from "@/src/shared/components";
import {IconButton, SmartImage} from "@/src/shared/components/atoms";
import {Header} from "@/src/shared/components/molecules";
import {pallete} from "@/src/utils/pallete";
import {Bell} from "lucide-react-native";
import React from "react";
import {ScrollView, StyleSheet,} from "react-native";
import {useRouter} from "expo-router";

const Home = () => {
    const navigation = useRouter();
    return (
        <Wrapper>
            <Header
                left={
                    <SmartImage
                        source={images.Logo}
                        containerStyle={styles.containerLogo}
                    />
                }
                right={
                    <IconButton
                        icon={<Bell size={24} color={pallete.grey}/>}
                        onPress={() => navigation.navigate("/notifications")}
                        size="medium"
                    />
                }
                title="Acceuil"
            />

            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>

            </ScrollView>

        </Wrapper>
    );
};

export default Home;

const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
        alignSelf: "center",
    },
});
