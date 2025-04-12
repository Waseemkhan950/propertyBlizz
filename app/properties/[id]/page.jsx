import BookmarkButton from "@/app/components/BookmarkButton";
import PropertyContactForm from "@/app/components/propertyContactForm";
import PropertyDetails from "@/app/components/PropertyDetails";
import PropertyHeaderImage from "@/app/components/PropertyImage";
import PropertyImages from "@/app/components/PropertyImages";
import ShareButton from "@/app/components/ShareButton";
import connectDB from "@/config/config";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
const PropertyPage = async ({ params }) => {
	await connectDB();
	const sessionUser = await getSessionUser();
	const { userId = "", user: userData } = sessionUser || {};

	const property = await Property.findById({ _id: await params.id }).lean();
	const serlizedProperty = JSON.parse(JSON.stringify(property));
	let user;
	let isBookmarked = false;
	if (userId) {
		user = await User.findOne({ _id: userId });
		isBookmarked = user.bookmarks.includes(property._id);
	}

	return (
		<>
			<PropertyHeaderImage image={property.images[0]} />
			<section>
				<div className="container m-auto py-6 px-6">
					<Link
						href="/properties"
						className="text-blue-500 hover:text-blue-600 flex items-center">
						<FaArrowLeft className="fas fa-arrow-left mr-2" /> Back to
						Properties
					</Link>
				</div>
			</section>
			<section className="bg-blue-50">
				<div className="container m-auto py-10 px-6">
					<div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
						{/* Property Info */}
						<PropertyDetails property={property} />
						{userId ? (
							<aside className="space-y-4">
								<BookmarkButton
									property={serlizedProperty}
									isBookmarked={isBookmarked}
								/>
								<ShareButton property={serlizedProperty} />
								<PropertyContactForm
									property={serlizedProperty}
									user={userData}
								/>
							</aside>
						) : (
							""
						)}
					</div>
				</div>
			</section>
			<PropertyImages images={property.images} />
		</>
	);
};

export default PropertyPage;
