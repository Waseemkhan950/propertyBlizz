import MoonLoader from "react-spinners/MoonLoader";
const override = {
	display: "block",
	margin: "100px auto",
	borderColor: "blue",
};
const Spinner = () => {
	return (
		<MoonLoader
			color="#3b82f6"
			loading={true}
			cssOverride={override}
			size={150}
			aria-label="Loading Spinner"
			data-testid="loader"
			speedMultiplier={0.5}
		/>
	);
};

export default Spinner;
