import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeList.css';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [columns, setColumns] = useState({
    EID: true,
    INITIAL: true,
    FIRSTNAME: true,
    MIDDLENAME: true,
    LASTNAME: true,
    DESIGNATION: true,
    DOB: false,
    DATEOFJOINING: false,
    FULLTIMEPARTTIME: false,
    NATIONALITY: true,
    PHONE: true,
    EMAIL: true,
    CASTE: false,
    DOORNO: false,
    CITY: true,
    STATE: true,
    PINCODE: true,
    GENDER: true,
    PROFESSIONALEXPERIENCEDESIGNATION: false,
    PROFESSIONALEXPERIENCEFROM: false,
    PROFESSIONALEXPERIENCETO: false,
    LEAVEML: false,
    LEAVELOP: false,
    LEAVERH: false,
    LEAVEOOD: false,
    LEAVECL: false,
    DEPARTMENTID: false
  });

  const columnAliases = {
    EID: "Employee ID",
    INITIAL: "Initial",
    FIRSTNAME: "First Name",
    MIDDLENAME: "Middle Name",
    LASTNAME: "Last Name",
    DESIGNATION: "Designation",
    DOB: "Date of Birth",
    DATEOFJOINING: "Date of Joining",
    FULLTIMEPARTTIME: "Full-Time/Part-Time",
    NATIONALITY: "Nationality",
    PHONE: "Phone",
    EMAIL: "Email",
    CASTE: "Caste",
    DOORNO: "Door No",
    CITY: "City",
    STATE: "State",
    PINCODE: "Pincode",
    GENDER: "Gender",
    PROFESSIONALEXPERIENCEDESIGNATION: "Prof Exp Degn",
    PROFESSIONALEXPERIENCEFROM: "Prof Exp From",
    PROFESSIONALEXPERIENCETO: "Prof Exp To",
    LEAVEML: "Leave ML",
    LEAVELOP: "Leave LOP",
    LEAVERH: "Leave RH",
    LEAVEOOD: "Leave OOD",
    LEAVECL: "Leave CL",
    DEPARTMENTID: "Department ID"
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employee details');
    }
  };

  const handleColumnToggle = (column) => {
    setColumns({ ...columns, [column]: !columns[column] });
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <button onClick={fetchEmployees}>View Employees</button>

      <div className="column-selection">
        <h3>Select Columns to Display</h3>
        {Object.keys(columns).map((col) => (
          <label key={col}>
            <input
              type="checkbox"
              checked={columns[col]}
              onChange={() => handleColumnToggle(col)}
            />
            {columnAliases[col] || col} {/* Display alias name or original if no alias */}
          </label>
        ))}
      </div>

      <table border="1" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            {Object.keys(columns).map(
              (col) =>
                columns[col] && <th key={col}>{columnAliases[col]}</th> // Display alias name
            )}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.EID}>
              {Object.keys(columns).map(
                (col) =>
                  columns[col] && <td key={col}>{employee[col] || 'N/A'}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManagement;
