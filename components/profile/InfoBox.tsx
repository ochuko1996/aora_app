import { View, Text } from "react-native";
import React from "react";
import { ReuseableText } from "@/components";
interface InfoBoxProps {
  title: string;
  subtitle?: string;
  titleStyles: string;
  containerStyles?: string;
}
const InfoBox = ({
  containerStyles,
  title,
  titleStyles,
  subtitle,
}: InfoBoxProps) => {
  return (
    <View className={containerStyles}>
      <ReuseableText
        title={title}
        textStyle={`text-white text-center font-psemibold ${titleStyles}`}
      />
      <ReuseableText
        title={subtitle || ""}
        textStyle={`text-gray-100 text-sm font-pregular ${titleStyles}`}
      />
    </View>
  );
};

export default InfoBox;
