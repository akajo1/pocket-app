import {Wrapper} from "@/src/shared/components";
import {Header, TabButton} from "@/src/shared/components/molecules";
import {IconButton, SmartImage} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import {Bell} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {ChildTab, ParentTab} from "@/src/shared/components/organims";
import {useRouter} from "expo-router";

const tabData = [
    {
        label: "Parrain",
        value: "parrain",
    },
    {
        label: "Dépendant",
        value: "child",
    }
]

export default function DepensesScreen(){
    const [currentTab, setCurrentTab] =  useState(tabData[0].value);
    const navigation = useRouter()

    return <Wrapper>
        <Header
            left={
                <SmartImage
                    source={images.Logo}
                    containerStyle={styles.containerLogo}
                />
            }

            title="Mes dépenses"
            right={
                <IconButton
                    icon={<Bell size={24} color={pallete.grey} />}
                    onPress={() => navigation.navigate("/notifications")}
                    size="medium"
                />
            }
        />
        <TabButton data={tabData} activeTab={currentTab} onPress={(tab) => setCurrentTab(tab)}/>
        {
            currentTab === "parrain" ? <ParentTab /> : <ChildTab/>
        }
    </Wrapper>
}

const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
    },
});