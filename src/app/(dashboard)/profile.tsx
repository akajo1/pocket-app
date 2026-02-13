import {Wrapper} from "@/src/shared/components";
import {Header} from "@/src/shared/components/molecules";
import {IconButton, SmartImage, SmartText} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import {Bell, ChevronRight, Edit, HelpCircle, LogOut, Mail, Phone, Settings, Shield, User} from "lucide-react-native";
import {pallete} from "@/src/utils/pallete";
import React from "react";
import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {router, useRouter} from "expo-router";
import {useAuthManager} from "@/src/entities/auth/hook/useAuthManager";


export default function Profile() {
    const {logout, fetchUser: userData} = useAuthManager()
    const navigation = useRouter()
    const menuItems = [
        {
            section: "Compte",
            items: [
                {
                    icon: User,
                    label: "Informations personnelles",
                    action: "personal",
                    route: "/(profile)/personal",
                },
                {
                    icon: Shield,
                    label: "Sécurité et authentification",
                    action: "security",
                    route: "/(profile)/security",
                },
                /* {
                     icon: Bell,
                     label: "Notifications",
                     action: "notifications",
                     route: "/(profile)/notifications",
                 },*/
            ],
        },

        {
            section: "Support",
            items: [
                {
                    icon: HelpCircle,
                    label: "Centre d'aide",
                    action: "help",
                    route: "/(profile)/help",
                },
                {
                    icon: Settings,
                    label: "Paramètres",
                    action: "settings",
                    route: "/(profile)/settings",
                },
            ],
        },
    ];
    const user=  userData?.data || []
    const handleMenuPress = (item: any) => {
        if (item.route) {
            router.push(item.route);
        }
    };


    return <Wrapper>
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
            title="Mon compte"
        />

        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Profile Header */}
            <LinearGradient
                colors={[pallete.grey, "#7C3AED"]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.profileHeader}
            >
                <View style={styles.avatarContainer}>
                    <SmartText style={styles.avatar}>
                        {user?.first_name?.[0]}
                        {user?.last_name?.[0]}
                    </SmartText>
                </View>
                <SmartText style={styles.userName}>
                    {user?.first_name} {user?.last_name}
                </SmartText>
                {user?.email && <SmartText style={styles.userEmail}>{user?.email}</SmartText>}

                <View style={styles.contactInfo}>
                    <View style={styles.contactItem}>
                        <Mail size={16} color="#FFFFFF"/>
                        <SmartText style={styles.contactText}>
                            {user?.email_verified_at ? "Vérifiée" : "Non vérifiée"}
                        </SmartText>
                    </View>
                    {user?.phone && (
                        <View style={styles.contactItem}>
                            <Phone size={16} color="#FFFFFF"/>
                            <SmartText style={styles.contactText}>{`+${user.phone.slice(2)}`}</SmartText>
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.editProfileButton}
                    onPress={() => router.push("/(profile)/personal")}
                >
                    <Edit size={16} color="#FFFFFF"/>
                    <SmartText style={styles.editProfileText}>Modifier le profil</SmartText>
                </TouchableOpacity>
            </LinearGradient>


            {/* Menu Sections */}
            {menuItems.map((section, sectionIndex) => (
                <View key={sectionIndex} style={styles.menuSection}>
                    <SmartText style={styles.sectionTitle}>{section.section}</SmartText>
                    <View style={styles.menuItems}>
                        {section.items.map((item, itemIndex) => (
                            <TouchableOpacity
                                key={itemIndex}
                                style={styles.menuItem}
                                onPress={() => handleMenuPress(item)}
                            >
                                <View style={styles.menuItemLeft}>
                                    <View style={styles.menuIcon}>
                                        <item.icon size={20} color="#6B7280"/>
                                    </View>
                                    <SmartText style={styles.menuLabel}>{item.label}</SmartText>
                                </View>
                                <ChevronRight size={16} color="#9CA3AF"/>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ))}


            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
                <LogOut size={20} color="#DC2626"/>
                <SmartText style={styles.logoutText}>Se déconnecter</SmartText>
            </TouchableOpacity>

            {/* App Version */}
            <SmartText style={styles.versionText}>Version 1.0.0</SmartText>
        </ScrollView>
    </Wrapper>
}

const styles = StyleSheet.create({
    containerLogo: {
        width: 40,
        height: 40,
        alignSelf: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    profileHeader: {
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    avatar: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    userName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 16,
        color: "#FFFFFF",
        opacity: 0.9,
        marginBottom: 16,
    },
    contactInfo: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
        marginBottom: 16,
    },
    contactItem: {
        flexDirection: "row",
        alignItems: "center",
    },
    contactText: {
        color: "#FFFFFF",
        fontSize: 14,
        marginLeft: 6,
        opacity: 0.9,
    },
    editProfileButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    editProfileText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 6,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#FFFFFF",
        marginHorizontal: 20,
        borderRadius: 16,
        paddingVertical: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statItem: {
        alignItems: "center",
    },
    statValue: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: "#6B7280",
        textAlign: "center",
    },
    menuSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 12,
        paddingHorizontal: 20,
    },
    menuItems: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 20,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    menuItemLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    menuIcon: {
        marginRight: 16,
    },
    menuLabel: {
        fontSize: 16,
        color: "#111827",
        fontWeight: "500",
    },
    securityBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DCFCE7",
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    securityText: {
        marginLeft: 12,
        flex: 1,
    },
    securityTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#059669",
        marginBottom: 2,
    },
    securityDescription: {
        fontSize: 14,
        color: "#047857",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FEF2F2",
        marginHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    logoutText: {
        fontSize: 16,
        color: "#DC2626",
        fontWeight: "600",
        marginLeft: 8,
    },
    versionText: {
        textAlign: "center",
        fontSize: 14,
        color: "#9CA3AF",
        marginBottom: 20,
    },
});