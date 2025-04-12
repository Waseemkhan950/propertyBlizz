import connectDB from "@/config/config";
import Property from "@/models/Property";
import User from "@/models/User";
import defaultProfile from "../assets/images/profile.png";
import { getSessionUser } from "@/utils/getSessionUser";
import Image from "next/image";
import UserProperties from "../components/UserProperties";
export const dynamic = "force-dynamic";
async function ProfilePage() {
	await connectDB();
	const sessionUser = await getSessionUser();
	if (!sessionUser || !sessionUser.userId) {
		// this error will be global error shown by nextjs page
		throw new Error("User not authenticated");
	}
	const { name, email, id, username, image } = sessionUser.user;
	const user = await User.findOne({ email: email });
	const bookmarks = user.bookmarks;
	// Get properties and serialize them to plain JSON
	const userProperties = await Property.find({ owner: id }).lean();
	const serializedProperties = JSON.parse(JSON.stringify(userProperties));
	return (
		<section className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
			<div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="bg-white rounded-2xl shadow-xl overflow-hidden">
						<div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-400">
							<div className="absolute -bottom-12 left-8">
								<div className="relative">
									<Image
										className="h-32 w-32 rounded-full border-4 border-white shadow-lg transform hover:scale-105 transition-all duration-300"
										src={image || defaultProfile}
										alt={name}
										width={128}
										height={128}
										priority
									/>
								</div>
							</div>
						</div>

						<div className="px-8 py-16">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								<div className="md:col-span-1">
									<div className="space-y-6">
										<div className="bg-gray-50 rounded-xl p-6 shadow-sm">
											<h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
												Name
											</h2>
											<p className="text-xl font-medium text-gray-900">
												{name}
											</p>
										</div>
										<div className="bg-gray-50 rounded-xl p-6 shadow-sm">
											<h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
												Email
											</h2>
											<p className="text-xl font-medium text-gray-900">
												{email}
											</p>
										</div>
									</div>
								</div>

								<div className="md:col-span-2">
									<div className="bg-gray-50 rounded-xl p-6 shadow-sm">
										<h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
											<span className="mr-2">Your Listings</span>
											<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
												{serializedProperties.length} Properties
											</span>
										</h2>
										<div className="grid grid-cols-1 gap-6">
											{serializedProperties.map((property, index) => (
												<UserProperties
													property={property}
													key={index}
													properties={serializedProperties}
												/>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ProfilePage;
