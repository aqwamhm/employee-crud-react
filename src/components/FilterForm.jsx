import { useContext, useState } from "react";
import Card from "./Card";
import { EmployeesContext } from "../context/EmployeesContext";

function FilterForm() {
  const { positions, setFilterEmployee, filterEmployee, defaultFilter } =
    useContext(EmployeesContext);

  const [name, setName] = useState(filterEmployee.name);
  const [position, setPosition] = useState(filterEmployee.position);
  const [minSalary, setMinSalary] = useState(filterEmployee.minSalary);
  const [maxSalary, setMaxSalary] = useState(filterEmployee.maxSalary);

  const handleFilter = (e) => {
    e.preventDefault();

    setFilterEmployee({
      name,
      position,
      minSalary,
      maxSalary,
    });

    console.log(filterEmployee);
  };

  const handleClearFilter = (e) => {
    e.preventDefault();

    setFilterEmployee(defaultFilter);

    setName(defaultFilter.name);
    setPosition(defaultFilter.position);
    setMinSalary(defaultFilter.minSalary);
    setMaxSalary(defaultFilter.maxSalary);
  };

  return (
    <Card className="p-6 mb-6">
      <form>
        <h2 className="text-lg font-bold mb-4">Filter Employees</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="searchName"
              className="block text-sm font-medium text-gray-700"
            >
              Search Name
            </label>
            <input
              type="text"
              id="searchName"
              name="searchName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="bg-gray-50 mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="filterPosition"
              className="block text-sm font-medium text-gray-700"
            >
              Filter by Position
            </label>
            <select
              id="filterPosition"
              name="filterPosition"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="bg-gray-50 mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none sm:text-sm"
            >
              <option value="">All Positions</option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="minSalary"
                className="block text-sm font-medium text-gray-700"
              >
                Min Salary
              </label>
              <input
                type="number"
                id="minSalary"
                name="minSalary"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                placeholder="Min salary"
                className="bg-gray-50 mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none sm:text-sm"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="maxSalary"
                className="block text-sm font-medium text-gray-700"
              >
                Max Salary
              </label>
              <input
                type="number"
                id="maxSalary"
                name="maxSalary"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                placeholder="Max salary"
                className="bg-gray-50 mt-1 p-2 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none sm:text-sm"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleFilter}
          className="py-2 px-5 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mr-3"
        >
          Filter
        </button>
        <button
          onClick={handleClearFilter}
          className="py-2 px-5 bg-slate-500 text-white font-semibold rounded-md shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200"
        >
          Clear
        </button>
      </form>
    </Card>
  );
}

export default FilterForm;
