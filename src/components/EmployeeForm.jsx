import { useState, useEffect, useContext } from "react";
import Card from "./Card";
import axios from "axios";
import { EmployeesContext } from "../context/EmployeesContext";
import { AuthContext } from "../context/AuthContext";
import Input from "./Input";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");

  const [errors, setErrors] = useState({});

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
    setErrors({});
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
      setErrors({});

      await fetchEmployees();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Failed to save employee:", error);
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setName("");
    setPosition("");
    setEmail("");
    setSalary("");
    setActiveEmployee(null);
    setErrors({});
  };

  return (
    <Card className="p-6 mb-6">
      <form>
        <h2 className="text-lg font-bold mb-4">
          {activeEmployee ? "Edit Employee" : "Add New Employee"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <Input
            label="Name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            error={errors.name ? errors.name[0] : ""}
          />

          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            error={errors.email ? errors.email[0] : ""}
          />

          <Input
            label="Position"
            id="position"
            name="position"
            as="select"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            error={errors.position_id ? errors.position_id[0] : ""}
          >
            {!activeEmployee ? <option value="">Select Position</option> : ""}
            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </Input>

          <Input
            label="Salary"
            id="salary"
            name="salary"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter salary"
            error={errors.salary ? errors.salary[0] : ""}
          />
        </div>
        {activeEmployee ? (
          <>
            <button
              type="submit"
              onClick={handleSave}
              className="py-2 px-5 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mr-3"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-5 bg-slate-500 text-white font-semibold rounded-md shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="submit"
            onClick={handleSave}
            className="py-2 px-5 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Add
          </button>
        )}
      </form>
    </Card>
  );
};

export default EmployeeForm;
