import PropertyDetails from "@/app/components/PropertyDetails";
import PropertyHeaderImage from "@/app/components/PropertyImage";
import PropertyImages from "@/app/components/propertyImages";
import connectDB from "@/config/config";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async ({ params }) => {
	await connectDB();
	const propertyId = await params.id;
	const property = await Property.findById(propertyId).lean();
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
					</div>
				</div>
			</section>
			<PropertyImages images={property.images} />
		</>
	);
};

export default PropertyPage;
