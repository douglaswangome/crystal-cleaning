const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const http = require("http");
require("dotenv").config();

const { addClient, fetchClients, editClient } = require("./models/clients");
const {
	addEmployee,
	fetchEmployees,
	editEmployee,
	deleteEmployee,
} = require("./models/employees");
const { addSchedule } = require("./models/schedules");
const { addBill, editBill } = require("./models/bills");
const { addFinance } = require("./models/finances");
const { addCredentials, fetchCredentials } = require("./models/credentials");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
const server = http.createServer(app);

// Client Handling
app.post("/api/clients/add", (req, res) => addClient(res, req.body.client));
app.get("/api/clients/fetch", (req, res) => fetchClients(res));
app.put("/api/clients/update", (req, res) => editClient(res, req.body.client));

// Employee Handling
app.post("/api/employees/add", (req, res) =>
	addEmployee(res, req.body.employee)
);
app.get("/api/employees/fetch", (req, res) => fetchEmployees(res));
app.put("/api/employees/update", (req, res) =>
	editEmployee(res, req.body.employee)
);
app.delete("/api/employees/delete", (req, res) =>
	deleteEmployee(res, req.body.employee)
);

// Schedule Handling
app.post("/api/schedules/add", (req, res) =>
	addSchedule(res, req.body.schedule)
);

// Bill Handling
app.post("/api/bills/add", (req, res) => addBill(res, req.body.bill));
app.put("/api/bills/update", (req, res) => editBill(res, req.body.bill));

// Finance Handling
app.post("/api/finance/add", (req, res) => addFinance(res, req.body.finance));

// Credential Handling
app.post("/api/credentials/add", (req, res) =>
	addCredentials(res, req.body.credential)
); //Register
app.get("/api/credentials/fetch", (req, res) => fetchCredentials(res)); //Login

server.listen(process.env.PORT, () =>
	console.log(`Server is running on port ${process.env.PORT}`)
);
