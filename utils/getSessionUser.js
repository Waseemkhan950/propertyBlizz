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
	const session = await getServerSession(authOptions);
	if (!session || !session.user) return null;
	return {
		user: session.user,
		userId: session.user.id,
	};
};
// Note: if during deployment, this file causes error then try to remove trycatch block and redeploy it. issue will be resolved.
