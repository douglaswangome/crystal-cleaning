// useState is a hook that allows you to have state variables in functional components
import { useState } from "react";
// useLoaderData is a hook that allows you to access the data passed from the server
// useNavigate is a hook that allows you to navigate between pages
import { useLoaderData, useNavigate } from "react-router-dom";
// api - a file that contains all the api calls
import { api } from "../routes/routes";
// Header - a component that contains the header of the application
import Header from "../components/Header";
// Modal - a component that contains the modal of the application
import Modal from "../components/Modal";
// BsCheckCircle, BsXCircle - icons from react-icons
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
// useSelector - a hook that allows us to select a state from the redux store
import { useSelector } from "react-redux";
// notify - a function that displays a toast notification
import notify from "../fn/notify";

const Home = () => {
	const navigate = useNavigate();
	// user - a state from the redux store that contains the user information
	const { roles } =
		useSelector((state) => state.user.user) ||
		JSON.parse(localStorage.getItem("user")) ||
		"employee";
	// bills - a state from the server that contains all the bills
	// clients - a state from the server that contains all the clients
	// employees - a state from the server that contains all the employees
	// finances - a state from the server that contains all the finances
	// schedules - a state from the server that contains all the schedules
	const { bills, clients, employees, finances, schedules } = useLoaderData();

	const [currentTable, setCurrentTable] = useState(
		roles === "manager"
			? "clients"
			: roles === "receptionist"
			? "employees"
			: roles === "auditor"
			? "employees"
			: roles === "employees" && "schedules"
	);
	const changeCurrentTable = (name) => {
		setCurrentTable(name);
	};

	// Client
	// showClientModal - a state that determines whether to show or hide the client modal
	const [showClientModal, setShowClientModal] = useState(false);
	// handleClientModal - a function that toggles the client modal
	const handleClientModal = () => {
		setShowClientModal(!showClientModal);
	};
	// newClient - a state that contains the new client information
	const [newClient, setNewClient] = useState({
		fullname: "",
		phone: "",
		address: "",
	});
	// handleClient - a function that updates the newClient state
	const handleClient = (e) => {
		setNewClient({ ...newClient, [e.target.name]: e.target.value });
	};
	const submitClient = async () => {
		try {
			const response = await api.post("/clients/add", { client: newClient });
			notify(response.status, response.data.message);
		} catch (err) {
			notify(err.response.status, err.response.data.message);
		} finally {
			navigate(0);
			setNewClient({
				fullname: "",
				phone: "",
				address: "",
			});
			handleClientModal();
		}
	};

	// Employee
	// showEmployeeModal - a state that determines whether to show or hide the employee modal
	const [showEmployeeModal, setShowEmployeeModal] = useState(false);
	// handleEmployeeModal - a function that toggles the employee modal
	const handleEmployeeModal = () => {
		setShowEmployeeModal(!showEmployeeModal);
	};
	// newEmployee - a state that contains the new employee information
	const [newEmployee, setNewEmployee] = useState({
		fullname: "",
		phone: "",
		email: "",
		role: "employee",
	});
	// handleEmployee - a function that updates the newEmployee state
	const handleEmployee = (e) => {
		setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
	};
	// submitEmployee - a function that submits the new employee information to the server
	const submitEmployee = async () => {
		try {
			let response;
			if (newEmployee.employeeID !== undefined) {
				response = await api.put("/employees/update", {
					employee: newEmployee,
				});
			} else {
				response = await api.post("/employees/add", { employee: newEmployee });
			}
			notify(response.status, response.data.message);
		} catch (err) {
			notify(err.response.status, err.response.data.message);
		} finally {
			navigate(0);
			setNewEmployee({
				fullname: "",
				phone: "",
				email: "",
				password: "",
				role: "",
			});
			handleEmployeeModal();
		}
	};
	// editEmployee - a function that updates the newEmployee state with the employee information
	const editEmployee = (employee) => {
		setNewEmployee({
			employeeID: employee.employeeid,
			fullname: employee.fullname,
			phone: employee.phone,
			email: employee.email,
			role: employee.roles,
		});
		handleEmployeeModal();
	};
	// deleteEmployee - a function that deletes the employee information from the server
	const deleteEmployee = async (id) => {
		try {
			const response = await api.delete(`/employees/delete?employeeID=${id}`);
			notify(response.status, response.data.message);
		} catch (err) {
			notify(err.response.status, err.response.data.message);
		}
	};

	// Schedule
	// showScheduleModal - a state that determines whether to show or hide the schedule modal
	const [showScheduleModal, setShowScheduleModal] = useState(false);
	// handleScheduleModal - a function that toggles the schedule modal
	const handleScheduleModal = () => {
		setShowScheduleModal(!showScheduleModal);
	};
	// newSchedule - a state that contains the new schedule information
	const [newSchedule, setNewSchedule] = useState({
		service: "",
		clientID: "",
		employeeID: "",
	});
	// handleSchedule - a function that updates the newSchedule state
	const handleSchedule = (e) => {
		setNewSchedule({ ...newSchedule, [e.target.name]: e.target.value });
	};
	// submitSchedule - a function that submits the new schedule information to the server
	const submitSchedule = async () => {
		try {
			let response;
			if (newSchedule.scheduleID !== undefined) {
				response = await api.post("/schedules/add", { schedule: newSchedule });
			} else {
				response = await api.put("/schedules/update", {
					schedule: newSchedule,
				});
			}
			notify(response.status, response.data.message);
		} catch (err) {
			notify(err.response.status, err.response.data.message);
		} finally {
			navigate(0);
			setNewSchedule({
				service: "",
				clientID: "",
				employeeID: "",
			});
			handleScheduleModal();
		}
	};
	// editSchedule - a function that updates the newSchedule state with the schedule information
	const editSchedule = (schedule) => {
		setNewSchedule({
			scheduleID: schedule.scheduleid,
			service: schedule.service,
			clientID: schedule.clientid,
			employeeID: schedule.employeeid,
		});
		handleScheduleModal();
	};

	// Bill
	// showBillModal - a state that determines whether to show or hide the bill modal
	const [showBillModal, setShowBillModal] = useState(false);
	// handleBillModal - a function that toggles the bill modal
	const handleBillModal = () => {
		setShowBillModal(!showBillModal);
	};
	// newBill - a state that contains the new bill information
	const [newBill, setNewBill] = useState({
		amount: "",
		payment_method: "",
		paid: false,
		scheduleID: "",
		clientID: "",
		employeeID: "",
	});
	// handleBill - a function that updates the newBill state
	const handleBill = (e) => {
		const { name, value, checked, type } = e.target;
		setNewBill({ ...newBill, [name]: type === "checkbox" ? checked : value });
	};
	// submitBill - a function that submits the new bill information to the server
	const submitBill = async () => {
		let response;
		try {
			if (newBill.billID === undefined) {
				response = await api.post("/bills/add", { bill: newBill });
			} else {
				response = await api.put("/bills/update", { bill: newBill });
			}
			notify(response.status, response.data.message);
		} catch (err) {
			notify(err.response.status, err.response.data.message);
		} finally {
			navigate(0);
			setNewBill({
				amount: "",
				payment_method: "",
				paid: false,
				scheduleID: "",
				clientID: "",
				employeeID: "",
			});
			handleBillModal();
		}
	};
	// editBill - a function that updates the newBill state with the bill information
	const editBill = (bill) => {
		setNewBill({
			billID: bill.billid,
			amount: bill.amount,
			payment_method: bill.payment_method,
			paid: bill.paid,
			scheduleID: bill.scheduleid,
			clientID: bill.clientid,
			employeeID: bill.employeeid,
		});
		handleBillModal();
	};

	// Finance
	// showFinanceModal - a state that determines whether to show or hide the finance modal
	const [showFinanceModal, setShowFinanceModal] = useState(false);
	// handleFinanceModal - a function that toggles the finance modal
	const handleFinanceModal = () => {
		setShowFinanceModal(!showFinanceModal);
	};
	// newFinance - a state that contains the new finance information
	const [newFinance, setNewFinance] = useState({
		payroll: 0,
		billID: "",
		employeeID: "",
	});
	// handleFinance - a function that updates the newFinance state
	const handleFinance = (e) => {
		setNewFinance({ ...newFinance, [e.target.name]: e.target.value });
	};
	// submitFinance - a function that submits the new finance information to the server
	const submitFinance = async () => {
		try {
			let response;
			if (newFinance.financeID === undefined) {
				response = await api.post("/finances/add", { finance: newFinance });
			} else {
				response = await api.put("/finances/update", {
					finance: {
						financeID: newFinance.financeID,
						payroll: parseInt(newFinance.payroll),
					},
				});
			}
			notify(response.status, response.data.message);
		} catch (err) {
			notify(err.response.status, err.response.data.message);
		} finally {
			navigate(0);
			setNewFinance({
				payroll: "",
				billID: "",
				employeeID: "",
			});
			handleFinanceModal();
		}
	};
	// editFinance - a function that updates the newFinance state with the finance information
	const editFinance = (finance) => {
		setNewFinance({
			financeID: finance.financeid,
			payroll: finance.amount * 0.25,
			billID: finance.billid,
			employeeID: finance.employeeid,
		});
		handleFinanceModal();
	};

	return (
		<div className="relative flex flex-col gap-2 w-screen h-screen">
			<Header />
			<Modal show={showClientModal} handleShow={handleClientModal}>
				<div className="flex flex-col gap-2 w-fit min-w-[300px]">
					<div className="flex flex-col">
						<span>
							<label htmlFor="fullname">Fullname:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="fullname"
							value={newClient.fullname}
							onChange={handleClient}
							type="text"
							placeholder="Fullname"
						/>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="phone">Phone:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="phone"
							value={newClient.phone}
							onChange={handleClient}
							type="text"
							placeholder="0712345678"
						/>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="address">Address:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="address"
							value={newClient.address}
							onChange={handleClient}
							type="text"
							placeholder="XXXX-XXX-CODE"
						/>
					</div>
					<button className="p-2 bg-gray-200 w-full" onClick={submitClient}>
						<span>Add Client</span>
					</button>
				</div>
			</Modal>
			<Modal show={showEmployeeModal} handleShow={handleEmployeeModal}>
				<div className="flex flex-col gap-2 w-fit min-w-[300px]">
					<div className="flex flex-col">
						<span>
							<label htmlFor="fullname">Fullname:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="fullname"
							value={newEmployee.fullname}
							onChange={handleEmployee}
							type="text"
							placeholder="Fullname"
						/>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="phone">Phone:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="phone"
							value={newEmployee.phone}
							onChange={handleEmployee}
							type="text"
							placeholder="0712345678"
						/>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="email">Email:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="email"
							value={newEmployee.email}
							onChange={handleEmployee}
							type="email"
							placeholder="Email"
						/>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="role">Role:</label>
						</span>
						<select
							className="border border-black px-1 focus:outline-none"
							name="role"
							onChange={handleEmployee}
						>
							<option value="manager">Manager</option>
							<option value="receptionist">Receptionist</option>
							<option value="auditor">Auditor</option>
							<option value="employee">Employee</option>
						</select>
					</div>
					<button className="p-2 bg-gray-200 w-full" onClick={submitEmployee}>
						<span>
							{newEmployee.employeeID === undefined ? "Add" : "Edit"} Employee
						</span>
					</button>
				</div>
			</Modal>
			<Modal show={showScheduleModal} handleShow={handleScheduleModal}>
				<div className="flex flex-col gap-2 w-fit min-w-[300px]">
					<div className="flex flex-col">
						<span>
							<label htmlFor="service">Service:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="service"
							value={newSchedule.service}
							onChange={handleSchedule}
							type="text"
							placeholder="Service"
						/>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="clientID">Client ID:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="clientID"
							value={newSchedule.clientID}
							onChange={handleSchedule}
							type="text"
						/>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="employeeID">Employee ID:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="employeeID"
							value={newSchedule.employeeID}
							onChange={handleSchedule}
							type="text"
						/>
					</div>
					<button className="p-2 bg-gray-200 w-full" onClick={submitSchedule}>
						<span>Add Schedule</span>
					</button>
				</div>
			</Modal>
			<Modal show={showBillModal} handleShow={handleBillModal}>
				<div className="flex flex-col gap-2 w-fit min-w-[300px]">
					<div className="flex flex-col">
						<span>
							<label htmlFor="amount">Amount:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="amount"
							value={newBill.amount}
							onChange={handleBill}
							type="text"
							placeholder="Amount"
						/>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="payment_method">Payment Method:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="payment_method"
							value={newBill.payment_method}
							onChange={handleBill}
							type="text"
							placeholder="Payment Method"
						/>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="paid">Paid:</label>
						</span>
						<div className="flex gap-1">
							<input
								className="border border-black px-1 focus:outline-none"
								name="paid"
								id="paid-yes"
								checked={newBill.paid === true}
								onChange={handleBill}
								type="checkbox"
							/>
							<span>
								<label htmlFor="paid-yes">Yes</label>
							</span>
						</div>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="scheduleID">Schedule ID:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="scheduleID"
							value={newBill.scheduleID}
							onChange={handleBill}
							type="text"
						/>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="clientID">Client ID:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="clientID"
							value={newBill.clientID}
							onChange={handleBill}
							type="text"
						/>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="employeeID">Employee ID:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="employeeID"
							value={newBill.employeeID}
							onChange={handleBill}
							type="text"
						/>
					</div>
					<button className="p-2 bg-gray-200 w-full" onClick={submitBill}>
						<span>{newBill.billID === undefined ? "Add" : "Edit"} Bill</span>
					</button>
				</div>
			</Modal>
			<Modal show={showFinanceModal} handleShow={handleFinanceModal}>
				<div className="flex flex-col gap-2 w-fit min-w-[300px]">
					<div className="flex flex-col">
						<span>
							<label htmlFor="payroll">Payroll:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="payroll"
							value={newFinance.payroll}
							type="text"
							placeholder="Payroll"
							readOnly
						/>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="billID">Bill ID:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="billID"
							value={newFinance.billID}
							onChange={handleFinance}
							type="text"
						/>
					</div>
					<div className="flex flex-col">
						<span>
							<label htmlFor="employeeID">Employee ID:</label>
						</span>
						<input
							className="border border-black px-1 focus:outline-none"
							name="employeeID"
							value={newFinance.employeeID}
							onChange={handleFinance}
							type="text"
						/>
					</div>
					<button className="p-2 bg-gray-200 w-full" onClick={submitFinance}>
						<span>
							{newFinance.financeID === undefined ? "Add" : "Edit"} Finance
						</span>
					</button>
				</div>
			</Modal>
			<div className="flex gap-2 w-full px-2 h-[calc(100vh-78px)] max-[680px]:flex-col">
				<div className="flex flex-col gap-1 w-1/5 max-[680px]:w-full">
					{roles === "manager" ? (
						<>
							<div
								className={`${
									currentTable === "clients" ? "bg-gray-100" : "bg-white"
								} cursor-pointer p-2`}
								onClick={() => changeCurrentTable("clients")}
							>
								<span>Clients</span>
							</div>
							<div
								className={`${
									currentTable === "employees" ? "bg-gray-100" : "bg-white"
								} cursor-pointer p-2`}
								onClick={() => changeCurrentTable("employees")}
							>
								<span>Employees</span>
							</div>
							<div
								className={`${
									currentTable === "schedules" ? "bg-gray-100" : "bg-white"
								} cursor-pointer p-2`}
								onClick={() => changeCurrentTable("schedules")}
							>
								<span>Schedules</span>
							</div>
						</>
					) : roles === "receptionist" ? (
						<>
							<div
								className={`${
									currentTable === "employees" ? "bg-gray-100" : "bg-white"
								} cursor-pointer p-2`}
								onClick={() => changeCurrentTable("employees")}
							>
								<span>Employees</span>
							</div>
							<div
								className={`${
									currentTable === "schedules" ? "bg-gray-100" : "bg-white"
								} cursor-pointer p-2`}
								onClick={() => changeCurrentTable("schedules")}
							>
								<span>Schedules</span>
							</div>
						</>
					) : roles === "auditor" ? (
						<>
							<div
								className={`${
									currentTable === "employees" ? "bg-gray-100" : "bg-white"
								} cursor-pointer p-2`}
								onClick={() => changeCurrentTable("employees")}
							>
								<span>Employees</span>
							</div>
							<div
								className={`${
									currentTable === "bills" ? "bg-gray-100" : "bg-white"
								} cursor-pointer p-2`}
								onClick={() => changeCurrentTable("bills")}
							>
								<span>Bills</span>
							</div>
							<div
								className={`${
									currentTable === "finances" ? "bg-gray-100" : "bg-white"
								} cursor-pointer p-2`}
								onClick={() => changeCurrentTable("finances")}
							>
								<span>Finances</span>
							</div>
						</>
					) : (
						roles === "employee" && (
							<>
								<div
									className="bg-gray-100 p-2 cursor-pointer"
									onClick={() => changeCurrentTable("schedules")}
								>
									<span>Schedules</span>
								</div>
							</>
						)
					)}
				</div>
				<div className="flex-1 w-full">
					<div className="h-full">
						{currentTable === "bills" ? (
							<div className="flex flex-col p-2 divide-y gap-2 h-full overflow-y-scroll">
								<button
									className="p-2 bg-gray-200 w-fit ml-auto"
									onClick={handleBillModal}
								>
									<span>
										{newBill.billid === undefined ? "Add" : "Edit"} Bill
									</span>
								</button>
								{bills.map((bill, index) => (
									<div key={index} className="relative flex flex-col gap-1">
										<span>ID: {bill.billid}</span>
										<span>Amount: {bill.amount}</span>
										<span>Payment Method: {bill.payment_method}</span>
										<span className="flex items-center gap-1">
											Paid: {bill.paid ? <BsCheckCircle /> : <BsXCircle />}
										</span>
										<div className="flex flex-col gap-1">
											<span className="font-semibold">Schedule Details</span>
											<div className="flex gap-2 items-center ml-2">
												<span>ID: {bill.scheduleid}</span>
												<span>Service: {bill.service}</span>
											</div>
										</div>
										<div className="flex flex-col gap-1">
											<span className="font-semibold">Client Details</span>
											<div className="flex gap-2 items-center ml-2">
												<span>ID: {bill.clientid}</span>
												<span>Fullname: {bill.client_fullname}</span>
												<span>Phone: {bill.phone}</span>
												<span>Address: {bill.address}</span>
											</div>
										</div>
										<div className="flex flex-col gap-1">
											<span className="font-semibold">Employee Details</span>
											<div className="flex gap-2 items-center ml-2">
												<span>ID: {bill.employeeid}</span>
												<span>Fullname: {bill.employee_fullname}</span>
												<span>Email: {bill.email}</span>
												<span>Phone: {bill.employee_phone}</span>
											</div>
										</div>
										{roles === "auditor" && (
											<div className="flex flex-col gap-1 absolute top-2 right-2 w-fit p-2">
												<button
													className="bg-green-400 text-white p-1"
													onClick={() => editBill(bill)}
												>
													<span>Edit</span>
												</button>
											</div>
										)}
									</div>
								))}
							</div>
						) : currentTable === "clients" ? (
							<div className="flex flex-col p-2 divide-y gap-2 h-full overflow-y-scroll">
								<button
									className="p-2 bg-gray-200 w-fit ml-auto"
									onClick={handleClientModal}
								>
									<span>Add Client</span>
								</button>
								{clients.map((client, index) => (
									<div key={index} className="flex flex-col gap-1">
										<span>ID: {client.clientid}</span>
										<span>Fullname: {client.fullname}</span>
										<span>Phone: {client.phone}</span>
										<span>Address: {client.address}</span>
									</div>
								))}
							</div>
						) : currentTable === "employees" ? (
							<div className="flex flex-col p-2 divide-y gap-2 h-full overflow-y-scroll">
								{roles === "manager" && (
									<button
										className="p-2 bg-gray-200 w-fit ml-auto"
										onClick={handleEmployeeModal}
									>
										<span>Add Employee</span>
									</button>
								)}
								{employees.map((employee, index) => (
									<div key={index} className="relative flex flex-col gap-1">
										<span>ID: {employee.employeeid}</span>
										<span>Fullname: {employee.fullname}</span>
										<span>Phone: {employee.phone}</span>
										<span>Email: {employee.email}</span>
										<span className="capitalize">Role: {employee.roles}</span>
										{roles === "manager" && (
											<div className="flex flex-col gap-1 absolute top-2 right-2 w-fit p-2">
												<button
													className="bg-green-400 text-white p-1"
													onClick={() => editEmployee(employee)}
												>
													<span>Edit</span>
												</button>
												<button
													className=" bg-red-400 text-white p-1"
													onClick={() => deleteEmployee(employee.employeeid)}
												>
													<span>Delete</span>
												</button>
											</div>
										)}
									</div>
								))}
							</div>
						) : currentTable === "finances" ? (
							<div className="flex flex-col p-2 divide-y gap-2">
								{roles === "auditor" && (
									<button
										className="p-2 bg-gray-200 w-fit ml-auto"
										onClick={handleFinanceModal}
									>
										<span>Add Finance</span>
									</button>
								)}
								{finances.map((finance, index) => (
									<div key={index} className="relative flex flex-col gap-1">
										<span>ID: {finance.financeid}</span>
										<span>Payroll: {finance.payroll}</span>
										<div className="flex flex-col gap-1">
											<span className="font-semibold">Bill Details</span>
											<div className="flex gap-2 items-center ml-2">
												<span>ID: {finance.billid}</span>
												<span>Amount: {finance.amount}</span>
												<span className="capitalize">
													Payment Method: {finance.payment_method}
												</span>
												<span className="flex items-center gap-1">
													Paid:
													{finance.paid ? <BsCheckCircle /> : <BsXCircle />}
												</span>
											</div>
										</div>
										<div className="flex flex-col gap-1">
											<span className="font-semibold">Employee Details</span>
											<div className="flex gap-2 items-center ml-2">
												<span>ID: {finance.employeeid}</span>
												<span>Fullname: {finance.fullname}</span>
												<span>Email: {finance.email}</span>
												<span>Phone: {finance.phone}</span>
											</div>
										</div>
										{roles === "auditor" && (
											<div className="flex flex-col gap-1 absolute top-2 right-2 w-fit p-2">
												<button
													className="bg-green-400 text-white p-1"
													onClick={() => editFinance(finance)}
												>
													<span>Edit</span>
												</button>
											</div>
										)}
									</div>
								))}
							</div>
						) : (
							currentTable === "schedules" && (
								<div className="flex flex-col p-2 divide-y gap-2 h-full overflow-y-scroll">
									{roles === "receptionist" && (
										<button
											className="p-2 bg-gray-200 w-fit ml-auto"
											onClick={handleScheduleModal}
										>
											<span>Add Schedule</span>
										</button>
									)}
									{schedules.map((schedule, index) => (
										<div key={index} className="flex flex-col gap-1">
											<span>ID: {schedule.scheduleid}</span>
											<span>Service: {schedule.service}</span>
											<div className="flex flex-col gap-1">
												<span className="font-semibold">Client Details</span>
												<div className="flex gap-2 items-center ml-2">
													<span>ID: {schedule.clientid}</span>
													<span>Fullname: {schedule.client_fullname}</span>
													<span>Phone: {schedule.phone}</span>
													<span>Address: {schedule.address}</span>
												</div>
											</div>
											<div className="flex flex-col gap-1">
												<span className="font-semibold">Employee Details</span>
												<div className="flex gap-2 items-center ml-2">
													<span>ID: {schedule.employeeid}</span>
													<span>Fullname: {schedule.employee_fullname}</span>
													<span>email: {schedule.email}</span>
													<span>Phone: {schedule.employee_phone}</span>
												</div>
											</div>
											{roles === "receptionist" && (
												<div className="flex flex-col gap-1 absolute top-2 right-2 w-fit p-2">
													<button
														className="bg-green-400 text-white p-1"
														onClick={() => editSchedule(schedule)}
													>
														<span>Edit</span>
													</button>
												</div>
											)}
										</div>
									))}
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
