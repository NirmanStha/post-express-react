import { axiosInstance } from "../axios/axiosInstance";

import { IUser } from "../../types/user.type";
import { create } from "zustand";

export interface UserApiState {
  patchUser: (user: Partial<IUser>, url: string) => Promise<any>;
  getUsers: (url: string) => Promise<any>;
}



export const useUserApi = create<UserApiState>((set) => ({
  patchUser: async (user: Partial<IUser>, url: string) => {
    try {
      const response = await axiosInstance.patch(url, user);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getUsers: async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
}));