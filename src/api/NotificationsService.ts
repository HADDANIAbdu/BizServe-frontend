/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios from "axios";
import axiosInstance from "./axiosInstance";

export interface Notification {
  id: number;
  client_id: number;
  data: string;
  type: string;
  sent_at: Date;
  read_at?: Date;
}

export interface CreateNotification extends Partial<Omit<Notification, "id">> {
  type?: string;
  sent_at?: Date;
  read_at?: Date;
}

export interface UpdateNotification extends Partial<Omit<Notification, "id">> {}

const getAllNotifications = async (currentPage: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `/notifications?page=${currentPage}`
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

const getNotificationById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

const getDeletedNotifications = async (currentPage: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `/notifications/trashed?page=${currentPage}`
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

const updateNotification = async (
  id: number,
  notificationData: UpdateNotification
) => {
  try {
    const updatedNotification = {
      client_id: notificationData.client_id,
      type: notificationData.type,
      data: notificationData.data,
      sent_at: notificationData.sent_at,
      read_at: notificationData.read_at,
    };

    const response = await axiosInstance.put(
      `/notifications/${id}`,
      updatedNotification
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

const createNewNotification = async (notification: Notification) => {
  try {
    const response = await axiosInstance.post(`/notifications`, {
      client_id: notification.client_id,
      type: notification.type,
      data: notification.data,
      sent_at: notification.sent_at,
      read_at: notification.read_at,
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

const restoreNotification = async (id: number) => {
  try {
    const response = await axiosInstance.patch(`/notifications/${id}/restore`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Delete a Notification by ID
const deleteNotification = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Permanently delete a Notification
const forceDeleteNotification = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      `/notifications/${id}/force-delete`
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
  getAllNotifications,
  getNotificationById,
  getDeletedNotifications,
  createNewNotification,
  updateNotification,
  deleteNotification,
  restoreNotification,
  forceDeleteNotification,
};

// laravel mixte
