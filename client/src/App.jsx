import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { Toaster } from "react-hot-toast";

const App = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Toaster />
			<RouterProvider router={routes} />
		</Suspense>
	);
};

export default App;
