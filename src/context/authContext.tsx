import React, { createContext, ReactNode, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

interface AuthContextType {
  isLoggedIn: boolean;
  user: string;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const login = (username: string) => {
    setIsLoggedIn(true);
    setUser(username);
  };

  const logout = async () => {
    setUser("");
    setIsLoggedIn(false);

    const response = await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const loginStatus = await response.json();
    console.log(loginStatus.loggedOut);

    if (loginStatus.loggedOut) {
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
