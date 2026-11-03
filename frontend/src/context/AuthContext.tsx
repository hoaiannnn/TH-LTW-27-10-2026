import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { User } from "../services/userApi";

interface AuthContextType {
  user: User | null;
  loginUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser || savedUser === "undefined") {
        return null;
      }

      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const loginUser = (user: User) => {
    setUser(user);

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
