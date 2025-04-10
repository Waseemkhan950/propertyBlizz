import PropertyCard from "../components/PropertyCard";
import Property from "@/models/Property";
import connectDB from "@/config/config";
async function Properties() {
	await connectDB();
	const properties = await Property.find({}).lean();
	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				{properties.length === 0 ? (
					<p>No Property found</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{properties?.map((property, index) => (
							<PropertyCard key={index} property={property} />
						))}
					</div>
				)}
			</div>
		</section>
	);
}

export default Properties;
