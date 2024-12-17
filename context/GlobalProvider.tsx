import { getCurrentUser } from "@/lib/appwrite";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Models } from "react-native-appwrite";

// Define the shape of your context
interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: Models.Document | null;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  setUser: (value: Models.Document | null) => void;
}

// Create the context with a default value of undefined
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

// Create the provider component
interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<null | Models.Document>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = async () => {
      try {
        const res = await getCurrentUser();
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    currentUser();
  }, []);
  console.log(user);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
