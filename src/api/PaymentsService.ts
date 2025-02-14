import axios from "axios";
import { Client } from "./Clients";
import { Service } from "./ServicesService";
import axiosInstance from "./axiosInstance";

const apiUrl = process.env.REACT_APP_API_URL;

export interface Payment {
  id: number;
  client: Client;
  service: Service;
  total_amount: number;
  payment_schedules: any[];
}

export interface CreatePayment extends Omit<Payment, "id"> {
  client_id: number;
  service_id: number;
  total_amount: number;
}

export interface UpdatePayment extends Partial<Omit<Payment, "id">> {
  client_id?: number;
  service_id?: number;
  total_amount?: number;
}

// Get all payments
const getAllPayments = async (currentPage: number = 1): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `${apiUrl}/payments?page=${currentPage}`
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

// Get a single payment by ID
const getPaymentById = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/payments/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Get deleted (trashed) payments
const getDeletedPayments = async (currentPage: number = 1): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `${apiUrl}/payments/trashed?page=${currentPage}`
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

// Update a payment by ID
const updatePayment = async (
  id: number,
  paymentData: UpdatePayment
): Promise<any> => {
  try {
    const updatedPayment = {
      client_id: paymentData.client_id,
      service_id: paymentData.service_id,
      total_amount: paymentData.total_amount,
    };

    const response = await axiosInstance.put(
      `${apiUrl}/payments/${id}`,
      updatedPayment
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

// Create a new payment
const createNewPayment = async (payment: CreatePayment): Promise<any> => {
  try {
    const response = await axiosInstance.post(`${apiUrl}/payments`, {
      client_id: payment.client_id,
      service_id: payment.service_id,
      total_amount: payment.total_amount,
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

// Restore a deleted payment
const restorePayment = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.patch(
      `${apiUrl}/payments/${id}/restore`
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

// Delete a payment by ID
const deletePayment = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/payments/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Permanently delete a payment
const forceDeletePayment = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.delete(
      `${apiUrl}/payments/${id}/force-delete`
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

export {
  getAllPayments,
  getPaymentById,
  getDeletedPayments,
  createNewPayment,
  updatePayment,
  deletePayment,
  restorePayment,
  forceDeletePayment,
};
