import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:3000/api" });

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Home = lazy(() => import("../pages/Home"));

const routes = createBrowserRouter([
	{ path: "/", element: <Login /> },
	{ path: "/register", element: <Register /> },
	{
		path: "/home",
		element: <Home />,
		loader: async () => {
			const bills = await api.get("/bills/fetch");
			const clients = await api.get("/clients/fetch");
			const employees = await api.get("/employees/fetch");
			const finances = await api.get("/finances/fetch");
			const schedules = await api.get("/schedules/fetch");

			return {
				bills: bills.data,
				clients: clients.data,
				employees: employees.data,
				finances: finances.data,
				schedules: schedules.data,
			};
		},
	},
]);

export default routes;
