import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { tokenIsValid } = useContext(AuthContext);

  if (tokenIsValid) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
