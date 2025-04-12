"use client";
import { FaPaperPlane } from "react-icons/fa";
// import { useActionState } from "react";
// import { useFormStatus } from "react-dom";
import { sendMessage } from "../actions/messageAction";
import { toast } from "react-toastify";
import { useState } from "react";
function PropertyContactForm({ property, user }) {
	const { name, email } = user;
	const [messageSent, setMessageSent] = useState(false);
	const [sendingMessage, setSendingMessage] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSendingMessage(true);
		const formData = new FormData(e.currentTarget);
		const response = await sendMessage(formData);
		if (response.submitted) {
			setMessageSent(true);
			toast.success(response.message);
			setSendingMessage(false);
		} else {
			toast.error(response.message);
			setMessageSent(false);
			setSendingMessage(false);
		}
	};
	if (messageSent)
		return (
			<div className="text-green-500 m-4 p-4">
				<p className="text-lg font-semibold mb-4">Message Sent Successfully</p>
			</div>
		);
	return (
		<div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 backdrop-blur-sm">
			<h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
				Contact Property Manager
			</h3>
			<form className="space-y-6" onSubmit={handleSubmit}>
				{/* hidden inputs */}
				<input
					type="hidden"
					id="property"
					name="property"
					defaultValue={property._id}
				/>
				<input
					type="hidden"
					id="recipient"
					name="recipient"
					defaultValue={property.owner}
				/>

				<div className="relative">
					<label
						className="block text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide"
						htmlFor="name">
						Name
					</label>
					<input
						className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
						id="name"
						name="name"
						defaultValue={name}
						type="text"
						placeholder="Enter your name"
						required
					/>
				</div>
				<div className="relative">
					<label
						className="block text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide"
						htmlFor="email">
						Email
					</label>
					<input
						className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
						id="email"
						name="email"
						defaultValue={email}
						type="email"
						placeholder="Enter your email"
						required
					/>
				</div>
				<div className="relative">
					<label
						className="block text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide"
						htmlFor="phone">
						Phone
					</label>
					<input
						className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:bg-white"
						id="phone"
						name="phone"
						type="text"
						placeholder="Enter your phone number"
					/>
				</div>
				<div className="relative">
					<label
						className="block text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide"
						htmlFor="message">
						Message
					</label>
					<textarea
						className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:bg-white resize-none h-44"
						id="message"
						name="message"
						placeholder="Enter your message"></textarea>
				</div>
				<div className="mt-8">
					<button
						className="w-full py-4 px-6 text-white font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
						type="submit"
						disabled={sendingMessage}>
						<FaPaperPlane className="text-white/90" />
						{sendingMessage ? (
							<span>Sending...</span>
						) : (
							<span>Send Message</span>
						)}
					</button>
				</div>
			</form>
		</div>
	);
}

export default PropertyContactForm;
