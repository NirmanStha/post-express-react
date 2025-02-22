import { IUser } from "../../types/user.type";
import { create } from "zustand";
import { axiosInstance } from "../axios/axiosInstance";

export interface AuthApiState {
  user: IUser | null;
  isAuth: boolean;
  accessToken?: string;
  refreshToken?: string;
  register: (user: IUser, url: string) => Promise<any>;
  login: (email: string, password: string, url: string) => Promise<any>;
  logout: () => void;
}

export const useAuthApi = create<AuthApiState>((set) => ({
  user: null,
  isAuth: false,
  logout: () => set({ user: null, isAuth: false }),
  login: async (email: string, password: string, url: string) => {
    try {
      const response = await axiosInstance.post(url, {
        email,
        password,
      });
      set({
        user: response.data.safeUser,
        isAuth: true,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      return response.data;
    } catch (error) {
      console.log(error);
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
