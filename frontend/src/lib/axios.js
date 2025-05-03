import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
});

// DELETE message by ID
export const deleteMessage = async (id) => {
  try {
    const response = await axiosInstance.delete(`/messages/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Delete failed" };
  }
};
