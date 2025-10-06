import React from "react";
import { Text, View } from "react-native";

type Props = {};

const QuickChildrenMenu = (props: Props) => {
  return (
    <View>
      {onQuickClick.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={childDetailStyle.quickActionButton3x3}
          onPress={() => action.onPress()}
        >
          <View
            style={[
              childDetailStyle.quickActionIcon3x3,
              { backgroundColor: action.color + "20" },
            ]}
          >
            <action.icon size={20} color={action.color} />
          </View>
          <Text style={childDetailStyle.quickActionLabel3x3}>
            {action.label}
          </Text>
          {action.label === "NFC" && !isNFCSupported && (
            <Text style={childDetailStyle.nfcUnavailableText}>
              Non disponible
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuickChildrenMenu;
