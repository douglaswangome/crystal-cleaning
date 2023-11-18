// A modal component that takes in a boolean prop to show or hide the modal
// Usage:
const Modal = (props) => {
	const { children, show, handleShow } = props;
	return (
		<div
			className={`absolute top-0 left-0 w-screen h-screen backdrop-brightness-50 flex items-center justify-center z-[2] ${
				show
					? "mt-0 opacity-100 pointer-events-auto"
					: "mt-[-300%] opacity-0 pointer-events-none"
			} transition-all duration-700 ease-linear`}
			onClick={handleShow}
		>
			<div className="p-3 bg-white" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
