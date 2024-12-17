import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
interface ButtonProp {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  handlePress?: () => void;
}
const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: ButtonProp) => {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-primary text-lg font-psemibold ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
