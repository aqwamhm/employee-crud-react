import { createContext, useState } from "react";
import axios from "axios";

export const EmployeesContext = createContext();

export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [positions, setPositions] = useState([]);

  const defaultFilter = {
    name: "",
    position: "",
    minSalary: 0,
    maxSalary: 999999,
  };

  const [filterEmployee, setFilterEmployee] = useState(defaultFilter);

  const fetchEmployees = async () => {
    const is_superadmin = localStorage.getItem("is_superadmin");

    const superadminEndpoint =
      "http://employee-crud-api.test/api/employees/sortedBySalary";
    const adminEndpoint = "http://employee-crud-api.test/api/employees";
    const endpoint = is_superadmin == 1 ? superadminEndpoint : adminEndpoint;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployees(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await axios.get(
        "http://employee-crud-api.test/api/positions",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPositions(response.data.data);
    } catch (error) {
      console.error("Failed to fetch positions:", error);
    }
  };

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        setEmployees,
        activeEmployee,
        setActiveEmployee,
        positions,
        setPositions,
        fetchEmployees,
        fetchPositions,
        filterEmployee,
        setFilterEmployee,
        defaultFilter,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};
