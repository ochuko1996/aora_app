import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";
interface fetchPosts {
  fn: () => Promise<Models.Document[]>;
}
const useFetchPosts = ({ fn }: fetchPosts) => {
  const [data, setData] = useState<Models.Document[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      if (response) {
        setData(response);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refetch = () => fetchData();
  return {
    data,
    isLoading,
    refetch,
  };
};

export default useFetchPosts;
