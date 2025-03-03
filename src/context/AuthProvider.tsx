import React, { useState, useEffect } from "react";
import {
  getToken,
  removeTokenFromStorage,
  saveTokenStorage,
} from "@/service/token.service";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = getToken();

    if (token) {
      setIsAuthenticated(true);
      setAccessToken(token);
    }
  }, []);

  const login = (token: string) => {
    setIsAuthenticated(true);
    setAccessToken(token);
    saveTokenStorage(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAccessToken("");
    removeTokenFromStorage();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
