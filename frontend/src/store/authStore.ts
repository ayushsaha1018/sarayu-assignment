import { User } from "@/lib/types";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isDialogOpen: boolean;
  setIsDialogOpen: (val: boolean) => void;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLoggedIn: false,
  user: null,
  isDialogOpen: false,
  setIsDialogOpen: (val) => set(() => ({ isDialogOpen: val })),
  loginUser: (user) => set(() => ({ isLoggedIn: true, user })),
  logoutUser: () => set(() => ({ isLoggedIn: false, user: null })),
}));
