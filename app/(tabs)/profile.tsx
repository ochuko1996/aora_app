import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyState, InfoBox, VideoCard } from "@/components";
import useFetchPosts from "@/hooks/useFetchPosts";
import { getUserPosts, signOut } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Image } from "react-native";
import { icons } from "@/constants";

const Profile = () => {
  const { user, setIsLoggedIn, setUser } = useGlobalContext();
  const { data: posts, refetch } = useFetchPosts({
    fn: () => getUserPosts(user?.$id || ""),
  });
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign_in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username || "user"}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="mt-5 flex-row  ">
              <InfoBox
                title={`${posts.length}` || "0"}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-lg"
              />
              <InfoBox
                title={"1.2k"}
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
