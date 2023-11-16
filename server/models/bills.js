const { pool } = require("../config/db");

// Bills
// billID SERIAL NOT NULL PRIMARY KEY,
// amount INT NOT NULL,
// payment_method VARCHAR(10) NOT NULL,
// paid BOOLEAN NOT NULL,
// scheduleID INT NOT NULL REFERENCES crystal.schedules

const addBill = async (res, bill) => {
	try {
		await pool.query(
			"INSERT INTO crystal.bills (amount, payment_method, paid, scheduleID) VALUES ($1, $2, $3, $4) RETURNING *",
			[bill.amount, bill.payment_method, bill.paid, bill.scheduleID]
		);
		res.status(200).json({ message: "Bill added successfully!" });
	} catch (error) {
		res.status(500).json({ message: "Error adding bill, try again later." });
		console.log(error);
	}
};

const editBill = async (res, bill) => {
	try {
		const result = await pool.query(
			"UPDATE crystal.bills SET amount = $1, payment_method = $2, paid = $3 WHERE billID = $4",
			[bill.amount, bill.payment_method, bill.paid, bill.billID]
		);

		if (result.rowCount === 0) {
			throw new Error("Bill not found.");
		}
		res.status(200).json({ message: "Bill edited successfully!" });
	} catch (error) {
		res.status(500).json({ message: "Error editing bill, try again later." });
		console.log(error);
	}
};

module.exports = { addBill, editBill };
