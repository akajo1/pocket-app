import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import React from "react";
import AuthNavigation from "@/src/entities/auth/AuthNavigation";
import {useAuthManager} from "@/src/entities/auth/hook/useAuthManager";

function LayoutContent() {
    const {user} = useAuthManager()

    const displayScreen = () => {
        if (!user) return <AuthNavigation/>;
        return (
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(dashboard)"/>
                <Stack.Screen name="notifications"/>
                <Stack.Screen name="+not-found"/>
            </Stack>
        );
    };
    return (
        <>
            <StatusBar style="auto"/>
            {displayScreen()}
        </>
    );
}

export default LayoutContent;




