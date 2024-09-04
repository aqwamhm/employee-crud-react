import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const TokenProvider = ({ children }) => {
  const [tokenIsValid, setTokenIsValid] = useState(
    () => !!localStorage.getItem("token")
  );

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setTokenIsValid(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setTokenIsValid(false);
  };

  const verifyTokenIsValid = async () => {
    try {
      const response = await axios.get(
        "http://employee-crud-api.test/api/auth/verifyToken",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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
