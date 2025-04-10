import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/config";
import User from "@/models/User";

/**
 * NextAuth.js configuration options
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		async signIn({ profile }) {
			try {
				await connectDB();

				// Check if user exists
				const userExists = await User.findOne({ email: profile.email });

				// If not, create user
				if (!userExists) {
					await User.create({
						email: profile.email,
						username: profile.name,
						image: profile.picture,
					});
				}

				return true;
			} catch (error) {
				console.log("Error during sign in: ", error);
				return false;
			}
		},
		async session({ session }) {
			try {
				// Get user from database
				const user = await User.findOne({ email: session.user.email });

				// Add user id to session
				if (user) {
					session.user.id = user._id.toString();
					session.user.username = user.username;
				}

				return session;
			} catch (error) {
				console.log("Error during session handling: ", error);
				return session;
			}
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};
