import Image from "next/image";
import logo from "../assets/images/logo-white.png";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
// import { getSessionUser } from "@/utils/getSessionUser";
const Footer = async () => {
	const currentYear = new Date().getFullYear();
	// const { userId = undefined } = await getSessionUser();
	return (
		<footer className="bg-gray-800 text-white py-12 w-full">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="space-y-4">
						<Image
							src={logo}
							alt="PropertyBlizz Logo"
							className="h-10 w-auto mb-4 hover:opacity-90 transition-opacity"
						/>
						<p className="text-gray-300 text-sm">
							Your trusted partner in finding the perfect property. Making real
							estate simple and accessible for everyone.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4 text-gray-100">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/properties"
									className="text-gray-300 hover:text-white transition-colors">
									Properties
								</Link>
							</li>

							<li>
								<Link
									href="/properties/addProperty"
									className="text-gray-300 hover:text-white transition-colors">
									Add Property
								</Link>
							</li>
							<li>
								<Link
									href="/properties/saved"
									className="text-gray-300 hover:text-white transition-colors">
									Saved Properties
								</Link>
							</li>

							<li>
								<Link
									href="/terms"
									className="text-gray-300 hover:text-white transition-colors">
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-lg font-semibold mb-4 text-gray-100">
							Contact Us
						</h3>
						<ul className="space-y-2 text-gray-300">
							<li>1234 Real Estate Ave</li>
							<li>Property City, PC 12345</li>
							<li>Phone: (555) 123-4567</li>
							<li>Email: info@propertyblizz.com</li>
						</ul>
					</div>

					{/* Social Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4 text-gray-100">
							Follow Us
						</h3>
						<div className="flex space-x-4">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-white transition-colors">
								<FaFacebook className="fab fa-facebook-f text-xl" />
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-white transition-colors">
								<FaTwitter className="fab fa-twitter text-xl" />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-white transition-colors">
								<FaInstagram className="fab fa-instagram text-xl" />
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 hover:text-white transition-colors">
								<FaLinkedin className="fab fa-linkedin-in text-xl" />
							</a>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-700 mt-8 pt-8 text-center md:text-left">
					<p className="text-sm text-gray-400">
						&copy; {currentYear} PropertyBlizz. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
