import { FC, createContext, PropsWithChildren } from "react";
import { useAuth } from "../hooks/authHook";

export type UserData = {
  userId?: string;
  token?: string;
  expiration?: string;
};

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: "",
  token: "",
  login: (uid: string, token: string, expirationDate?: Date): void => {},
  logout: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token, isLoggedIn, login, logout, userId } = useAuth();
  let storedData: UserData = JSON.parse(
    localStorage.getItem("userData") || "{}"
  );
  if (storedData.expiration && new Date(storedData?.expiration) < new Date()) {
    localStorage.removeItem("userData");
    storedData = {};
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!storedData?.token ?? isLoggedIn,
        token: storedData?.token ?? token,
        userId: storedData?.userId ?? userId,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
