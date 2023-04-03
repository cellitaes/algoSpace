import { useCallback, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";

import { UserData } from "../context/AuthContext";

interface AuthData {
  userId: string;
  token: string;
  tokenExpirationDate: Date;
}

let logoutTimer: NodeJS.Timeout;

const setAuthState = (
  state: AuthData,
  action: {
    type: string;
    userId: string;
    token: string;
    tokenExpirationDate: Date;
  }
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.token,
        userId: action.userId,
        tokenExpirationDate: action.tokenExpirationDate,
      };
    case "LOGOUT":
      return {
        token: action.token,
        userId: action.userId,
        tokenExpirationDate: action.tokenExpirationDate,
      };
    default:
      return state;
  }
};

export const useAuth = () => {
  const [authState, dispatch] = useReducer(setAuthState, {
    token: "",
    userId: "",
    tokenExpirationDate: new Date(),
  });

  const history = useHistory();
  const { token, tokenExpirationDate, userId } = authState;

  const login = useCallback(
    (uid: string, token: string, expirationDate?: Date) => {
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 4 * 60 * 60 * 1000);
      dispatch({
        type: "LOGIN",
        token: token,
        userId: userId,
        tokenExpirationDate: tokenExpirationDate,
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    [userId]
  );

  const logout = useCallback(() => {
    dispatch({
      type: "LOGOUT",
      token: "",
      userId: "",
      tokenExpirationDate: new Date(),
    });
    localStorage.removeItem("userData");
    history.push("/");
  }, [history]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData: UserData = JSON.parse(
      localStorage.getItem("userData") || "{}"
    );
    if (
      storedData.userId &&
      storedData.token &&
      storedData.expiration &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, isLoggedIn: !!token, login, logout, userId };
};
