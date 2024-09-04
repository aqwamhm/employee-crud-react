import { useContext } from "react";
import Container from "./Container";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

const Header = ({ title }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await api.post("auth/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } finally {
      logout();
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 mb-16">
      <Container>
        <div className="flex justify-between">
          <h1 className="text-2xl text-center">{title}</h1>
          <button
            onClick={() => handleLogout()}
            className="py-2 px-5 bg-slate-800 text-white font-semibold rounded-md shadow-md hover:bg-slate-900 focus:outline-none focus:ring-2 transition duration-200"
          >
            Logout
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
