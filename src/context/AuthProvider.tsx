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

  useEffect(() => {
    const token = getToken();

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    setIsAuthenticated(true);
    saveTokenStorage(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    removeTokenFromStorage();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
