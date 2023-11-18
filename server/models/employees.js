const { pool } = require("../config/db");

// Employees
// // employeeID INT NOT NULL PRIMARY KEY,
// // fullname VARCHAR(30) NOT NULL,
// // phone VARCHAR(10) NOT NULL,
// // email VARCHAR(30) NOT NULL,

const addEmployee = async (res, employee) => {
	try {
		// Await to see if employee exists
		const existingEmployee = await pool.query(
			"SELECT phone FROM crystal.employees WHERE phone = $1",
			[employee.phone]
		);

		// If employee exists, no need to add
		if (existingEmployee.rowCount > 0) {
			res.status(400).json({ message: "Employee already exists." });
			throw new Error("Employee already exists.");
		}

		// Add employee
		await pool.query(
			"INSERT INTO crystal.employees (fullname, phone, email, roles) VALUES ($1, $2, $3, $4) RETURNING *",
			[employee.fullname, employee.phone, employee.email, employee.role]
		);
		res.status(200).json({ message: "Employee added successfully!" });
	} catch (error) {
		// If error, log error
		res
			.status(500)
			.json({ message: "Error adding employee, try again later." });
		console.log(error);
	}
};

const fetchEmployees = async (res) => {
	try {
		// Get employees
		const employees = await pool.query(
			"SELECT employeeID, fullname, phone, email, roles FROM crystal.employees"
		);
		res.status(200).json(employees.rows);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error getting employees, try again later." });
		console.log(error);
	}
};

const editEmployee = async (res, employee) => {
	try {
		// Update Employee
		const result = await pool.query(
			"UPDATE crystal.employees SET fullname = $1, phone = $2, email = $3 WHERE employeeID = $4",
			[employee.fullname, employee.phone, employee.email, employee.employeeID]
		);
		res.status(200).json({ message: "Employee updated successfully!" });
	} catch (error) {
		// If error, log error
		res
			.status(500)
			.json({ message: "Error updating employee, try again later." });
		console.log(error);
	}
};

const deleteEmployee = async (res, employeeID) => {
	try {
		// delete employee
		await pool.query("DELETE FROM crystal.employees WHERE employeeID = $1", [
			employeeID,
		]);
		res.status(200).json({ message: "Employee deleted successfully!" });
	} catch (error) {
		// If error, log error
		res
			.status(500)
			.json({ message: "Error deleting employee, try again later." });
		console.log(error);
	}
};

module.exports = { addEmployee, fetchEmployees, editEmployee, deleteEmployee };
