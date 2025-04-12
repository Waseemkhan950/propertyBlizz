import connectDB from "@/config/config";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "../components/MessageCard";
import { Suspense } from "react";
import Spinner from "../components/Spinner";

async function MessagesPage() {
	await connectDB();
	const sessionUser = await getSessionUser();
	const { userId, user: userData } = sessionUser;
	const readMessages = await Message.find({ recipient: userId, read: true })
		.sort({
			createdAt: -1,
		})
		.populate("sender", "name")
		.populate("property", "name")
		.lean();
	const unreadMessages = await Message.find({ recipient: userId, read: false })
		.sort({
			createdAt: -1,
		})
		.populate("sender", "name")
		.populate("property", "name")
		.lean();
	const messages = [...readMessages, ...unreadMessages];
	const serilizedMessages = JSON.parse(JSON.stringify(messages));
	const sortedMessages = serilizedMessages.sort((a, b) => {
		return Number(a.read) - Number(b.read); // false = 0, true = 1
	});
	return (
		<section className="bg-blue-50 ">
			<div className="container m-auto py-24 max-w-6xl">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
						Your Messages
					</h2>
					{sortedMessages.length === 0 ? (
						<p>You have no messages</p>
					) : (
						sortedMessages.map((message, index) => (
							<Suspense fallback={<Spinner />}>
								<MessageCard key={index} message={message} />
							</Suspense>
						))
					)}
				</div>
			</div>
		</section>
	);
}

export default MessagesPage;
