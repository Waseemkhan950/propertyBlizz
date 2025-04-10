"use server";

import connectDB from "@/config/config";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

// utility function to extract public id from cloudinry url:
const getPublicIdFromUrl = (url) => {
	const parts = url.split("/");
	const filename = parts.pop().split(".")[0]; // "wzjaeeeytxypbcjk1uwu"
	const versionIndex = parts.findIndex((p) => /^v\d+/.test(p)); // finds "v174..."
	const folder = parts.slice(versionIndex + 1).join("/"); // gets "propertyBlizz"
	return `${folder}/${filename}`;
};
// add property
export async function addProperty(formData) {
	// connect db here
	await connectDB();
	// get current owner here
	const sessionUser = await getSessionUser();
	if (!sessionUser || !sessionUser.userId) {
		// this error will be global error shown by nextjs page
		throw new Error("User not authenticated");
	}
	const { userId } = sessionUser;

	// access all values from amenities and images because they are arrays
	const amenities = formData.getAll("amenities");
	const images = formData.getAll("images").filter((image) => image.name !== "");

	const propertyData = {
		owner: userId,
		name: formData.get("name"),
		type: formData.get("type"),
		description: formData.get("description"),
		location: {
			street: formData.get("location.street"),
			city: formData.get("location.city"),
			state: formData.get("location.state"),
			zipcode: formData.get("location.zipcode"),
		},
		beds: formData.get("beds"),
		baths: formData.get("baths"),
		rates: {
			nightly: formData.get("rates.nightly"),
			weekly: formData.get("rates.weekly"),
			monthly: formData.get("rates.monthly"),
		},
		amenities,
		seller_info: {
			name: formData.get("seller_info.name"),
			email: formData.get("seller_info.email"),
			phone: formData.get("seller_info.phone"),
		},
		square_feet: formData.get("square_feet"),
	};
	// Upload images to cloudinary
	const imageUploadPromises = images.map(async (image) => {
		const bytes = await image.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const response = await cloudinary.uploader.upload(
			"data:image/jpeg;base64," + buffer.toString("base64"),
			{
				folder: "propertyBlizz",
				timeout: 120000, // 2 minutes timeout
			}
		);
		return response.secure_url;
	});

	// Wait for all uploads to complete
	const imgUrls = await Promise.all(imageUploadPromises);
	propertyData.images = imgUrls;

	// create new property - no need to call save() separately as create() already saves
	const newProperty = await Property.create(propertyData);

	// revalidate cache
	revalidatePath("/properties");

	return { success: true, propertyId: newProperty._id.toString() };
}
// delete property
export const deleteProperty = async (id) => {
	await connectDB();
	const sessionUser = await getSessionUser();
	if (!sessionUser || !sessionUser.userId) {
		// this error will be global error shown by nextjs page
		throw new Error("User not authenticated");
	}
	// check if the property exists
	const property = await Property.findOne({ _id: id });
	if (!property) throw new Error("Property not found");
	// check if the user is the owner of the property
	if (property.owner.toString() !== sessionUser.userId)
		throw new Error(
			"Unauthorized User: you cannot delete the property, you didn't create it"
		);

	// delete image from cloudinary
	for (let i = 0; i < property.images.length; i++) {
		// extract public id from the cloudinary url
		const publicId = getPublicIdFromUrl(property.images[i]);
		await cloudinary.uploader.destroy(publicId);
	}
	const result = await Property.deleteOne({ _id: id });
	if (result.deletedCount === 0) throw new Error("Property not found");

	revalidatePath("/profile");
	revalidatePath("/properties");
};
// property edit
export const editProperty = async (id, formData) => {
	await connectDB();
	const sessionUser = await getSessionUser();
	if (!sessionUser || !sessionUser.userId) {
		// this error will be global error shown by nextjs page
		throw new Error("User not authenticated");
	}
	// check if the property exists
	const property = await Property.findOne({ _id: id });
	if (!property) throw new Error("Property not found");
	// check if the user is the owner of the property
	if (property.owner.toString() !== sessionUser.userId)
		throw new Error(
			"Unauthorized User: you cannot edit the property, you didn't create it"
		);

	// access all values from amenities and images because they are arrays
	const amenities = formData.getAll("amenities");
	// const images = formData.getAll("images").filter((image) => image.name !== "");

	const propertyData = {
		name: formData.get("name"),
		type: formData.get("type"),
		description: formData.get("description"),
		location: {
			street: formData.get("location.street"),
			city: formData.get("location.city"),
			state: formData.get("location.state"),
			zipcode: formData.get("location.zipcode"),
		},
		beds: formData.get("beds"),
		baths: formData.get("baths"),
		rates: {
			nightly: formData.get("rates.nightly"),
			weekly: formData.get("rates.weekly"),
			monthly: formData.get("rates.monthly"),
		},
		amenities,
		seller_info: {
			name: formData.get("seller_info.name"),
			email: formData.get("seller_info.email"),
			phone: formData.get("seller_info.phone"),
		},
		square_feet: formData.get("square_feet"),
	};
	// image is not handled in edit feature
	// update property
	const updatedProperty = await Property.findOneAndUpdate(
		{ _id: id },
		{ $set: propertyData },
		{ new: true }
	);
	revalidatePath("/properties");
	return { success: true, propertyId: updatedProperty._id.toString() };
};
