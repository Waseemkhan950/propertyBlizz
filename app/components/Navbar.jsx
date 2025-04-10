/**
 * Navbar Component with Google Authentication
 *
 * Authentication Flow:
 * 1. Component fetches available auth providers on mount using getProviders()
 * 2. User session status is tracked via useSession() hook
 * 3. When user clicks login:
 *    - signIn('google') is called
 *    - User is redirected to Google OAuth consent screen
 *    - After successful auth, user is redirected back
 *    - Session is automatically handled by NextAuth
 * 4. When user clicks logout:
 *    - signOut() is called
 *    - Session is cleared
 *
 * Protected Features:
 * - Add Property link (only shown to authenticated users)
 * - Profile dropdown (only shown to authenticated users)
 * - Messages/notifications (only shown to authenticated users)
 */

"use client";
// Required imports for the component
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import logo from "../assets/images/logo-white.png";
import defaultProfile from "../assets/images/profile.png";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { usePathname } from "next/navigation";
// NextAuth.js imports for authentication
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
	// Get session data for authentication state
	const { data: session } = useSession();
	const profileImage = session?.user?.image;
	// State for authentication providers (eg: Google)
	const [providers, setProviders] = useState(null);
	// State for mobile menu toggle
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	// State for profile dropdown menu
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	// Create refs to track the profile menu and button elements in the DOM
	const profileMenuRef = useRef(null);
	const profileButtonRef = useRef(null);
	// Get current path for navigation highlighting
	const pathName = usePathname();

	// Effect to fetch and set available authentication providers
	useEffect(() => {
		const setAuthProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		setAuthProviders();
	}, []); // Empty dependency array means this runs once on mount

	// Effect hook to handle clicks outside the profile menu
	useEffect(() => {
		// Function that runs on every mouse click
		const handleClickOutside = (event) => {
			// Only run this check if the menu exists in the DOM
			if (
				profileMenuRef.current && // Check if menu element exists
				!profileMenuRef.current.contains(event.target) && // Check if click was NOT inside menu
				!profileButtonRef.current.contains(event.target) // Check if click was NOT on profile button
			) {
				// If click was outside both menu and button, close the menu
				setIsProfileMenuOpen(false);
			}
		};

		// Add the click listener when component mounts
		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup: remove the listener when component unmounts
		// This prevents memory leaks
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []); // Empty dependency array means this only runs once on mount

	return (
		<>
			<nav className="bg-blue-700 border-b border-blue-500">
				{/* Main navigation container */}
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-20 items-center justify-between">
						{/* Mobile menu button */}
						<div className="absolute inset-y-0 left-0 flex items-center md:hidden">
							<button
								type="button"
								id="mobile-dropdown-button"
								className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								aria-controls="mobile-menu"
								aria-expanded="false"
								onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
								<span className="absolute -inset-0.5"></span>
								<span className="sr-only">Open main menu</span>
								<svg
									className="block h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									aria-hidden="true">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
							</button>
						</div>

						{/* Logo and navigation links section */}
						<div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
							{/* Logo */}
							<Link className="flex flex-shrink-0 items-center" href="/">
								<Image className="h-10 w-auto" src={logo} alt="PropertyBlizz" />
								<span className="hidden md:block text-white text-2xl font-bold ml-2">
									PropertyBlizz
								</span>
							</Link>

							{/* Desktop Navigation Menu */}
							<div className="hidden md:ml-6 md:block">
								<div className="flex space-x-2">
									{/* Navigation links with active state highlighting */}
									<Link
										href="/"
										className={`text-white ${
											pathName === "/" && "bg-black"
										} hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}>
										Home
									</Link>
									<Link
										href="/properties"
										className={`text-white ${
											pathName === "/properties" && "bg-black"
										} hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}>
										Properties
									</Link>

									{/* Conditional rendering of Add Property link for authenticated users */}
									{session && (
										<Link
											href="/properties/addProperty"
											className={`text-white ${
												pathName === "/properties/addProperty" && "bg-black"
											} hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}>
											Add Property
										</Link>
									)}
								</div>
							</div>
						</div>

						{/* Authentication Section */}
						{/* Login/Register Button (Only shown when user is not authenticated) */}
						{!session && (
							<div className="hidden md:block md:ml-6">
								<div className="flex items-center">
									<button
										onClick={() => signIn("google")} // Initiates Google OAuth flow
										className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
										<FaGoogle className="mr-2 text-white" />
										<span>Login or Register</span>
									</button>
								</div>
							</div>
						)}

						{/* User Profile Section (Only shown when user is authenticated) */}
						{session && (
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
								{/* Notifications button */}
								<Link href="messages" className="relative group">
									<button
										type="button"
										className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
										<span className="absolute -inset-1.5"></span>
										<span className="sr-only">View notifications</span>
										<svg
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											aria-hidden="true">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
											/>
										</svg>
									</button>
									{/* Notification badge */}
									<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
										2
									</span>
								</Link>

								{/* Profile Dropdown Section */}
								<div className="relative ml-10">
									{/* Profile button */}
									<div>
										<button
											type="button"
											className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
											id="user-menu-button"
											aria-expanded="false"
											aria-haspopup="true"
											ref={profileButtonRef} // Attach ref to track this button
											onClick={() => setIsProfileMenuOpen((prev) => !prev)}>
											<span className="absolute -inset-1.5"></span>
											<span className="sr-only">Open user menu</span>
											<Image
												src={profileImage ? profileImage : defaultProfile}
												className="h-8 w-8 rounded-full"
												alt=""
												height={0}
												width={0}
												sizes="100vw"
											/>
										</button>
									</div>

									{/* Profile dropdown menu */}
									{isProfileMenuOpen && (
										<div
											id="user-menu"
											className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
											role="menu"
											aria-orientation="vertical"
											aria-labelledby="user-menu-button"
											tabIndex="-1"
											ref={profileMenuRef} // Attach ref to track the menu
										>
											<Link
												href="/profile"
												className={`block px-4 py-2 text-sm text-gray-700 ${
													pathName === "/profile" && "bg-black text-white"
												}`}
												role="menuitem"
												tabIndex="-1"
												id="user-menu-item-0">
												Your Profile
											</Link>
											<Link
												href="/properties/savedProperties"
												className={`block px-4 py-2 text-sm text-gray-700 ${
													pathName === "/properties/savedProperties" &&
													"bg-black text-white"
												}`}
												role="menuitem"
												tabIndex="-1"
												id="user-menu-item-2">
												Saved Properties
											</Link>
											<button
												onClick={() => {
													setIsProfileMenuOpen(false);
													signOut();
												}} // Handles sign out functionality
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												role="menuitem"
												tabIndex="-1"
												id="user-menu-item-2">
												Sign Out
											</button>
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Mobile Navigation Menu */}
				{isMobileMenuOpen && (
					<div id="mobile-menu">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{/* Mobile navigation links */}
							<Link
								href="/"
								className={`${
									pathName === "/" && "bg-black"
								} text-white block rounded-md px-3 py-2 text-base font-medium`}>
								Home
							</Link>
							<Link
								href="/properties"
								className={`text-white ${
									pathName === "/properties" && "bg-black"
								} block rounded-md px-3 py-2 text-base font-medium`}>
								Properties
							</Link>
							{/* Conditional rendering of Add Property link for authenticated users */}
							{session && (
								<Link
									href="/properties/addProperty"
									className={`text-white ${
										pathName === "/properties/addProperty" && "bg-black"
									} block rounded-md px-3 py-2 text-base font-medium`}>
									Add Property
								</Link>
							)}
							{/* Mobile login button */}
							{!session && (
								<button
									onClick={() => signIn("google")}
									className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-5">
									<FaGoogle className="mr-2" />
									<span>Login or Register</span>
								</button>
							)}
						</div>
					</div>
				)}
			</nav>
		</>
	);
};

export default Navbar;
