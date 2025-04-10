import Link from "next/link";
import PropertyCard from "../components/PropertyCard";
import Property from "@/models/Property";
import connectDB from "@/config/config";

const HomeProperties = async () => {
	try {
		await connectDB();
		const recentProperties = await Property.find({})
			.sort({ createdAt: -1 })
			.limit(4)
			.lean();

		return (
			<>
				<section className="px-4 py-6">
					<div className="container-xl lg:container m-auto px-4 py-6">
						<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
							Recent Properties
						</h2>
						{recentProperties.length === 0 ? (
							<p>No Property found</p>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{recentProperties?.map((property, index) => (
									<PropertyCard key={index} property={property} />
								))}
							</div>
						)}
					</div>
				</section>
				<section className="mx-auto max-w-lg my-10 px-6">
					<Link
						href="/properties"
						className="bg-black block hover:bg-blue-600 text-white text-center py-4 px-6 rounded-lg">
						View All Properties
					</Link>
				</section>
			</>
		);
	} catch (error) {
		console.error("Error loading properties:", error);
		return (
			<div className="text-center py-10">
				Error loading properties. Please try again later.
			</div>
		);
	}
};

export default HomeProperties;
