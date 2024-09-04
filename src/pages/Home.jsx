import { useEffect, useContext } from "react";
import Container from "../components/Container";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import FilterForm from "../components/FilterForm";
import Header from "../components/Header";
import { EmployeesContext } from "../context/EmployeesContext";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { fetchEmployees, fetchPositions } = useContext(EmployeesContext);
  const { verifyTokenIsValid } = useContext(AuthContext);

  useEffect(() => {
    const verifyAndFetch = async () => {
      await verifyTokenIsValid();
      fetchEmployees();
      fetchPositions();
    };

    verifyAndFetch();
  }, []);

  return (
    <>
      <Header title="Employee Management" />
      <Container>
        <FilterForm />
        <EmployeeForm />
        <EmployeeTable />
      </Container>
    </>
  );
};

export default Home;
