// lazy load components - a way to reduce the size of the initial bundle
import { lazy } from "react";
// createBrowserRouter - a function that creates a router
import { createBrowserRouter } from "react-router-dom";
// axios - a library that allows us to make http requests
import axios from "axios";

// api - an instance of axios that contains the base url of the backend
export const api = axios.create({ baseURL: "http://localhost:3000/api" });

// Login - a component that allows the user to login
const Login = lazy(() => import("../pages/Login"));
// Register - a component that allows the user to register
const Register = lazy(() => import("../pages/Register"));
// Home - a component that displays the home page
const Home = lazy(() => import("../pages/Home"));

const routes = createBrowserRouter([
	{ path: "/", element: <Login /> },
	{ path: "/register", element: <Register /> },
	{
		path: "/home",
		element: <Home />,
		// loader - a function that loads data before rendering the component
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
