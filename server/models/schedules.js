const { pool } = require("../config/db");

// Schedules
// // scheduleID SERIAL PRIMARY KEY NOT NULL,
// // service VARCHAR(20) NOT NULL,
// // clientID INT NOT NULL REFERENCES crystal.clients,
// // employeeID INT NOT NULL REFERENCES crystal.employees)

const addSchedule = async (res, schedule) => {
	try {
		await pool.query(
			"INSERT INTO crystal.schedules (service, clientID, employeeID) VALUES ($1, $2, $3) RETURNING *",
			[schedule.service, schedule.clientID, schedule.employeeID]
		);
		res.status(200).json({ message: "Schedule added successfully!" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error adding schedule, try again later." });
		console.log(error);
	}
};

module.exports = { addSchedule };
