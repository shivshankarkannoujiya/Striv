import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      set({ authUser: response.data.user });
    } catch (error) {
      console.log("Error in auth check: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true })
    try {
      const response = await axiosInstance.post("/auth/signup", data)
      set({ authUser: response.data.user });
      toast.success("User signup successfully")
    } catch (error) {
        toast.error(error.response.data.message)
    } finally {
      set({isSigningUp: false})
    }
  }
}));
