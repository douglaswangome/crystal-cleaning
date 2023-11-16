const { pool } = require("../config/db");

// Finances
// financeID SERIAL NOT NULL PRIMARY KEY,
// billID INT NOT NULL REFERENCES crystal.bills,
// employeeID INT NOT NULL REFERENCES crystal.employees,
// payroll INT NOT NULL

const addFinance = async (res, finance) => {
	try {
		await pool.query(
			"INSERT INTO crystal.finances (billID, employeeID, payroll) VALUES ($1, $2, $3) RETURNING *",
			[finance.billID, finance.employeeID, finance.payroll]
		);
		res.status(200).json({ message: "Finance added successfully!" });
	} catch (error) {
		res.status(500).json({ message: "Error adding finance, try again later." });
		console.log(error);
	}
};

module.exports = { addFinance };
