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

const sizeIcon = 28
const homeMenu = [
    {
        key: "sendMoneyToWallet",
        icon: <MaterialCommunityIcons name="arrow-top-right" size={sizeIcon} color={pallete.blue}/>,
        title: "Envoi d'argent",
        link: "/sendMoneyToWallet",
    },
    {
        key: "withdrawCash",
        icon: <MaterialIcons name="call-received" size={sizeIcon} color={pallete.blue}/>,
        title: "Retrait",
        link: "/withdrawCash",
    },


    {
        key: "loadWallet",
        icon: <MaterialCommunityIcons name="credit-card-plus-outline" size={sizeIcon} color={pallete.blue}/>,
        title: "Appro. Smart",
        link: "/loadWallet",
    },
    {
        key: "topup",
        icon: <MaterialCommunityIcons name="cellphone-dock" size={sizeIcon} color={pallete.blue}/>,
        title: "Achat crédit",
        link: "/",
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
            <View showsVerticalScrollIndicator={false} style={{
                flexWrap: "wrap",
                flexDirection: "row",
                gap: 15,
                justifyContent: "center"
            }}>
                {
                    homeMenu.map((item, index) => <TouchableOpacity key={index} style={{
                        width: width / 5.2,
                        height: width / 5.2,
                        backgroundColor: pallete.white,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 10,
                        padding: 10
                    }} onPress={() => navigation.navigate(item.link)}>
                        <View style={{marginBottom: 10}}>
                            {item.icon}
                        </View>
                        <SmartText style={{marginTop: 5, height: 20, fontSize: 10}}>
                            {item.title}
                        </SmartText>
                    </TouchableOpacity>)
                }
            </View>

            <View style={{flex: 1, paddingHorizontal: 20}}>


                <View style={{marginVertical: 15}}>
                    <SmartText style={{fontSize: 20, fontWeight: "600"}}>
                        Nos Marchands
                    </SmartText>
                </View>

                <FlatList
                    data={homeMenu}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 10,
                        flexDirection: "row",
                        flexWrap: "wrap"
                    }}
                    renderItem={({item}) => <TouchableOpacity>


                        <View style={{
                            width: width / 3.6,
                            height: height / 6.4,
                            backgroundColor: pallete.white,
                            borderRadius: 10,
                            padding: 10,

                            position: "relative"
                        }}>

                            <SmartText style={{fontSize: 16, fontWeight: "600", marginBottom: 10}}>
                                Jewels School
                            </SmartText>
                            <SmartText style={{fontSize: 8}}>
                                Localisation
                            </SmartText>
                            <SmartText style={{fontSize: 10, fontWeight: "600"}}>
                                Kinshasa
                            </SmartText>

                            <View style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: pallete.blue,
                                marginBottom: 20,
                                position: "absolute",
                                right: 5,
                                bottom: -10,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <FontAwesome6 name="arrow-right-long" size={14} color={pallete.white}/>
                            </View>
                        </View>
                    </TouchableOpacity>}
                />
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
});
