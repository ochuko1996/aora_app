import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { ImageBackground, Image } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { icons } from "@/constants";
import { VideoData } from "@/types";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";

interface TrendingItemProp {
  activeItem: string;
  item: VideoData;
}

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};
const TrendingItem = ({ activeItem, item }: TrendingItemProp) => {
  const [play, setPlay] = useState<boolean>(false);
  const player = useVideoPlayer(item.video, (player) => {
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

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {isPlaying ? (
        <VideoView
          style={styles.vid}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center "
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
const Trending = ({ posts }: VideoData[]) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  const viewableItemsChange = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChange}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default Trending;

const styles = StyleSheet.create({
  vid: {
    height: 208,
    width: 208,
    borderRadius: 35,
    marginTop: 12,
    backgroundColor: `rgb(255 255 255 / 0.1)`,
  },
});
