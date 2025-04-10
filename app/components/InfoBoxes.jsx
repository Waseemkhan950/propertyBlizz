import InfoBox from "./InfoBox";

const InfoBoxes = () => {
	return (
		<section>
			<div className="container-xl lg:container m-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
					<InfoBox
						heading="For Renters"
						buttonInfo={{
							text: "Browse Properties",
							link: "/properties",
							color: "bg-black",
						}}
						className="bg-gray-100">
						Looking for a rental? PropertyBlizz is the place to be. Search for
						properties, bookmark favorites, and contact owners.
					</InfoBox>
					<InfoBox
						heading="For Property Owners"
						buttonInfo={{
							text: "List Your Property",
							link: "/properties/addProperty",
							color: "bg-blue-500",
						}}>
						Own a property? List it on PropertyBlizz. Reach potential tenants
						You can rent as an Airbnb or long term.
					</InfoBox>
				</div>
			</div>
		</section>
	);
};

export default InfoBoxes;
