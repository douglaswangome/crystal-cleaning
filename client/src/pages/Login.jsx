// useState is a hook that allows you to have state variables in functional components
import { useState } from "react";
// useDispatch is a hook that allows you to dispatch actions
import { useDispatch } from "react-redux";
// useNavigate is a hook that allows you to navigate to a different route
import { useNavigate } from "react-router-dom";
// api is an instance of axios that contains the base url of the backend
import { api } from "../routes/routes";
// login is an action from the redux store
import { login } from "../store/slice";
// notify is a function that displays a toast notification
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
			<div className="flex flex-col gap-2 w-[300px] max-[300px]:px-2 max-[300px]:w-full">
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
