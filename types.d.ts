// interface VideoProp {
//   id: string;
//   title: string;
//   thumbnail: string;
//   video: string;
//   creator: {
//     username: string;
//     avatar: string;
//   };

import { ImagePickerAsset } from "expo-image-picker";

// }
interface Users {
  id: string;
  avatar: string;
  username: string;
  email: string;
  password: string;
}
interface VideoUploadProp {
  title: string;
  video: ImagePickerAsset | null;
  thumbnail: ImagePickerAsset | null;
  prompt: null | string;
  creator?: string;
}
interface VideoData {
  $collectionId?: string;
  $createdAt?: string;
  $databaseId?: string;
  $id?: string;
  $permissions?: any[]; // Adjust this type if the structure of permissions is known
  $updatedAt?: string;
  creator: Creator;
  prompt: string;
  thumbnail: string;
  title: string;
  video: string;
}

interface Creator {
  $collectionId?: string;
  $createdAt?: string;
  $databaseId?: string;
  $id: string;
  $permissions?: any[]; // Adjust this type if the structure of permissions is known
  $updatedAt?: string;
  accountId?: string;
  avatar: string;
  email: string;
  username: string;
}

interface UserAccount {
  $collectionId: string;
  $createdAt: string; // ISO 8601 format for date-time
  $databaseId: string;
  $id: string;
  $permissions: string[]; // Array of permission strings
  $updatedAt: string; // ISO 8601 format for date-time
  accountId: string;
  avatar: string; // URL for the avatar image
  email: string; // Email address
  username: string; // Username of the account
}
