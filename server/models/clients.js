const { pool } = require("../config/db");
// Client
// // clientID SERIAL PRIMARY KEY
// // fullname VARCHAR(30) NOT NULL
// // phone VARCHAR(10) NOT NULL
// // address VARCHAR(20) NOT NULL

const addClient = async (res, client) => {
	try {
		const exisingClient = await pool.query(
			"SELECT * FROM crystal.clients WHERE phone = $1",
			[client.phone]
		);

		if (exisingClient.rowCount > 0) {
			res.status(400).json({ message: "Client already exists." });
			throw new Error("Client already exists.");
		}

		await pool.query(
			"INSERT INTO crystal.clients (fullname, phone, address) VALUES ($1, $2, $3) RETURNING *",
			[client.fullname, client.phone, client.address]
		);
		res.status(200).json({ message: "Client added successfully!" });
	} catch (error) {
		res.status(500).json({ message: "Error adding client, try again later." });
		console.log(error);
	}
};

const fetchClients = async (res) => {
	try {
		const clients = await pool.query(
			"SELECT clientID, fullname, phone, address FROM crystal.clients"
		);
		res.status(200).json(clients.rows);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error getting clients, try again later." });
		console.log(error);
	}
};

const editClient = async (res, client) => {
	try {
		const result = await pool.query(
			"UPDATE crystal.clients SET fullname = $1, phone = $2, address = $3 WHERE clientID = $4",
			[client.fullname, client.phone, client.address, client.id]
		);

		if (result.rowCount === 0) {
			throw new Error("Client not found.");
		}
		res.status(200).json({ message: "Client edited successfully!" });
	} catch (error) {
		res.status(500).json({ message: "Error editing client, try again later." });
		console.log(error);
	}
};

module.exports = { addClient, editClient, fetchClients };
