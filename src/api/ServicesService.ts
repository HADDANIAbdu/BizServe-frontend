import axios from "axios";
import axiosInstance from "./axiosInstance";

export interface Service {
  id: number;
  name: string;
  category: string;
  duration: string;
  price: number;
  description?: string;
  clients?: string[]; // its a string because i retrieve only thier emails
}

export interface CreateService extends Omit<Service, "id"> {
  description?: string;
}

export interface UpdateService extends Partial<Omit<Service, "id">> {
  name?: string;
  category?: string;
  duration?: string;
  price?: number;
  description?: string;
}

const getAllServices = async (currentPage: number = 1) => {
  try {
    const response = await axiosInstance.get(`/services?page=${currentPage}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Fetch a single service by ID
const getServiceById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/services/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Fetch deleted (trashed) services
const getDeletedServices = async (currentPage: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `/services/trashed?page=${currentPage}`
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

// Update a service by ID
const updateService = async (id: number, serviceData: Service) => {
  try {
    const updatedService = {
      name: serviceData?.name || undefined,
      category: serviceData?.category || undefined,
      duration: serviceData?.duration || undefined,
      price: serviceData?.price || undefined,
      description: serviceData?.description || undefined,
    };

    const response = await axiosInstance.put(`/services/${id}`, updatedService);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || "An error occurred");
    } else {
      console.error("An unexpected error occurred");
    }
  }
};

// Create a new service
const createNewService = async (service: CreateService) => {
  try {
    const response = await axiosInstance.post(`/services`, service);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || "An error occurred");
    } else {
      console.error("An unexpected error occurred");
    }
  }
};

// Restore a deleted service
const restoreService = async (id: number) => {
  try {
    const response = await axiosInstance.patch(`/services/${id}/restore`, {});

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || "An error occurred");
    } else {
      console.error("An unexpected error occurred");
    }
  }
};

// Delete a service by ID
const deleteService = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/services/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || "An error occurred");
    } else {
      console.error("An unexpected error occurred");
    }
  }
};

// Permanently delete a service
const forceDeleteService = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/services/${id}/force-delete`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || "An error occurred");
    } else {
      console.error("An unexpected error occurred");
    }
  }
};

export {
  getAllServices,
  getServiceById,
  getDeletedServices,
  createNewService,
  updateService,
  deleteService,
  restoreService,
  forceDeleteService,
};
