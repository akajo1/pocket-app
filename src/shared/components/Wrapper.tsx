import {pallete} from "@/src/utils/pallete";
import React from "react";
import {Platform, SafeAreaView, StatusBar} from "react-native";

type Props = {
    children: React.ReactNode;
};

const Wrapper = ({children}: Props) => {

    return <SafeAreaView style={{
        backgroundColor: pallete.bg,
        flex: 1,
        paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }}>
        {children}
    </SafeAreaView>
};

export default Wrapper;
