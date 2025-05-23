import AddPropertyForm from "@/app/components/AddPropertyForm";
export const dynamic = "force-dynamic";
function AddProperty() {
	return (
		<section className="bg-blue-50">
			<div className="container m-auto mx-w-2xl py-24">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<AddPropertyForm />
				</div>
			</div>
		</section>
	);
}

export default AddProperty;
