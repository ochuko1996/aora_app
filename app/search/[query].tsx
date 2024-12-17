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
import { searchPosts } from "@/lib/appwrite";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useFetchPosts({
    fn: () => searchPosts(query),
  });
  useEffect(() => {
    refetch();
  }, [query]);

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
                  title="Search Result"
                />
                <ReuseableText
                  textStyle="font-psemibold text-2xl text-white"
                  title={`${query}`}
                />
              </View>
            </View>
            <SearchInput placeholder="Search for a video topic" />
            <View className="w-full flex-1 pt-5 pb-8">
              <ReuseableText
                title="Lastest Videos"
                textStyle="text-gray-100 font-pregular mb-3 text-lg"
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
      />
    </SafeAreaView>
  );
};

export default Search;
