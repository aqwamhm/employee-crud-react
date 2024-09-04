import { TokenProvider } from "./context/AuthContext";
import { EmployeesProvider } from "./context/EmployeesContext";
import ProtectedRoute from "./lib/ProtectedRoute";
import PublicRoute from "./lib/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        index
        element={
          <ProtectedRoute>
            <EmployeesProvider>
              <Home />
            </EmployeesProvider>
          </ProtectedRoute>
        }
      />
    </>
  )
);

function App() {
  return (
    <TokenProvider>
      <RouterProvider router={router} />
    </TokenProvider>
  );
}

export default App;
