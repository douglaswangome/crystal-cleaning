// useState is a hook that allows us to have state variables in functional components
import { useState } from "react";
// useNavigate is a hook that allows you to navigate to a different route
import { useNavigate } from "react-router-dom";
// notify is a function that displays a toast notification
import notify from "../fn/notify";
// api is an instance of axios that contains the base url of the backend
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
			<div className="flex flex-col gap-2 w-[300px] max-[300px]:px-2 max-[300px]:w-full">
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
