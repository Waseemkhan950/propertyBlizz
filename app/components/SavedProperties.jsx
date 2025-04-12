import PropertyCard from "./PropertyCard";

function SavedProperties({ savedProperties }) {
	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
					Saved Properties
				</h2>
				{savedProperties?.length === 0 ? (
					<p>No Property found</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{savedProperties?.map((property, index) => (
							<PropertyCard key={index} property={property} />
						))}
					</div>
				)}
			</div>
		</section>
	);
}

export default SavedProperties;
