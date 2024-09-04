import { useContext, useState } from "react";
import Card from "./Card";
import Input from "./Input";
import { EmployeesContext } from "../context/EmployeesContext";

function FilterForm() {
  const { positions, setFilterEmployee, filterEmployee, defaultFilter } =
    useContext(EmployeesContext);

  const [name, setName] = useState(filterEmployee.name);
  const [position, setPosition] = useState(filterEmployee.position);
  const [minSalary, setMinSalary] = useState(filterEmployee.minSalary);
  const [maxSalary, setMaxSalary] = useState(filterEmployee.maxSalary);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (minSalary && isNaN(minSalary)) {
      newErrors.minSalary = "Min salary must be a number.";
    }

    if (maxSalary && isNaN(maxSalary)) {
      newErrors.maxSalary = "Max salary must be a number.";
    }

    if (
      minSalary &&
      maxSalary &&
      parseFloat(minSalary) > parseFloat(maxSalary)
    ) {
      newErrors.maxSalary = "Max salary must be greater than min salary.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFilter = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setFilterEmployee({
        name,
        position,
        minSalary,
        maxSalary,
      });
    }
  };

  const handleClearFilter = (e) => {
    e.preventDefault();

    setFilterEmployee(defaultFilter);

    setName(defaultFilter.name);
    setPosition(defaultFilter.position);
    setMinSalary(defaultFilter.minSalary);
    setMaxSalary(defaultFilter.maxSalary);
    setErrors({});
  };

  return (
    <Card className="p-6 mb-6">
      <form>
        <h2 className="text-lg font-bold mb-4">Filter Employees</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
          <Input
            label="Search Name"
            id="searchName"
            name="searchName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            error={errors.name}
          />

          <Input
            label="Filter by Position"
            id="filterPosition"
            name="filterPosition"
            as="select"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            error={errors.position}
          >
            <option value="">All Positions</option>
            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </Input>

          <Input
            label="Min Salary"
            id="minSalary"
            name="minSalary"
            type="number"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            placeholder="Min salary"
            error={errors.minSalary}
          />

          <Input
            label="Max Salary"
            id="maxSalary"
            name="maxSalary"
            type="number"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            placeholder="Max salary"
            error={errors.maxSalary}
          />
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
