import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import {
  EmptyState,
  ReuseableText,
  SearchInput,
  Trending,
  VideoCard,
} from "@/components";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useFetchPosts from "@/hooks/useFetchPosts";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context/GlobalProvider";

const Home = () => {
  const { data: posts, refetch } = useFetchPosts({ fn: getAllPosts });
  const { data: latestPosts } = useFetchPosts({ fn: getLatestPosts });
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { user, setIsLoggedIn, setUser } = useGlobalContext();
  // refresh func
  const onRefresh = async () => {
    setRefreshing(true);
    // recall post....
    refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between flex-row mb-6 items-center">
              <View>
                <ReuseableText
                  textStyle="font-pmedium text-gray-100 text-sm "
                  title="Welcome Back"
                />
                <ReuseableText
                  textStyle="font-psemibold text-2xl text-white capitalise"
                  title={user?.username || "user"}
                />
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput placeholder="Search for a video topic" />
            <View className="w-full flex-1 pt-5 pb-8">
              <ReuseableText
                title="Lastest Videos"
                textStyle="text-gray-100 font-pregular mb-3 text-lg"
              />

              <Trending posts={latestPosts} />
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
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
