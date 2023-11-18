// React redux - a library that allows us to use redux with react
// useSelector - a hook that allows us to select a state from the redux store
import { useSelector } from "react-redux";

const Header = () => {
	// user - a state from the redux store that contains the user information
	const user =
		useSelector((state) => state.user.user) ||
		JSON.parse(localStorage.getItem("user"));

	return (
		<div className="flex items-center px-2 justify-between h-[70px] shadow-lg">
			<div className="flex gap-1 items-center">
				<img
					className="bg-[#0f93fe] p-2 h-[40px] w-[40px] mx-auto object-contain rounded-full"
					src="/images/logo.png"
					alt="logo"
				/>
				<span className="text-2xl font-bold max-[680px]:text-lg max-[325px]:hidden">
					Crystal Cleaning
				</span>
			</div>
			<div className="flex gap-2 items-center">
				<span className="capitalize max-[490px]:hidden">{user.roles}</span>
				<div className="bg-[#0f93fe] rounded-full w-[40px] h-[40px] flex items-center justify-center text-white max-[360px]:hidden">
					{user.employeeid}
				</div>
				<div className="flex flex-col">
					<span>Hi, {user.fullname}</span>
					<span className="text-xs">{user.email}</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
