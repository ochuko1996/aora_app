import {
  Alert,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import { router, usePathname } from "expo-router";
interface FormProps {
  value?: string;
  placeholder: string;
}
const SearchInput = ({ value, placeholder }: FormProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  return (
    <View className="w-full border-2 border-black-200 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 flex-1 text-white font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#cdcde0"}
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );
          }
          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});
