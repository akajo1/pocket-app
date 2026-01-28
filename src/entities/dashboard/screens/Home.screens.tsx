import images from "@/src/assets/images";
import {Wrapper} from "@/src/shared/components";
import {IconButton, SmartImage, SmartText} from "@/src/shared/components/atoms";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Header} from "@/src/shared/components/molecules";
import {pallete} from "@/src/utils/pallete";
import {Bell} from "lucide-react-native";
import React from "react";
import {FlatList, StyleSheet, TouchableOpacity, View,} from "react-native";
import {useRouter} from "expo-router";
import AdsCarousel from "../../../shared/components/organims/AdsCarousel.organims";
import {height, width} from "@/src/utils/method";

const sizeIcon = 32
const homeMenu = [
    {
        key: "sendMoneyToWallet",
        icon: <MaterialCommunityIcons name="arrow-top-right" size={sizeIcon} color={pallete.white}/>,
        title: "Envoi \nd'argent",
        link: "/sendMoneyToWallet",
    },
    {
        key: "withdrawCash",
        icon: <MaterialIcons name="call-received" size={sizeIcon} color={pallete.white}/>,
        title: "Retrait \nd'argent",
        link: "/withdrawCash",
    },


    {
        key: "loadWallet",
        icon: <MaterialCommunityIcons name="credit-card-plus-outline" size={sizeIcon} color={pallete.white}/>,
        title: "Approv. \nSmart",
        link: "/loadWallet",
    },
    {
        key: "topup",
        icon: <MaterialCommunityIcons name="cellphone-dock" size={sizeIcon} color={pallete.white}/>,
        title: "Recharge \ncrédit",
        link: "/",
    },
    {
        key: "child",
        icon: <MaterialCommunityIcons name="account-child" size={sizeIcon} color={pallete.white}/>,
        title: "Création \nDépendant",
        link: "/(children)/createChildren",
    },

]

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
            <AdsCarousel ads={[1, 2, 3, 4]}/>
            <View

                style={styles.menuContainer}>
                <SmartText style={styles.menuTitle}>Nos Services</SmartText>
                <View style={styles.menuStyle}>
                    {
                        homeMenu.map((item, index) => <TouchableOpacity key={index}
                                                                        style={styles.menuItemStyle}
                                                                        onPress={() => navigation.navigate(item.link)}>
                            <View style={styles.iconStyle}>
                                {item.icon}
                            </View>
                            <SmartText style={styles.textIcon}>
                                {item.title}
                            </SmartText>
                        </TouchableOpacity>)
                    }
                </View>

            </View>
            <View
                style={[styles.menuContainer, {marginTop: 10, paddingBottom: 30}]}>
                <SmartText style={styles.menuTitle}>Nos Marchands</SmartText>

                <SmartText style={{paddingHorizontal:30, marginTop: 10}}>Fonctionnalité non disponible pour le moment</SmartText>
            </View>


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
    menuContainer: {
        backgroundColor: pallete.white,
        marginHorizontal: "auto",
        width: "90%",
        borderRadius: 20,
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: pallete.black,
        paddingTop: 20,
        paddingHorizontal: 30
    },
    menuStyle: {
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 15,
        padding: 20
    },
    menuItemStyle: {
        width: width / 4.2,
        height: width / 4.2,
        backgroundColor: pallete.gray,
        borderRadius: 10,
        paddingVertical: 10,
        padding: 10
    },
    iconStyle: {
        marginBottom: 10,
        borderColor: pallete.red,
        borderWidth: 2,
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: pallete.red
    },
    textIcon: { fontSize: 12, textAlign:"right", fontWeight:"600", textTransform:"capitalize"}
});
