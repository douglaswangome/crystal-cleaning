const Loading = () => {
	return (
		<div className="grid place-items-center h-screen w-screen">
			<div className="relative">
				<img
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-22 w-22 p-2 object-contain rounded-full bg-[#0f93fe]"
					src="/images/logo.png"
					alt="logo"
				/>
				<div className=" animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#0f93fe]"></div>
			</div>
		</div>
	);
};

export default Loading;
