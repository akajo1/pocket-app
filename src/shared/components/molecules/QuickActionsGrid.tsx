import { pallete } from "@/src/utils/pallete";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface QuickAction {
  icon: React.ComponentType<any>;
  label: string;
  color: string;
  onPress: () => void;
}

interface QuickActionsGridProps {
  title?: string;
  actions: QuickAction[];
  currentIndex?: number;
  isChild?: boolean;
}

export default function QuickActionsGrid({
  title,
  actions,
  currentIndex,
  isChild,
}: QuickActionsGridProps) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.grid3x3}>
        {actions?.length &&
          actions?.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionButton}
              onPress={action.onPress}
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: isChild
                      ? pallete.blue
                      : currentIndex === 0
                      ? pallete.dollars
                      : pallete.franc + "90",
                  },
                ]}
              >
                <action.icon size={20} color={pallete.white} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: pallete.white,
    width: "90%",
    marginHorizontal: "auto",
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: pallete.black,
    marginBottom: 16,
  },
  grid3x3: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  actionButton: {
    width: "20%",
    alignItems: "center",
    // marginBottom: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    color: pallete.black,
    fontWeight: "600",
    textAlign: "center",
  },
});
