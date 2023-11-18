// Suspense - a component that allows us to wait for a component/page to load
import { Suspense } from "react";
// React router dom - a library that allows us to navigate between pages
import { RouterProvider } from "react-router-dom";
// Routes - a file that contains all the routes of the application
import routes from "./routes/routes";
// Toaster - a component that allows us to display toasts/notifications
import { Toaster } from "react-hot-toast";
// Loading - a component that displays a loading spinner
import Loading from "./components/Loading";

const App = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Toaster />
			<RouterProvider router={routes} />
		</Suspense>
	);
};

export default App;
