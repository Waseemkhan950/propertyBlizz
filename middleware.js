/**
 * Middleware Configuration for Authentication
 *
 * This file configures protected routes that require authentication using NextAuth.js.
 * The 'matcher' array specifies which routes should be protected:
 * - /properties/addProperty: Only authenticated users can add new properties
 * - /profile: User profile page is protected
 * - /properties/saved: Saved properties page is protected
 * - /messages: Messaging system is protected
 *
 * When an unauthenticated user tries to access these routes, they will be
 * automatically redirected to the login page.
 */
export { default } from "next-auth/middleware";

export const config = {
	matcher: [
		"/properties/addProperty",
		"/profile",
		"/properties/saved",
		"/messages",
	],
};
