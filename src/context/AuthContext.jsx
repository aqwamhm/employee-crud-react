import api from "../services/api";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const TokenProvider = ({ children }) => {
  const [tokenIsValid, setTokenIsValid] = useState(
    () => !!localStorage.getItem("token")
  );

  const login = (newToken, is_superadmin) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("is_superadmin", is_superadmin);
    setTokenIsValid(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_superadmin");
    setTokenIsValid(false);
  };

  const verifyTokenIsValid = async () => {
    try {
      const response = await api.get("auth/verifyToken", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.setItem("token", response.data.token);

      setTokenIsValid(true);
    } catch {
      localStorage.removeItem("token");

      setTokenIsValid(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, tokenIsValid, verifyTokenIsValid }}
    >
      {children}
    </AuthContext.Provider>
  );
};
