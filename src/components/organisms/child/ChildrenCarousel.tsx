import { colors } from "@/src/lib/colors";
import { childrenStyle } from "@/src/lib/styles/childrenStyle";
import { Child } from "@/src/lib/types";
import React from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ChildCard } from "../../molecules";

type Props = {
  childrenWallets: Child[];
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  selectedChildIndex: number;
};

const ChildrenCarousel = ({
  childrenWallets,
  selectedChildIndex,
  onScroll,
}: Props) => {
  return (
    <View style={childrenStyle.childrenSection}>
      <Text style={childrenStyle.sectionTitle}>Portefeuilles des enfants</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={childrenStyle.carouselContainer}
        contentContainerStyle={childrenStyle.carouselContent}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {childrenWallets.map((wallet, index) => (
          <ChildCard child={wallet} key={index} />
        ))}
      </ScrollView>

      {/* Carousel Indicators */}
      {childrenWallets.length > 1 ? (
        <View style={childrenStyle.carouselIndicators}>
          {childrenWallets.map((_, index) => (
            <View
              key={index}
              style={[
                childrenStyle.indicator,
                {
                  backgroundColor:
                    selectedChildIndex === index ? colors.blue : colors.gray,
                },
              ]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default ChildrenCarousel;
