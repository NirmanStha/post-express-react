import { IUser } from "../../types/user.type";
import { create } from "zustand";
import { axiosInstance } from "../axios/axiosInstance";

export interface AuthApiState {
  user: Partial<IUser> | null;
  isAuth: boolean;
  accessToken?: string;
  refreshToken?: string;
  register: (user: IUser, url: string) => Promise<any>;
  login: (email: string, password: string, url: string) => Promise<any>;
  logout: () => void;
}

export const useAuthApi = create<AuthApiState>((set) => ({
  persist: true,
  user: null,
  isAuth: false,
  logout: () => set({ user: null, isAuth: false }),
  login: async (email: string, password: string, url: string) => {
    try {
      const response = await axiosInstance.post(url, { email, password });
      if (response.data) {
        set({
          user: response.data.data.safeUser,
          isAuth: true,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
      }
      return response.data;
    } catch (error: any) {
      console.error("Login Error:", error.response?.data || error.message);
      throw error;
    }
  },
  register: async (user: IUser, url: string) => {
    try {
      const response = await axiosInstance.post(url, user);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
}));
