import "./assets/styles/globals.css";
export const metadata = {
	title: "Property Blizz",
	keywords: "Real estate, Property management, Property listing",
	description:
		"Property Blizz is a real estate platform that connects buyers, sellers, and renters with properties that meet their needs. Our platform offers a wide range of features to help you find your dream home or investment property.",
};
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
