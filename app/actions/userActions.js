"use server";
// write api that bookmarks a property for a user

import connectDB from "@/config/config";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

export const bookmarkProperty = async (propertyId) => {
	await connectDB();
	// check if user is logged in
	const sessionUser = await getSessionUser();
	if (!sessionUser || !sessionUser.userId) {
		// this error will be global error shown by nextjs page
		throw new Error("User not authenticated");
	}
	// check if the property exists
	const property = await Property.findOne({ _id: propertyId });
	if (!property) throw new Error("Property not found");

	const user = await User.findOne({ _id: sessionUser.userId });

	if (!property || !user) {
		throw new Error("Property or user not found");
	}
	// check if this property has already been bookmarked then remove it
	if (user.bookmarks.includes(property._id)) {
		// remove property from bookmarks
		// user.bookmarks.pull(property._id); this line does the same work as the line below; this uses mongoose's pull method
		user.bookmarks = user.bookmarks.filter(
			(bookmark) => bookmark.toString() !== property._id.toString()
		);
		await user.save();
		revalidatePath(`/properties/${property._id}`);
		revalidatePath("/profile");
		revalidatePath("/properties/saved");
		return {
			removed: true,
			message: "Bookmark removed successfully",
		};
	}
	user.bookmarks.push(property);
	await user.save();
	revalidatePath(`/properties/${property._id}`);
	revalidatePath("/profile");

	return {
		added: true,
		message: "Property bookmarked successfully",
	};
};
