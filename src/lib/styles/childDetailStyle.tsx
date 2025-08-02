import { StyleSheet } from "react-native";

export const childDetailStyle = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
    // paddingHorizontal: 20,
  },

  childDetails: {
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  quickActionsGrid3x3: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  quickActionButton3x3: {
    width: "20%",
    alignItems: "center",
    marginBottom: 16,
  },
  quickActionIcon3x3: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionLabel3x3: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
    textAlign: "center",
  },
  nfcUnavailableText: {
    fontSize: 10,
    color: "#F59E0B",
    textAlign: "center",
    marginTop: 2,
    fontStyle: "italic",
  },
  nfcSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  noDevicesContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  noDevicesText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  noDevicesSubtext: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  addNFCButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  addNFCButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  categoriesSection: {
    marginBottom: 24,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  categoryName: {
    fontSize: 16,
    color: "#374151",
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4F46E5",
  },
  transactionsSection: {
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  transactionDate: {
    fontSize: 12,
    color: "#6B7280",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
