/**
 * Authentication Utility Module
 * ----------------------------
 * This module provides functionality to retrieve the current user's session information
 * using NextAuth.js authentication system.
 *
 * Key Features:
 * - Retrieves server-side session data
 * - Handles authentication state verification
 * - Provides user information and ID if authenticated
 * - Includes error handling with graceful fallback
 */

import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getSessionUser = async () => {
	try {
		// Attempt to get the server session using NextAuth configuration
		const session = await getServerSession(authOptions);

		// Return null if no session or user data exists
		if (!session || !session.user) return null;

		// Return user data and ID if authentication is successful
		return {
			user: session.user,
			userId: session.user.id,
		};
	} catch (error) {
		// Log any errors that occur during session handling
		console.log("Error during session handling: ", error);
		// Return null to maintain consistent error handling
		return null;
	}
};
// Note: if during deployment, this file causes error then try to remove trycatch block and redeploy it. issue will be resolved.
