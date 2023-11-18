const { pool } = require("../config/db");

// Credentials
// employeeID INT NOT NUll REFERENCES crystal.employees,
// password VARCHAR(10) NOT NULL PRIMARY KEY

const addCredentials = async (res, credentials) => {
	try {
		const existingEmployee = await pool.query(
			"SELECT employeeID FROM crystal.employees WHERE employeeID = $1",
			[credentials.employeeID]
		);

		if (existingEmployee.rowCount === 0) {
			res.status(404).json({ message: "Employee not found." });
			return;
		}
		const existingCredentials = await pool.query(
			"SELECT password FROM crystal.credentials WHERE employeeID = $1",
			[credentials.employeeID]
		);
		if (existingCredentials.rowCount !== 0) {
			res.status(401).json({ message: "Credentials already exist." });
			return;
		}

		await pool.query(
			"INSERT INTO crystal.credentials (employeeID, password) VALUES ($1, $2) RETURNING *",
			[credentials.employeeID, credentials.password]
		);
		res.status(200).json({ message: "Credentials added successfully!" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error adding credentials, try again later." });
		console.log(error);
	}
};

const fetchCredentials = async (res, credentials) => {
	try {
		const result = await pool.query(
			"SELECT employeeID, password FROM crystal.credentials WHERE employeeID = $1 AND password = $2",
			[credentials.employeeID, credentials.password]
		);
		if (result.rowCount === 0) {
			res.status(404).json({ message: "Credentials not found." });
			return;
		}
		const user = await pool.query(
			"SELECT * FROM crystal.employees WHERE employeeID = $1",
			[credentials.employeeID]
		);
		res.status(200).json({ message: "Credentials found!", user: user.rows[0] });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error getting credentials, try again later." });
		console.log(error);
	}
};

module.exports = { addCredentials, fetchCredentials };
