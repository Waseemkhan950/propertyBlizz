import connectDB from "@/config/config";
import Property from "@/models/Property";
import User from "@/models/User";
import defaultProfile from "../assets/images/profile.png";
import { getSessionUser } from "@/utils/getSessionUser";
import Image from "next/image";
import UserProperties from "../components/UserProperties";
const ProfilePage = async () => {
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
		<section className="bg-blue-50">
			<div className="container m-auto py-24">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<h1 className="text-3xl font-bold mb-4">Your Profile</h1>
					<div className="flex flex-col md:flex-row">
						<div className="md:w-1/4 mx-20 mt-10">
							<div className="mb-4">
								<Image
									className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
									src={image || defaultProfile}
									alt="User"
									width={0}
									height={0}
									sizes="100vh"
								/>
							</div>

							<h2 className="text-2xl mb-4">
								<span className="font-bold block">Name: </span> {name}
							</h2>
							<h2 className="text-2xl">
								<span className="font-bold block">Email: </span> {email}
							</h2>
						</div>

						<div className="md:w-3/4 md:pl-4">
							<h2 className="text-xl font-semibold mb-4">Your Listings</h2>
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
		</section>
	);
};

export default ProfilePage;
