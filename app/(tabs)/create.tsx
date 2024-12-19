import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField, ReuseableText } from "@/components";
import { icons } from "@/constants";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import * as ImagePicker from "expo-image-picker";
import { VideoUploadProp } from "@/types";
import { useVideoPlayer, VideoView } from "expo-video";

const Create = () => {
  const initialValues = {
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  };
  const [uploading, setUploading] = useState<boolean>(false);
  const [form, setForm] = useState<VideoUploadProp>(initialValues);
  const { user } = useGlobalContext();
  const source = form?.video ? form?.video?.uri : "";
  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
  });

  console.log(form?.video?.uri);
  const openPicker = async (selectType: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ? ["images"] : ["videos"],
      quality: 1,
      aspect: [4, 3],
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };
  const submit = async () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
      return Alert.alert("Please fill in all the field");
    }
    setUploading(true);

    try {
      await createVideo({ ...form, creator: user?.$id });
      Alert.alert("Success", "Post uploaded");
      router.push("/home");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setForm(initialValues);
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <ReuseableText
          title="upload video"
          textStyle="text-2xl text-white font-psemibold"
        />
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video title"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <ReuseableText
            textStyle="textbase text-gray-100 font-pmedium"
            title="Upload Video"
          />
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <VideoView
                className="w-full h-60 rounded-xl mt-3"
                style={styles.vid}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
              />
            ) : (
              // <Video
              //   source={{ uri: form.video.uri }}
              //   className="w-full h-64 rounded-2xl"
              //   resizeMode={ResizeMode.COVER}
              // />
              <View className="w-full bg-black-100 rounded-2xl px-4 justify-center items-center">
                <View className="w-14 h-14 border border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <ReuseableText
            title="Thumbnail Image"
            textStyle="text-base font-pmdedium text-white"
          />
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail?.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-16 bg-black-100 rounded-2xl px-4 items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-1/2 h-1/2"
                />
                <ReuseableText
                  textStyle="text-sm text-gray-100 font-pmedium"
                  title="Choose a file"
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt ?? "Ai Prompt"}
          placeholder="The prompt you give this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          isLoading={uploading}
          containerStyles="mt-7"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  vid: {
    height: 240,
    borderRadius: 12,
  },
});
