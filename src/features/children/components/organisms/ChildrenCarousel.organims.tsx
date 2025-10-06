import { height } from "@/src/utils/method";
import { pallete } from "@/src/utils/pallete";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Children } from "../../services/api";
import ChildCard from "../molecules/ChildCard";

type Props = {
  children: Children[];
  currentIndex: number;
  handleMomentumScrollEnd: (event: any) => void;
};

const ChildrenCarousel = ({
  children,
  currentIndex,
  handleMomentumScrollEnd,
}: Props) => {
  if (!children.length) return null;
  return (
    <View style={styles.containerFluid}>
      <FlatList
        data={children}
        horizontal
        renderItem={({ item }) => <ChildCard child={item} />}
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
      <View style={styles.dotContainer}>
        {children.length > 1 &&
          children.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && {
                  ...styles.activeDot,
                  backgroundColor:
                    currentIndex === index ? pallete.blue : pallete.gray,
                },
              ]}
            />
          ))}
      </View>
    </View>
  );
};

export default ChildrenCarousel;

const styles = StyleSheet.create({
  containerFluid: {
    height: height / 4,
    width: "90%",
    marginHorizontal: "auto",
    marginTop: 16,
  },
  container: {
    flex: 1,
    backgroundColor: pallete.bg,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: pallete.grey,
    marginHorizontal: 4,
    opacity: 0.5,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: pallete.blue, // violet cool
    opacity: 1,
    shadowColor: pallete.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
});
