import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isSigningIn: false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      set({ authUser: response.data?.data?.user });
    } catch (error) {
      console.log("Error in auth check: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data?.data?.user });
      toast.success(response.data?.message || "User signup successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  signIn: async (data) => {
    set({ isSigningIn: true });
    try {
      const response = await axiosInstance.post("/auth/signin", data);
      set({ authUser: response.data?.data?.user });
      toast.success(response.data?.message || "Signed in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isSigningIn: false });
    }
  },

  signOut: async () => {
    try {
      const response = axiosInstance.post("/auth/signout");
      set({ authUser: null });
      toast.success(response.data?.message || "Sign out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error signing out");
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: response.data?.data.user });
      toast("profile updated successfully");
    } catch (error) {
      console.log("Error updating profile pic: ", error);
      toast.error("Something went wrong");
    }
  },
}));
