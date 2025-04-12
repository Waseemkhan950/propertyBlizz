import connectDB from "@/config/config";
import Property from "@/models/Property";
import FeaturedCard from "./FeaturedCard";
import PropertyCard from "./PropertyCard";

async function FeaturedProperties() {
	await connectDB();
	const featuredProperties = await Property.find({
		is_Featured: true,
	}).lean();
	return featuredProperties.length === 0 ? (
		<p>No Property found</p>
	) : (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
					Featured Properties
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{featuredProperties?.map((property, index) => (
						<PropertyCard key={index} property={property} />
					))}
				</div>
			</div>
		</section>
	);
}

export default FeaturedProperties;
