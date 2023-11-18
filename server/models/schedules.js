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

const fetchSchedules = async (res) => {
	try {
		const schedules = await pool.query(
			`SELECT 
				S.scheduleID, 
				S.service, 
				C.clientID, 
				C.fullname as client_fullname, 
				C.phone, 
				C.address, 
				E.employeeID, 
				E.fullname as employee_fullname, 
				E.phone as employee_phone, 
				E.email 
			FROM crystal.schedules AS S 
				LEFT JOIN 
					crystal.clients AS C 
				ON 
				S.clientID = C.clientID 
				LEFT JOIN 
				crystal.employees AS E 
				ON 
				S.employeeID = E.employeeID`
		);
		res.status(200).json(schedules.rows);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching schedules, try again later." });
		console.log(error);
	}
};

const editSchedule = async (res, schedule) => {
	try {
		await pool.query(
			"UPDATE crystal.schedules SET service = $1, clientID = $2, employeeID = $3 WHERE scheduleID = $4",
			[
				schedule.service,
				schedule.clientID,
				schedule.employeeID,
				schedule.scheduleID,
			]
		);
		res.status(200).json({ message: "Schedule updated successfully!" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error updating schedule, try again later." });
		console.log(error);
	}
};

module.exports = { addSchedule, fetchSchedules, editSchedule };
