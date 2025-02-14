import axios from "axios";
import axiosInstance from "./axiosInstance";

export interface Schedule {
  id: number;
  client: {
    id: number;
    firstname: string;
    lastname: string;
  };
  service: {
    id: number;
    name: string;
  };
  type: string;
  scheduled_at: string;
}

export interface CreateSchedule extends Omit<Schedule, "id"> {
  client_id: number;
  service_id: number;
  type: string;
  scheduled_at: string;
}

export interface UpdateSchedule extends Partial<Omit<Schedule, "id">> {
  client_id?: number;
  service_id?: number;
  type?: string;
  scheduled_at?: string;
}

const getAllSchedules = async () => {
  try {
    const response = await axiosInstance.get(`/schedules`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

const getScheduleById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/schedules/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Fetch deleted (trashed) Schedules
const getDeletedSchedules = async (currentPage: number = 1) => {
  try {
    const response = await axiosInstance.get(
      `/schedules/trashed?page=${currentPage}`
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

const updateSchedule = async (id: number, scheduleData: UpdateSchedule) => {
  try {
    const updatedService = {
      client_id: scheduleData?.client_id || undefined,
      service_id: scheduleData?.service_id || undefined,
      type: scheduleData?.type || undefined,
      scheduled_at: scheduleData?.scheduled_at || undefined,
    };

    const response = await axiosInstance.put(
      `/schedules/${id}`,
      updatedService
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

// Create a new Schedule
const createNewSchedule = async (schedule: CreateSchedule) => {
  try {
    const response = await axiosInstance.post(`/schedules`, {
      client_id: schedule.client_id,
      service_id: schedule.service_id,
      type: schedule.type,
      scheduled_at: schedule.scheduled_at,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);

      throw error.response?.data || "An error occurred";
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Restore a deleted user
const restoreSchedule = async (id: number) => {
  try {
    const response = await axiosInstance.patch(`/schedules/${id}/restore`);
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
const deleteSchedule = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/schedules/${id}`);
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
const forceDeleteSchedule = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      `/schedules/${id}/force-delete`
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
  getAllSchedules,
  getScheduleById,
  getDeletedSchedules,
  createNewSchedule,
  updateSchedule,
  deleteSchedule,
  restoreSchedule,
  forceDeleteSchedule,
};
