import { TermItem } from "@/src/entities/auth/services/types";
import { pallete } from "@/src/utils/pallete";
import React, { useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  item: TermItem;
};

const CollapsibleItem = ({ item }: Props) => {
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.card}>
      <Pressable
        onPress={() => setOpen(!open)}
        style={styles.cardHeader}
        accessibilityRole="button"
        accessibilityLabel={`Basculer ${item.title}`}
      >
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardChevron}>{open ? "−" : "+"}</Text>
      </Pressable>

      {open && (
        <View style={styles.cardBody}>
          {item.body ? <Text style={styles.paragraph}>{item.body}</Text> : null}
          {Array.isArray(item.bullets) && item.bullets.length > 0 && (
            <View style={styles.bullets}>
              {item.bullets.map((b, i) => (
                <View key={`${item.id}-b-${i}`} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          )}
          {item.link && (
            <Pressable onPress={() => Linking.openURL(item.link!.url)}>
              <Text style={styles.link}>{item.link.label}</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
};

export default CollapsibleItem;

const styles = StyleSheet.create({
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
    color: pallete.black,
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
});
