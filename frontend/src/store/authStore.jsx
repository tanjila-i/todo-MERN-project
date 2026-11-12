import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_UR || "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true;

export const userAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
}));
