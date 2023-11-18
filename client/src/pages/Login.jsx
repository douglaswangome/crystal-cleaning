import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../routes/routes";
import { login } from "../store/slice";
import notify from "../fn/notify";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		employeeId: "",
		password: "",
	});

	const handleInput = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleLogin = async () => {
		try {
			const response = await api.get(
				`/credentials/fetch?employeeID=${credentials.employeeId}&password=${credentials.password}`
			);
			dispatch(login(response.data.user));

			if (localStorage.getItem("user") === null) {
				localStorage.setItem("user", JSON.stringify(response.data.user));
			} else {
				localStorage.removeItem("user");
				localStorage.setItem("user", JSON.stringify(response.data.user));
			}
			notify(response.status, response.data.message);
			navigate("/home");
		} catch (error) {
			notify(error.response.status, error.response.data.message);
			if (error.response.status === 404) {
				navigate("/register");
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
						<label htmlFor="employeeId">Employee ID:</label>
					</span>
					<input
						className="border border-black px-1 focus:outline-none"
						name="employeeId"
						value={credentials.employeeId}
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
				<button className="p-2 bg-gray-200 w-full" onClick={handleLogin}>
					<span>Login</span>
				</button>
			</div>
		</div>
	);
};

export default Login;
