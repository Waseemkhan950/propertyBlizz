import "./assets/styles/globals.css";
import AuthProvider from "./components/AuthProvider";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/GlobalContext";
export const metadata = {
	title: "EstateLink",
	keywords: "Real estate, Property management, Property listing",
	description:
		"EstateLink is a real estate platform that connects buyers, sellers, and renters with properties that meet their needs. Our platform offers a wide range of features to help you find your dream home or investment property.",
};
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body cz-shortcut-listen="true" className="min-h-screen flex flex-col">
				<AuthProvider>
					<GlobalProvider>
						<Navbar />
						<main className="flex-grow">{children}</main>
						<ToastContainer />
						<Footer />
					</GlobalProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
