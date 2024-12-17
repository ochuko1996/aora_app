import { Users, VideoUploadProp } from "@/types";
import { DocumentPickerAsset } from "expo-document-picker";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Models,
  Storage,
  ImageGravity,
} from "react-native-appwrite";
const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.occodes.aora",
  projectId: "675a22e20013ad879236",
  databaseId: "675a27ed001c7456364f",
  userCollectionId: "675a28a000011471df17",
  videoCollectionId: "675a2ab2002b8f0c955b",
  storageId: "675a2df6000d976078bf",
};
const {
  platform,
  projectId,
  databaseId,
  endpoint,
  storageId,
  userCollectionId,
  videoCollectionId,
} = config;
const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform);

export const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
export const createUser = async ({
  email,
  password,
  username,
}: Partial<Users>) => {
  try {
    // console.log(email, password, username);

    if (!email) throw Error;
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });
    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async ({ email, password }: Partial<Users>) => {
  try {
    console.log(email, password);

    if (email && password) {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);
    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const searchPosts = async (
  query: string
): Promise<Models.Document[]> => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);
    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const getUserPosts = async (
  userId: string
): Promise<Models.Document[]> => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creator", userId),
    ]);
    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const getLatestPosts = async (): Promise<Models.Document[]> => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ]);
    return posts.documents;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else {
      throw new Error("Invalid the file type");
    }
    if (!fileUrl) {
      throw Error;
    }
    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const uploadFile = async (file: any, type: string) => {
  if (!file) return;
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const createVideo = async (form: VideoUploadProp) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.creator,
      }
    );
    return newPost;
  } catch (error: any) {
    throw new Error(error);
  }
};
