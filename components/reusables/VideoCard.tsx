import { View, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ReuseableText from "./ReuseableText";
import { icons } from "@/constants";
import { TouchableOpacity } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { VideoData } from "@/types";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEvent } from "expo";

const VideoCard = ({
  title,
  thumbnail,
  video,
  $id,
  creator: { avatar, username },
}: VideoData) => {
  const [play, setPlay] = useState<boolean>(false);
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
    // player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const togglePlay = () => {
    if (isPlaying) {
      player.pause();
      console.log(isPlaying, "paused");
    } else {
      player.play();
      console.log(isPlaying, "paused");
    }
  };
  console.log(video);

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
      {isPlaying ? (
        <VideoView
          // className="w-full h-60 rounded-xl mt-3"
          style={styles.vid}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl justify-center relative items-center mt-3"
          onPress={togglePlay}
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
const styles = StyleSheet.create({
  vid: {
    height: 100,
  },
});
