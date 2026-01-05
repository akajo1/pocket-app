import {
    Database,
    Download,
    Globe,
    CircleHelp as HelpCircle,
    Info,
    MessageSquare,
    Moon,
    Palette,
    Star,
    Trash2, ChevronLeft,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import {Header} from "@/src/shared/components/molecules";
import {IconButton, SmartImage} from "@/src/shared/components/atoms";
import images from "@/src/assets/images";
import {pallete} from "@/src/utils/pallete";
import {Wrapper} from "@/src/shared/components";
import {useRouter} from "expo-router";

export default function SettingsScreen() {
    const navigation = useRouter()
    const [darkMode, setDarkMode] = useState(false);
    const [autoBackup, setAutoBackup] = useState(true);
    const [analytics, setAnalytics] = useState(true);
    const [crashReports, setCrashReports] = useState(true);

    const generalSettings = [
        {
            icon: Globe,
            title: "Langue",
            description: "Français",
            action: () => Alert.alert("Langue", "Sélection de langue à implémenter"),
        },
        {
            icon: Palette,
            title: "Devise",
            description: "Euro (EUR)",
            action: () => Alert.alert("Devise", "Sélection de devise à implémenter"),
        },
    ];

    const appearanceSettings = [
        {
            icon: Moon,
            title: "Mode sombre",
            description: "Utiliser le thème sombre",
            enabled: darkMode,
            onToggle: setDarkMode,
            isSwitch: true,
        },
    ];

    const dataSettings = [
        {
            icon: Database,
            title: "Sauvegarde automatique",
            description: "Sauvegarder automatiquement vos données",
            enabled: autoBackup,
            onToggle: setAutoBackup,
            isSwitch: true,
        },
        {
            icon: Info,
            title: "Partage de données analytiques",
            description: "Aider à améliorer l'application",
            enabled: analytics,
            onToggle: setAnalytics,
            isSwitch: true,
        },
        {
            icon: MessageSquare,
            title: "Rapports de crash",
            description: "Envoyer automatiquement les rapports d'erreur",
            enabled: crashReports,
            onToggle: setCrashReports,
            isSwitch: true,
        },
    ];

    const dataActions = [
        {
            icon: Download,
            title: "Exporter mes données",
            description: "Télécharger toutes vos données",
            action: () => Alert.alert("Export", "Export des données en cours..."),
            color: "#4F46E5",
        },
        {
            icon: Trash2,
            title: "Effacer le cache",
            description: "Libérer de l'espace de stockage",
            action: () => Alert.alert("Cache", "Cache effacé avec succès"),
            color: "#F59E0B",
        },
        {
            icon: Trash2,
            title: "Supprimer toutes les données",
            description: "Action irréversible",
            action: () =>
                Alert.alert(
                    "Attention",
                    "Cette action est irréversible. Êtes-vous sûr ?"
                ),
            color: "#DC2626",
        },
    ];

    const supportActions = [
        {
            icon: HelpCircle,
            title: "Centre d'aide",
            description: "FAQ et guides d'utilisation",
            action: () => Alert.alert("Aide", "Redirection vers le centre d'aide"),
        },
        {
            icon: MessageSquare,
            title: "Contacter le support",
            description: "Obtenir de l'aide personnalisée",
            action: () =>
                Alert.alert("Support", "Formulaire de contact à implémenter"),
        },
        {
            icon: Star,
            title: "Noter l'application",
            description: "Donnez votre avis sur l'App Store",
            action: () => Alert.alert("Évaluation", "Redirection vers l'App Store"),
        },
        {
            icon: Info,
            title: "À propos",
            description: "Version 1.0.0 • Conditions d'utilisation",
            action: () =>
                Alert.alert("À propos", "MyWallet v1.0.0\n\nDéveloppé avec ❤️"),
        },
    ];

    const renderSettingItem = (item: any, index: number) => (
        <View key={index} style={styles.settingItem}>
            <TouchableOpacity
                style={styles.settingContent}
                onPress={item.action}
                disabled={item.isSwitch}
            >
                <View style={styles.settingLeft}>
                    <View
                        style={[
                            styles.settingIcon,
                            {
                                backgroundColor:
                                    item.enabled !== undefined
                                        ? item.enabled
                                            ? "#EEF2FF"
                                            : "#F3F4F6"
                                        : "#F3F4F6",
                            },
                        ]}
                    >
                        <item.icon
                            size={20}
                            color={
                                item.color ||
                                (item.enabled !== undefined
                                    ? item.enabled
                                        ? "#4F46E5"
                                        : "#9CA3AF"
                                    : "#6B7280")
                            }
                        />
                    </View>
                    <View style={styles.settingText}>
                        <Text
                            style={[styles.settingTitle, item.color && { color: item.color }]}
                        >
                            {item.title}
                        </Text>
                        <Text style={styles.settingDescription}>{item.description}</Text>
                    </View>
                </View>
                {item.isSwitch && (
                    <Switch
                        value={item.enabled}
                        onValueChange={item.onToggle}
                        trackColor={{ false: "#E5E7EB", true: "#EEF2FF" }}
                        thumbColor={item.enabled ? "#4F46E5" : "#9CA3AF"}
                    />
                )}
            </TouchableOpacity>
        </View>
    );

    return (
        <Wrapper>
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
                title="Parametre"
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* App Info */}
                <View style={styles.appInfoCard}>
                    <SmartImage
                        source={images.fullLogo}
                        containerStyle={{width: 100, height: 100}}
                    />
                    <Text style={styles.appVersion}>Version 1.0.0</Text>
                </View>


                {/* Support */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support et informations</Text>
                    <View style={styles.settingsCard}>
                        {supportActions.map(renderSettingItem)}
                    </View>
                </View>


            </ScrollView>
        </Wrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    appInfoCard: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 20,
        marginVertical: 16,
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    appIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#4F46E5",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    appIconText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    appName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 4,
    },
    appVersion: {
        fontSize: 14,
        color: "#6B7280",
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 12,
        paddingHorizontal: 20,
    },
    settingsCard: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 20,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    settingItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    settingContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    settingLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    settingText: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 2,
    },
    settingDescription: {
        fontSize: 14,
        color: "#6B7280",
    },
    resetSection: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    resetButton: {
        shadowColor: "#DC2626",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    containerLogo: {
        width: 40,
        height: 40,
        alignSelf: "center",
    },
});
