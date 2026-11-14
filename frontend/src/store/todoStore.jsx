import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_UR || "http://localhost:5000/api/todo";
axios.defaults.withCredentials = true;

export const todoStore = create((set) => ({
  todos: [],
  isLoading: false,
  error: null,

  createTodo: async (text) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/post`, { text });
      const newTodo = response.data.todos || response.data;

      set((state) => ({
        todos: [...(state.todos || []), newTodo], // Keep old todos + add new one
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response.data.message || "Error post todo",
        isLoading: false,
      });

      throw error;
    }
  },

  allTodos: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get`);

      set({ todos: response.data.todos, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error get todos",
        isLoading: false,
      });

      throw error;
    }
  },

  deleteTodo: async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);

      set((state) => ({
        todos: state.todos.filter((todo) => (todo._id || todo.id) !== id),
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateTodo: async (id, updatedData) => {
    set({ error: null });

    try {
      const response = await axios.patch(
        `${API_URL}/update/${id}`,
        updatedData,
      );
      const updatedItem = response.data.updatedTodo;
      set((state) => ({
        todos: state.todos.map((todo) =>
          (todo._id || todo.id) === id ? updatedItem : todo,
        ),
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating todo",
      });
      throw error;
    }
  },
}));
