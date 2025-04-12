import PropertyEditForm from "@/app/components/PropertyEditForm";
import connectDB from "@/config/config";
import Property from "@/models/Property";

async function editPropertyPage({ params }) {
	await connectDB();
	const propertyId = await params.id;
	const property = await Property.findById(propertyId).lean();
	const serializedProperty = JSON.parse(JSON.stringify(property));
	if (!property) {
		return (
			<section className="bg-blue-50">
				<div className="container m-auto max-w-2xl py-24">
					<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
						<p>No Property found</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="bg-blue-50">
			<div className="container m-auto max-w-5xl py-24">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<PropertyEditForm property={serializedProperty} />
				</div>
			</div>
		</section>
	);
}

export default editPropertyPage;
