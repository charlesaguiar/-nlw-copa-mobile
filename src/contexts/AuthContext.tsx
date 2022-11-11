import { createContext, useState, useEffect, useCallback } from "react";
import * as AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { useToast } from "native-base";

import { api } from "@lib/api";

WebBrowser.maybeCompleteAuthSession();

interface IUser {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface IAuthContextProviderProps {
  children: React.ReactNode;
}

export interface IAuthContextProps {
  user: IUser;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextProps);

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
  const storage = AsyncStorage.useAsyncStorage("token");

  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<IUser>({} as IUser);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  const toast = useToast();

  const sigInWithGoogle = useCallback(async (accessToken: string) => {
    try {
      setIsUserLoading(true);
      const { data } = await api.post<{ token: string }>("/google-auth/user", {
        access_token: accessToken,
      });

      await storage.setItem(data.token);

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      const { data: userData } = await api.get<{ user: IUser }>("me");
      setUser(userData.user);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsUserLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await storage.getItem();
      if (!token) return;

      try {
        setIsUserLoading(true);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const { data: userData } = await api.get<{ user: IUser }>("me");
        setUser(userData.user);
      } catch (err) {
        setUser({} as IUser);
        toast.show({
          title:
            "Não foi possível carregar os dados do usuário. Por favor, faça login novamente.",
          placement: "top",
          bgColor: "red.500",
        });
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      sigInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  const signIn = async () => {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.log({ error });
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  };

  const signOut = async () => {
    await storage.removeItem();
    setUser({} as IUser);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
