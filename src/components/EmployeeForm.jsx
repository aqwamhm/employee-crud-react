import { useState, useEffect, useContext } from "react";
import Card from "./Card";
import axios from "axios";
import { EmployeesContext } from "../context/EmployeesContext";
import { AuthContext } from "../context/AuthContext";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");

  const { positions, fetchEmployees, activeEmployee, setActiveEmployee } =
    useContext(EmployeesContext);

  const { verifyTokenIsValid } = useContext(AuthContext);

  useEffect(() => {
    if (activeEmployee) {
      setName(activeEmployee.name || "");
      setEmail(activeEmployee.email || "");
      setPosition(activeEmployee.position.id || "");
      setSalary(activeEmployee.salary || "");
    } else {
      setName("");
      setPosition("");
      setEmail("");
      setSalary("");
    }
  }, [activeEmployee]);

  const handleSave = async (e) => {
    e.preventDefault();

    verifyTokenIsValid();

    const employeeData = {
      name,
      position_id: position,
      email,
      salary: parseFloat(salary),
    };

    try {
      if (activeEmployee) {
        await axios.put(
          `http://employee-crud-api.test/api/employees/${activeEmployee.id}`,
          employeeData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://employee-crud-api.test/api/employees",
          employeeData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      setName("");
      setPosition("");
      setEmail("");
      setSalary("");
      setActiveEmployee(null);

      await fetchEmployees();
    } catch (error) {
      console.error("Failed to save employee:", error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setName("");
    setPosition("");
    setEmail("");
    setSalary("");
    setActiveEmployee(null);
  };

  return (
    <Card className="p-6 mb-6">
      <form>
        <h2 className="text-lg font-bold mb-4">
          {activeEmployee ? "Edit Employee" : "Add New Employee"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700"
            >
              Position
            </label>
            <select
              id="position"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="bg-gray-50 mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none sm:text-sm"
            >
              {!activeEmployee ? <option value="">Select Position</option> : ""}
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700"
            >
              Salary
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="bg-gray-50 mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none sm:text-sm"
            />
          </div>
        </div>
        <div className="flex gap-4">
          {activeEmployee ? (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full py-2 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSave}
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                Save
              </button>
            </>
          ) : (
            <button
              type="submit"
              onClick={handleSave}
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Add
            </button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default EmployeeForm;
