import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: {},
  isLoading: false,

  signIn: () => {
    console.log("Just LoggedIn");
  },
}));
