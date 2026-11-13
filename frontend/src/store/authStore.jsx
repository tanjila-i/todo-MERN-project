import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_UR || "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true;

export const userAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isSigUp: false,

  signUp: async (name, email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      set({ user: response.data.user, isSigUp: true, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });

      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      set({
        user: response.data.user,
        isSigUp: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error Login",
        isLoading: false,
      });
      throw error;
    }
  },
}));
