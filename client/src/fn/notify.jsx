import toast from "react-hot-toast";

const notify = (status, message) => {
	switch (status) {
		case 200:
			toast.success(message);
			break;
		case "":
			toast(message);
			break;
		case "loading":
			toast.loading(message);
			break;
		default:
			toast.error(message);
			break;
	}
};

export default notify;
