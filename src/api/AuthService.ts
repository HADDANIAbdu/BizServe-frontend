/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// Fetch user information
const me = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// User login
const login = async ({ email, password }: LoginData): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/login`, { email, password });
    
    return response.data;
    
    
  } catch (error) {
    handleError(error);
  }
};

// User registration
const register = async ({
  name,
  email,
  password,
  passwordConfirmation,
}: RegisterData): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/register`, {
      username : name,
      email : email,
      password :password,
      password_confirmation: passwordConfirmation,
    });
    return response.data;
  } catch (error) {
    return handleRegistrationError(error);
  }
};

// User logout
const logout = async (): Promise<void> => {
  try {
    await axiosInstance.post(
      `/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
  } catch (error) {
    handleError(error);
  }
};

// Refresh JWT token
const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await axiosInstance.post(
      `/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

// Error handling
const handleError = (error: any): void => {
  if (axios.isAxiosError(error)) {
    console.error(error.response?.data.error || error.message);
    throw new Error(error.response?.data.error || "An error occurred");
  } else {
    throw new Error("An unexpected error occurred");
  }
};

// Handle registration errors
const handleRegistrationError = (error: any): AxiosResponse<any | any> => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response;
  } else {
    throw new Error("An unexpected error occurred");
  }
};

export { me, login, register, logout, refreshToken };
