/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, ReactNode, useEffect } from "react";
import {
  me as apiMe,
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  refreshToken as apiRefreshToken,
} from "../api/AuthService";
import { User } from "../api/UsersService";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<any>;
  refreshToken: () => Promise<any>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("JwtToken");
      if (storedToken !== null) {
        try {
          const responseMe = await apiMe();
          setUser(responseMe.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.log("ana f 51");

          await refreshToken();
        }
      } else {
        // console.log('out');
        localStorage.removeItem("JwtToken");
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false); // Set loading to false once the check is complete
    };

    initializeAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin({ email, password });
      if (response.status === "success") {
        setToken(response.access_token);
        localStorage.setItem("JwtToken", response.access_token);
        const responseMe = await apiMe();
        setUser(responseMe.data);
        setIsAuthenticated(true);
      }

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setToken(null);
      localStorage.removeItem("JwtToken");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    try {
      const response = await apiRegister({
        name,
        email,
        password,
        passwordConfirmation,
      });
      if (response.status === "success") {
        await login(email, password);
      }
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const refreshToken = async () => {
    console.log("refreshing ....");

    try {
      const response = await apiRefreshToken();
      setToken(response);

      localStorage.removeItem("JwtToken");

      token && localStorage.setItem("JwtToken", token);
      console.log("new token ");
      console.log(token);
      const responseMe = await apiMe();
      setUser(responseMe.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      localStorage.removeItem("JwtToken");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        register,
        refreshToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
