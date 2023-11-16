const { pool } = require("../config/db");

// Credentials
// employeeID INT NOT NUll REFERENCES crystal.employees,
// password VARCHAR(10) NOT NULL PRIMARY KEY

const addCredentials = async (res, credentials) => {
	try {
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
			"SELECT * FROM crystal.credentials WHERE employeeID = $1 AND password = $2",
			[credentials.employeeID, credentials.password]
		);
		if (result.rowCount === 0) {
			throw new Error("Credentials not found.");
		}
		res.status(200).json({ message: "Credentials found!" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error getting credentials, try again later." });
		console.log(error);
	}
};

module.exports = { addCredentials, fetchCredentials };
