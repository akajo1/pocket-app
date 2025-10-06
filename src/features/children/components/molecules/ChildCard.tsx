import { width } from "@/src/utils/method";
import { pallete } from "@/src/utils/pallete";
import { LinearGradient } from "expo-linear-gradient";
import { Lock, Unlock } from "lucide-react-native";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Children } from "../../services/api";

type Props = {
  child: Children;
};

const ChildCard = ({ child }: Props) => {
  console.log(child);
  return (
    <View key={child?.id} style={styles.carouselCard}>
      <LinearGradient
        colors={
          [pallete.grey, pallete.blue]
          // child?.is_active ? ["#4F46E5", "#7C3AED"] : ["#9CA3AF", "#6B7280"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.childCardGradient}
      >
        <View style={styles.childCardHeader}>
          <View style={styles.childInfo}>
            <View>
              <Text style={styles.childName}>{child?.name}</Text>
              <Text style={styles.childAge}>
                {moment(child?.age).fromNow(true)}
              </Text>
            </View>
          </View>
          <View style={styles.statusIndicator}>
            {child?.is_active ? (
              <Unlock size={16} color="#FFFFFF" />
            ) : (
              <Lock size={16} color="#FFFFFF" />
            )}
          </View>
        </View>
        <Text style={styles.childBalance}>
          {child?.currency.toLocaleLowerCase() === "usd" ? "$" : "Fc"}
          {parseFloat(child?.balance?.toString())?.toFixed(2)}
        </Text>
        <View style={styles.limitProgress}>
          <View style={styles.limitInfo}>
            <Text style={styles.limitText}>
              {child?.currency.toLocaleLowerCase() === "usd" ? "$" : "Fc"}
              {parseFloat(child?.weekly_spent?.toString()).toFixed(2)} /{" "}
              {child?.currency.toLocaleLowerCase() === "usd" ? "$" : "Fc"}
              {parseFloat(child?.weekly_limit?.toString()).toFixed(2)} cette
              semaine
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${
                    (parseFloat(child?.weekly_spent?.toString()) /
                      parseFloat(child?.weekly_limit?.toString())) *
                    100
                  }%`,
                },
              ]}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ChildCard;

const styles = StyleSheet.create({
  carouselCard: {
    width: width - 40,
    marginRight: 16,
  },
  childCard: {
    width: "100%",
  },
  childCardGradient: {
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  childCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  childInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  childAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  childName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  childAge: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
  },
  statusIndicator: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    padding: 4,
  },
  childBalance: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  limitProgress: {
    marginTop: 8,
  },
  limitInfo: {
    marginBottom: 8,
  },
  limitText: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  childDetails: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
