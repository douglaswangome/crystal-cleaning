import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../fn/notify";
import { api } from "../routes/routes";

const Register = () => {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		employeeID: "",
		password: "",
	});

	const handleInput = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleRegister = async () => {
		try {
			const response = await api.post(`/credentials/add`, { credentials });
			notify(response.status, response.data.message);
			navigate("/");
		} catch (error) {
			notify(error.response.status, error.response.data.message);
			if (error.response.status === 401) {
				navigate("/");
			}
		}
	};
	return (
		<div className="flex flex-col justify-center items-center w-screen h-screen">
			<div className="flex flex-col gap-2 w-fit min-w-[300px]">
				<img
					className="bg-[#0f93fe] p-2 h-[40px] w-[40px] mx-auto object-contain rounded-full"
					src="/images/logo.png"
					alt="logo"
				/>
				<div className="flex flex-col">
					<span>
						<label htmlFor="employeeID">Employee ID:</label>
					</span>
					<input
						className="border border-black px-1 focus:outline-none"
						name="employeeID"
						value={credentials.employeeID}
						onChange={handleInput}
						type="text"
						placeholder="Employee ID"
					/>
				</div>
				<div className="flex flex-col">
					<span>
						<label htmlFor="password">Password:</label>
					</span>
					<input
						className="border border-black px-1 focus:outline-none"
						name="password"
						value={credentials.password}
						onChange={handleInput}
						type="password"
						placeholder="Password"
					/>
				</div>
				<button className="p-2 bg-gray-200 w-full" onClick={handleRegister}>
					<span>Register</span>
				</button>
			</div>
		</div>
	);
};

export default Register;
