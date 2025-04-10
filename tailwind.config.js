/**
 * Tailwind CSS Configuration
 *
 * This file configures Tailwind CSS for the project:
 * - Defines which files Tailwind should scan for classes (content)
 * - Sets up theme customizations like colors, fonts, and breakpoints
 * - Configures any Tailwind plugins being used
 *
 * The content section ensures Tailwind processes:
 * - All pages and components in the app directory
 * - Any JavaScript/TypeScript files
 * - Any template files (if used)
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Poppins", "sans-serif"],
			},
			gridTemplateColumns: {
				"70/30": "70% 28%",
			},
		},
	},
	plugins: [],
};
