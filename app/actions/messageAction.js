"use server";
// following line brings the updated data from the server
import connectDB from "@/config/config";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
// while using useActionState at the client side, we need to pass the previous state as an argument, though it is not used here
export const sendMessage = async (formData) => {
	console.log("formData", formData);
	await connectDB();
	// get current owner here
	const sessionUser = await getSessionUser();
	if (!sessionUser || !sessionUser.userId) {
		// this error will be global error shown by nextjs page
		throw new Error("User not authenticated");
	}
	const { userId } = sessionUser;
	// extract values from formData
	const recipient = formData.get("recipient");
	const property = formData.get("property");
	const name = formData.get("name");
	const email = formData.get("email");
	const message = formData.get("message");
	const phone = formData.get("phone");
	// user should not send message to himself
	if (userId === recipient)
		return { submitted: false, message: "You cannot send message to yourself" };
	const newMessage = await Message.create({
		sender: userId,
		recipient,
		property,
		name,
		email,
		phone,
		message,
	});
	if (!newMessage) {
		return { submitted: false, message: "Message could not be sent" };
	}
	revalidatePath("/messages");
	return { submitted: true, message: "Message sent successfully" };
};
// mark message as read
export const markMessageAsRead = async (id) => {
	await connectDB();

	await Message.updateOne({ _id: id }, { $set: { read: true } });
	revalidatePath("/messages");
	return { status: "success", message: "Message marked as read" };
};

// delete message
export const deleteMessage = async (id) => {
	await connectDB();
	await Message.deleteOne({ _id: id });
	revalidatePath("/messages");
	return { status: "success", message: "Message deleted successfully" };
};
// get unread messages count
export const getUnreadMessagesCount = async () => {
	await connectDB();
	const sessionUser = await getSessionUser();
	if (!sessionUser || !sessionUser.userId) {
		// this error will be global error shown by nextjs page
		throw new Error("User not authenticated");
	}
	const { userId } = sessionUser;
	const count = await Message.countDocuments({
		recipient: userId,
		read: false,
	});
	revalidatePath("/messages");
	return count;
};
