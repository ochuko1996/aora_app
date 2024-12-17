import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import ReuseableText from "./ReuseableText";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
interface EmptyProp {
  title: string;
  subtitle: string;
}
const EmptyState = ({ title, subtitle }: EmptyProp) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <ReuseableText
        title={subtitle}
        textStyle="text-sm text-gray-100 font-pmedium"
      />
      <ReuseableText
        title={title}
        textStyle="text-xl text-center font-psemibold text-white mt-2"
      />
      <CustomButton
        title="Create video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
