import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdating: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("authorization/checkout");

      set({ authUser: response.data });
    } catch (error) {
      console.log("Error checking authentication:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("authorization/signup", data);
      set({ authUser: response.data });
      toast.success("Account signed up successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      console.error("Error signing up:", errorMessage);
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("authorization/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Error logging out:", error.response.data.message);
      toast.error("Failed to logout");
    }
  },

  login: async (data, loginMethod) => {
    set({ isLoggingIn: true });
    try {
      const payload = {
        password: data.password,
        ...(loginMethod === "username"
          ? { username: data.username }
          : { email: data.email }),
      };

      const user = await axiosInstance.post("authorization/login", payload);
      set({ authUser: user.data });
      toast.success("Logged in successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Invalid credentials. Please try again.";
      console.error("Error logging in:", errorMessage);
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
