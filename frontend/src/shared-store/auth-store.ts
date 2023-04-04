import { create } from "zustand";
import { User } from "../gql";

type AuthUser = Pick<User, "id" | "username" | "email">;

interface AuthStore {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
