import { useContext } from "react";
import Card from "./Card";
import api from "../services/api";
import { EmployeesContext } from "../context/EmployeesContext";
import { AuthContext } from "../context/AuthContext";

function EmployeeTable() {
  const { employees, fetchEmployees, setActiveEmployee, filterEmployee } =
    useContext(EmployeesContext);

  const { verifyTokenIsValid } = useContext(AuthContext);

  const deleteEmployee = async (id) => {
    verifyTokenIsValid();

    await api.delete(`http://employee-crud-api.test/api/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchEmployees();
  };

  const handleEdit = (employee) => {
    setActiveEmployee(employee);
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  const filteredEmployees = employees.filter((employee) => {
    const nameFilter = employee.name
      .toLowerCase()
      .includes(filterEmployee.name.toLowerCase());
    const positionFilter = filterEmployee.position
      ? employee.position.id == filterEmployee.position
      : true;
    const salaryFilter =
      employee.salary >= filterEmployee.minSalary &&
      employee.salary <= filterEmployee.maxSalary;

    return nameFilter && positionFilter && salaryFilter;
  });

  return (
    <Card className="overflow-x-auto mb-14">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Salary
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.position.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${employee.salary}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default EmployeeTable;
