import { View, Image } from "react-native";
import React, { useState } from "react";
import ReuseableText from "./ReuseableText";
import { icons } from "@/constants";
import { TouchableOpacity } from "react-native";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({
  title,
  thumbnail,
  video,
  creator: { avatar, username },
}: VideoData) => {
  const [play, setPlay] = useState<boolean>(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className=" flex-row items-center gap-3">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <ReuseableText
              title={title}
              textStyle="text-sm text-white font-psemibold"
              numberOflines={1}
            />
            <ReuseableText
              title={username}
              textStyle="text-xs text-gray-100 font-pregular"
              numberOflines={1}
            />
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} resizeMode="contain" className="h-5 w-5" />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl justify-center relative items-center mt-3"
          onPress={() => setPlay(true)}
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
