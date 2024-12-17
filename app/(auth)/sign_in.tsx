import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/reusables/FormField";
import CustomButton from "@/components/reusables/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
interface AuthProp {
  email: string;
  password: string;
}
const SignIn = () => {
  const initialValues: AuthProp = { email: "", password: "" };
  const [form, setForm] = useState<AuthProp>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { setIsLoggedIn, setUser } = useGlobalContext();
  const submitHandler = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setIsSubmitting(true);
    try {
      const loggedUser = await signIn({
        email: form.email,
        password: form.password,
      });
      if (loggedUser) {
        const result = await getCurrentUser();
        console.log(result, "network is bad");

        // global state
        setUser(result ?? null);
        setIsLoggedIn(true);

        Alert.alert("Success", "User signed in successfully");
        router.replace("/home");
      }
      // throw new Error();
    } catch (error: any) {
      Alert.alert("Error", error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="min-h-[85vh] w-full justify-center px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px] "
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={"mt-7"}
            keyboardType={"email-address"}
            placeholder="Enter email address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={"mt-7"}
            placeholder="password"
          />
          <CustomButton
            title="Sign in"
            handlePress={submitHandler}
            isLoading={isSubmitting}
            containerStyles="mt-7"
          />
          <View className="justify-center pt-5 gap-2 flex-row">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              className="font-psemibold text-secondary text-lg"
              href={"/sign_up"}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
