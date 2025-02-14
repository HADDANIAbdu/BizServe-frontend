import axios from "axios";
import axiosInstance from "./axiosInstance";
import { Role } from "./RolesService";

export interface User {
  id: number;
  username: string;
  email: string;
  roles: Role[];
}

export interface CreateUser extends Omit<User, "id"> {
  password?: string;
  passwordConfirmation?: string;
}

export interface UpdateUser extends Partial<Omit<User, "id">> {
  password?: string;
  passwordConfirmation?: string;
  roles?: Role[];
}

// Get all users
const getAllUsers = async (currentPage: number = 1): Promise<any> => {

  try {
    const response = await axiosInstance.get(`/users?page=${currentPage}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Fetch a single user by ID
const getUserById = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Fetch deleted (trashed) users
const getDeletedUsers = async (currentPage: number = 1): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/users/trashed?page=${currentPage}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Update a user by ID
const updateUser = async (id: number, userData: UpdateUser): Promise<any> => {
  try {
    const updatedUser = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.passwordConfirmation,
      roles: userData.roles?.map((role) => role.id),
    };

    const response = await axiosInstance.put(`/users/${id}`, updatedUser);
    console.log(response);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Create a new user
const createNewUser = async (user: CreateUser): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/users`, {
      username: user.username,
      email: user.email,
      password: user.password,
      password_confirmation: user.passwordConfirmation,
      roles: user.roles.map((role) => role.id),
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Restore a deleted user
const restoreUser = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.patch(`/users/${id}/restore`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Delete a user by ID
const deleteUser = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Permanently delete a user
const forceDeleteUser = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`/users/${id}/force-delete`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export {
  getAllUsers,
  getUserById,
  getDeletedUsers,
  createNewUser,
  updateUser,
  deleteUser,
  restoreUser,
  forceDeleteUser,
};
