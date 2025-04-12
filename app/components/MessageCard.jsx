"use client";
import { toast } from "react-toastify";
import { deleteMessage, markMessageAsRead } from "../actions/messageAction";
import { useState } from "react";
import { format } from "date-fns";
import {
	FaCheck,
	FaEnvelope,
	FaUser,
	FaPhone,
	FaClock,
	FaCheckCircle,
	FaTrash,
} from "react-icons/fa";
import { useGlobalContext } from "@/context/GlobalContext";
function MessageCard({ message }) {
	const { unreadCount, setUnreadCount } = useGlobalContext();
	const {
		property: { name: propertyName },
		name,
		email,
		phone,
		read,
		message: senderMessage,
		createdAt,
	} = message;
	const [readStatus, setReadStatus] = useState(read);
	const date = new Date(createdAt.toLocaleString());
	const formatted = format(date, "MMMM d, yyyy, h:mm a");
	const handleMarkAsRead = async (id) => {
		const response = await markMessageAsRead(id);
		if (response.status === "success") {
			setUnreadCount((prev) => prev - 1);
			toast.success(response.message);
		}
	};
	const handleDelete = async (id) => {
		const response = await deleteMessage(id);
		if (response.status === "success") {
			toast.success(response.message);
		}
	};
	return (
		<div className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
			{readStatus ? (
				<div className="absolute top-4 right-4 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
					<FaCheck className="h-4 w-4" />
					Read
				</div>
			) : (
				<div className="absolute top-4 right-4 bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
					<FaEnvelope className="h-4 w-4" />
					Unread
				</div>
			)}
			<h2 className="text-2xl font-semibold mb-4 text-gray-800">
				<span className="text-blue-600">Property Inquiry:</span>{" "}
				<span className="text-gray-700">{propertyName}</span>
			</h2>

			<div className="bg-gray-50 p-4 rounded-lg mb-6">
				<p className="text-gray-700 leading-relaxed">{senderMessage}</p>
			</div>

			<div className="space-y-3">
				<div className="flex items-center gap-2 text-gray-700">
					<FaUser className="h-5 w-5 text-gray-500" />
					<span className="font-medium">From:</span> {name}
				</div>

				<div className="flex items-center gap-2">
					<FaEnvelope className="h-5 w-5 text-blue-500" />
					<a
						href={`mailto:${email}`}
						className="text-blue-500 hover:text-blue-700 transition-colors">
						{email}
					</a>
				</div>

				<div className="flex items-center gap-2">
					<FaPhone className="h-5 w-5 text-green-500" />
					<a
						href={`tel:${phone}`}
						className="text-green-500 hover:text-green-700 transition-colors">
						{phone}
					</a>
				</div>

				<div className="flex items-center gap-2 text-gray-600">
					<FaClock className="h-5 w-5 text-gray-500" />
					<span className="text-sm">{formatted}</span>
				</div>
			</div>
			<div className="mt-6 flex gap-3">
				{!readStatus && (
					<button
						className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
						onClick={() => {
							handleMarkAsRead(message._id);
							setReadStatus(true);
						}}>
						<FaCheckCircle className="h-5 w-5" />
						Mark As Read
					</button>
				)}

				<button
					className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
					onClick={() => {
						handleDelete(message._id);
					}}>
					<FaTrash className="h-5 w-5" />
					Delete
				</button>
			</div>
		</div>
	);
}

export default MessageCard;
