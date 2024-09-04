import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { tokenIsValid } = useContext(AuthContext);

  if (!tokenIsValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
