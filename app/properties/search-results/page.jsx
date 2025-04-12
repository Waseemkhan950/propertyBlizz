import PropertyCard from "@/app/components/PropertyCard";
import connectDB from "@/config/config";
import Property from "@/models/Property";
import Link from "next/link";
import PropertySearchForm from "@/app/components/PropertySearchForm";
import { FaArrowAltCircleLeft } from "react-icons/fa";
async function SearchResult({ searchParams: { location, propertyType } }) {
	await connectDB();
	const locationPatern = new RegExp(location, "i");
	let query = {
		$or: [
			{ name: locationPatern },
			{ description: locationPatern },
			{ "location.street": locationPatern },
			{ "location.city": locationPatern },
			{ "location.state": locationPatern },
			{ "location.zipcode": locationPatern },
		],
	};

	if (propertyType && propertyType !== "All") {
		const typePatern = new RegExp(propertyType, "i");

		query.type = typePatern;
	}
	const properties = await Property.find(query).lean();
	const serilizedProperties = JSON.parse(JSON.stringify(properties));
	console.log("serilizedProperties", serilizedProperties);
	return (
		<>
			<section className="bg-blue-700 py-4">
				<div className=" mx-auto max-w-7xl px-4 flex flex-col items-start sm:px-6 lg:px-8">
					<PropertySearchForm />
				</div>
			</section>
			<section className="px-4 py-6">
				<div className="container-xl lg:container m-auto px-4 py-6">
					<Link
						href="/properties"
						className="flex items-center text-blue-500 hover:underline mb-3">
						<FaArrowAltCircleLeft className="inline-block mr-2 mb-1" />
						<span>Back to Properties</span>"
					</Link>
					<h1 className="text-2xl font-bold mb-4">Search Results</h1>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{serilizedProperties.length === 0 ? (
							<p>No Property found</p>
						) : (
							serilizedProperties?.map((property, index) => (
								<PropertyCard key={index} property={property} />
							))
						)}
					</div>
				</div>
			</section>
		</>
	);
}

export default SearchResult;
