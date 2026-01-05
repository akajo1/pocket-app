import images from "@/src/assets/images";
import { Wrapper } from "@/src/shared/components";
import {
  Checkbox,
  IconButton,
  SmartImage,
} from "@/src/shared/components/atoms";
import SmartButton from "@/src/shared/components/atoms/SmartButton";
import { CollapsibleItem } from "@/src/shared/components/molecules";
import { pallete } from "@/src/utils/pallete";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  AuthNavigationProps,
  authNavigationType,
  TermItem,
  TERMS_DATA,
} from "../services/types";

const TermsTemplate = ({ onChangeScreen }: AuthNavigationProps) => {
  //   const { completeOnBoarding } = useOnBoardingStore();

  const navigation = useRouter();
  const [accepted, setAccepted] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const listRef = useRef<FlatList<TermItem>>(null);

  const data = useMemo(() => {
    const wallet = TERMS_DATA.filter((t) => t.category === "wallet");
    const subwallet = TERMS_DATA.filter((t) => t.category === "subwallet");
    return [
      { id: "g-wallet", category: "wallet", title: "— Wallet —" } as TermItem,
      ...wallet,
      {
        id: "g-subwallet",
        category: "subwallet",
        title: "— Sous‑wallets —",
      } as TermItem,
      ...subwallet,
    ];
  }, []);

  const onAccept = () => {
    // completeOnBoarding();
    onChangeScreen(authNavigationType.SIGNUP);
  };
  const renderItem: any = ({ item }) => {
    if (item.id.startsWith("g-")) {
      return (
        <View style={styles.groupHeader}>
          <Text style={styles.groupHeaderText}>{item.title}</Text>
        </View>
      );
    }
    return <CollapsibleItem item={item} />;
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
    const paddingToBottom = 24;
    const isEnd =
      contentOffset.y + layoutMeasurement.height + paddingToBottom >=
      contentSize.height;
    if (isEnd && !reachedEnd) setReachedEnd(true);
  };
  return (
    <Wrapper>
      <View style={styles.container}>
        <IconButton
          icon={<ChevronLeft />}
          onPress={() => onChangeScreen(authNavigationType.LOGIN)}
          variant="ghost"
          size="medium"
        />
        <SmartImage
          source={images.fullLogo}
          containerStyle={styles.containerLogo}
        />
        <Text style={styles.title}>Conditions Générales d'Utilisation</Text>

        <FlatList
          ref={listRef}
          data={data}
          keyExtractor={(it) => it.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          onScroll={onScroll}
          scrollEventThrottle={16}
          ListFooterComponent={<View style={{ height: 80 }} />}
          showsVerticalScrollIndicator={false}
        />

        <View
          style={[styles.footer, !reachedEnd && styles.footerDimmed]}
          accessibilityHint={
            !reachedEnd
              ? "Faites défiler jusqu'en bas pour activer l'acceptation"
              : undefined
          }
        >
          <View style={styles.acceptRow}>
            <Checkbox
              checked={accepted}
              onToggle={() => setAccepted((v) => !v)}
            />
            <Pressable onPress={() => setAccepted((acc) => !acc)}>
              <Text style={styles.acceptText}>
                J'ai lu et j'accepte les Conditions Générales d'Utilisation.
              </Text>
            </Pressable>
          </View>
          <SmartButton
            onPress={() => onAccept()}
            disabled={!accepted || !reachedEnd}
            title="Accepter et continuer"
          />
        </View>
      </View>
    </Wrapper>
  );
};

export default TermsTemplate;

const styles = StyleSheet.create({
  containerLogo: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  safe: { flex: 1, backgroundColor: pallete.blue },
  container: { flex: 1, paddingHorizontal: 16 },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: pallete.black,
    textAlign: "center",
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 14,
    color: pallete.grey,
    textAlign: "center",
    marginBottom: 8,
  },
  listContent: { paddingBottom: 16 },

  groupHeader: { paddingVertical: 8, alignItems: "center" },
  groupHeaderText: {
    color: pallete.blue,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  card: {
    backgroundColor: pallete.white,
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    shadowColor: pallete.grey,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: pallete.blue,
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
    paddingRight: 8,
  },
  cardChevron: { color: pallete.blue, fontSize: 22, paddingLeft: 12 },
  cardBody: { marginTop: 10 },
  paragraph: { color: pallete.black, fontSize: 14, lineHeight: 20 },
  bullets: { gap: 8 },
  bulletRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  bulletDot: { color: pallete.blue, lineHeight: 20 },
  bulletText: { flex: 1, color: pallete.black, lineHeight: 20 },
  link: { color: pallete.blue, textDecorationLine: "underline", marginTop: 8 },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    borderTopWidth: 1,
    backgroundColor: pallete.bg,
    borderTopColor: pallete.grey,
  },
  footerDimmed: { opacity: 0.9 },
  acceptRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  acceptText: { color: pallete.black, flex: 1, fontSize: 13 },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: pallete.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxOn: { backgroundColor: pallete.blue },
  checkboxMark: { color: pallete.blue, fontWeight: "900" },

  primaryBtn: {
    backgroundColor: pallete.blue,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnDisabled: { backgroundColor: pallete.gray },
  primaryBtnText: { color: "white", fontWeight: "700" },
});
