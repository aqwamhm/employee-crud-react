import Card from "../components/Card";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { verifyTokenIsValid } = useContext(AuthContext);

  useEffect(() => {
    const verify = async () => {
      const isValid = await verifyTokenIsValid();
      if (isValid) {
        navigate("/");
      }
    };

    verify();
  }, [verifyTokenIsValid, navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://employee-crud-api.test/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;
      login(token);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Incorrect email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
            {error}
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Login</h2>
        <form className="space-y-4" onSubmit={loginHandler}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Login
          </button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
