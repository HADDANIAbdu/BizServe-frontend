import axios from "axios";
import axiosInstance from "./axiosInstance";

export interface Permission {
  id?: number;
  name?: string;
  context?: string;
}

export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

export interface CreateRole extends Omit<Role, "id"> {
  permissions: Permission[];
}

export interface UpdateRole extends Partial<Omit<Role, "id">> {
  permissions?: Permission[];
}

// Get all roles
const getAllRoles = async (currentPage: number = 1): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/roles?page=${currentPage}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

const getAllPermissions = async () => {
  try {
    const response = await axiosInstance.get(`/permissions`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Fetch a single role by ID
const getRoleById = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/roles/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Fetch deleted (trashed) roles
const getDeletedRoles = async (currentPage: number = 1): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `/roles/trashed?page=${currentPage}`
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

// Update a role by ID
const updateRole = async (id: number, roleData: UpdateRole): Promise<any> => {
  try {
    const updatedRole = {
      name: roleData.name,
      permissions: roleData.permissions?.map((permission) => permission.id),
    };

    const response = await axiosInstance.put(`/roles/${id}`, updatedRole);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Create a new role
const createNewRole = async (role: CreateRole): Promise<any> => {
  try {
    const response = await axiosInstance.post(`/roles`, {
      name: role.name,
      permissions: role.permissions.map((permission) => permission.id),
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

// Restore a deleted role
const restoreRole = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.patch(`/roles/${id}/restore`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Delete a role by ID
const deleteRole = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`/roles/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Permanently delete a role
const forceDeleteRole = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`/roles/${id}/force-delete`);
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
  getAllRoles,
  getAllPermissions,
  getRoleById,
  getDeletedRoles,
  createNewRole,
  updateRole,
  deleteRole,
  restoreRole,
  forceDeleteRole,
};
