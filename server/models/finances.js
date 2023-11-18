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
			[finance.billID, finance.employeeID, 0]
		);
		res.status(200).json({ message: "Finance added successfully!" });
	} catch (error) {
		res.status(500).json({ message: "Error adding finance, try again later." });
		console.log(error);
	}
};

const fetchFinances = async (res) => {
	try {
		const finances = await pool.query(
			`SELECT 
				F.financeID, 
				F.payroll, 
				B.billID,
				B.amount,
				B.payment_method,
				B.paid,
				E.employeeID,
				E.fullname,
				E.phone,
				E.email
			FROM 
				crystal.finances AS F
				LEFT JOIN 
				crystal.bills AS B
					ON F.billID = B.billID
				LEFT JOIN
				crystal.employees AS E
					ON F.employeeID = E.employeeID`
		);
		res.status(200).json(finances.rows);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching finances, try again later." });
		console.log(error);
	}
};

const editFinance = async (res, finance) => {
	try {
		await pool.query(
			"UPDATE crystal.finances SET payroll = $1 WHERE financeID = $2",
			[finance.payroll, finance.financeID]
		);
		res.status(200).json({ message: "Finance updated successfully!" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error updating finance, try again later." });
		console.log(error);
	}
};

module.exports = { addFinance, fetchFinances, editFinance };
