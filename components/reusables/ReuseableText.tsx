import { View, Text } from "react-native";
import React from "react";
interface TextProp {
  title: string;
  textStyle: string;
  numberOflines?: number;
}
const ReuseableText = ({ title, textStyle, numberOflines }: TextProp) => {
  return (
    <Text className={textStyle} numberOfLines={numberOflines}>
      {title}
    </Text>
  );
};

export default ReuseableText;
