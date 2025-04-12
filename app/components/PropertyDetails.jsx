import {
	FaBath,
	FaBed,
	FaCheck,
	FaMap,
	FaMapMarker,
	FaRegWindowClose,
	FaRuler,
	FaRulerCombined,
	FaTimes,
	FaWindowClose,
} from "react-icons/fa";
import PropertyMap from "./PropertyMap";
const PropertyDetails = ({ property }) => {
	const {
		owner,
		baths,
		beds,
		square_feet,
		type,
		_id,
		description,
		location: { street, city, state, zipcode },
		is_Featured,
		rates: { nightly, weekly, monthly },
		seller_info,
		name,
		amenities,
	} = property;
	const serializedProperty = JSON.parse(JSON.stringify(property));
	return (
		<main>
			{" "}
			<div className="bg-white p-8 rounded-2xl shadow-lg text-center md:text-left">
				<div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold mb-4">
					{type}
				</div>
				<h1 className="text-4xl font-extrabold mb-4 text-blue-800">{name}</h1>
				<div className="flex items-center justify-center md:justify-start text-gray-600 mb-6">
					<FaMapMarker className="text-blue-600 mr-2 text-xl" />
					<p className="text-lg">{`${street}, ${city}, ${state} ${zipcode}`}</p>
				</div>

				<div className="bg-gray-50 rounded-xl p-6 my-8">
					<h3 className="text-xl font-bold mb-6 text-blue-800">
						Pricing Options
					</h3>
					<div className="grid md:grid-cols-3 gap-6">
						<div className="bg-white p-6 rounded-xl shadow-sm">
							<div
								className={`${
									nightly ? "" : "line-through"
								} text-gray-600 mb-2 font-medium`}>
								Nightly Rate
							</div>
							{!nightly ? (
								<div className="text-2xl font-bold text-red-500">
									<FaTimes className="inline-block" /> Not Available
								</div>
							) : (
								<div className="text-3xl font-bold text-blue-600">
									${nightly}
								</div>
							)}
						</div>
						<div className="bg-white p-6 rounded-xl shadow-sm">
							<div
								className={`${
									weekly ? "" : "line-through"
								} text-gray-600 mb-2 font-medium`}>
								Weekly Rate
							</div>
							{!weekly ? (
								<div className="text-2xl font-bold text-red-500">
									<FaTimes className="inline-block" /> Not Available
								</div>
							) : (
								<div className="text-3xl font-bold text-blue-600">
									${weekly}
								</div>
							)}
						</div>
						<div className="bg-white p-6 rounded-xl shadow-sm">
							<div
								className={`${
									monthly ? "" : "line-through"
								} text-gray-600 mb-2 font-medium`}>
								Monthly Rate
							</div>
							{!monthly ? (
								<div className="text-2xl font-bold text-red-500">
									<FaTimes className="inline-block" /> Not Available
								</div>
							) : (
								<div className="text-3xl font-bold text-blue-600">
									${monthly}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="grid md:grid-cols-2 gap-8 mt-8">
				<div className="bg-white p-8 rounded-2xl shadow-lg">
					<h3 className="text-2xl font-bold mb-6 text-gray-900">
						Property Details
					</h3>
					<div className="grid grid-cols-3 gap-4 mb-6">
						<div className="bg-blue-50 p-4 rounded-xl text-center">
							<FaBed className="text-blue-600 text-2xl mx-auto mb-2" />
							<span className="block text-2xl font-bold text-gray-900">
								{beds}
							</span>
							<span className="text-sm text-gray-600">Bedrooms</span>
						</div>
						<div className="bg-blue-50 p-4 rounded-xl text-center">
							<FaBath className="text-blue-600 text-2xl mx-auto mb-2" />
							<span className="block text-2xl font-bold text-gray-900">
								{baths}
							</span>
							<span className="text-sm text-gray-600">Bathrooms</span>
						</div>
						<div className="bg-blue-50 p-4 rounded-xl text-center">
							<FaRulerCombined className="text-blue-600 text-2xl mx-auto mb-2" />
							<span className="block text-2xl font-bold text-gray-900">
								{square_feet}
							</span>
							<span className="text-sm text-gray-600">Sq Ft</span>
						</div>
					</div>
					<div className="prose max-w-none">
						<p className="text-gray-600 leading-relaxed">{description}</p>
					</div>
				</div>

				<div className="bg-white p-8 rounded-2xl shadow-lg">
					<h3 className="text-2xl font-bold mb-6 text-blue-800">Amenities</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{amenities.map((amenity, index) => (
							<div
								key={index}
								className="flex items-center p-3 bg-gray-50 rounded-lg">
								<FaCheck className="text-green-500 mr-3 text-lg" />
								<span className="text-gray-700">{amenity}</span>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="bg-white p-2 rounded-2xl shadow-lg mt-3">
				<h3 className="text-2xl font-bold mb-6 text-blue-800">Location</h3>
				<div className="rounded-xl overflow-hidden">
					<PropertyMap property={serializedProperty} />
				</div>
			</div>
		</main>
	);
};

export default PropertyDetails;
