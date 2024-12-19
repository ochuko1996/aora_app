import { FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  EmptyState,
  ReuseableText,
  SearchInput,
  VideoCard,
} from "@/components";
import useFetchPosts from "@/hooks/useFetchPosts";
import { getAllPosts, searchPosts } from "@/lib/appwrite";

const Bookmark = () => {
  const { data: posts, refetch } = useFetchPosts({ fn: getAllPosts });

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
                  textStyle="font-psemibold text-2xl text-white"
                  title={"Bookmarked Videos"}
                />
              </View>
            </View>
            <SearchInput placeholder="Search for a video topic" />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Bookmarked Videos Found"
            subtitle="Bookmark a video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
