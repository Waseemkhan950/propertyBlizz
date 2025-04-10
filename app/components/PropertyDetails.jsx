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
			<div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
				<div className="text-gray-500 mb-4">{type}</div>
				<h1 className="text-3xl font-bold mb-4">{name}</h1>
				<div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
					<FaMapMarker className="fa-solid fa-location-dot text-lg text-orange-700 mr-2" />
					<p className="text-orange-700">
						{`${street} ${city} ${state} ${zipcode}`}
					</p>
				</div>

				<h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
					Rates & Options
				</h3>
				<div className="flex flex-col md:flex-row justify-around">
					<div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
						<div
							className={`${
								nightly ? "" : "line-through"
							} text-gray-500 mr-2 font-bold`}>
							Nightly
						</div>
						{!nightly && (
							<div className="text-2xl font-bold">
								<FaTimes className="text-red-700" />
							</div>
						)}
						<div className="text-2xl font-bold text-blue-500">
							{nightly ? `$${nightly}` : ""}
						</div>
					</div>
					<div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
						<div
							className={`${
								weekly ? "" : "line-through"
							} text-gray-500 mr-2 font-bold`}>
							Weekly
						</div>
						{!weekly && (
							<div className="text-2xl font-bold">
								<FaTimes className="text-red-700" />
							</div>
						)}
						<div className="text-2xl font-bold text-blue-500">
							{weekly ? `$${weekly}` : ""}
						</div>
					</div>
					<div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
						<div
							className={`${
								monthly ? "" : "line-through"
							} text-gray-500 mr-2 font-bold`}>
							Monthly
						</div>
						{!monthly && (
							<div className="text-2xl font-bold">
								<FaTimes className="text-red-700" />
							</div>
						)}
						<div className="text-2xl font-bold text-blue-500">
							{monthly ? `$${monthly}` : ""}
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white p-6 rounded-lg shadow-md mt-6">
				<h3 className="text-lg font-bold mb-6">Description & Details</h3>
				<div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
					<p>
						<FaBed className="fa-solid fa-bed inline-block mr-2" />
						{beds}
						<span className="hidden sm:inline"> Beds</span>
					</p>
					<p>
						<FaBath className="fa-solid fa-bath inline-block mr-2" /> {baths}
						<span className="hidden sm:inline"> Baths</span>
					</p>
					<p>
						<FaRulerCombined className="fa-solid fa-ruler-combined inline-block mr-2" />
						{square_feet} <span className="hidden sm:inline"> sqft</span>
					</p>
				</div>
				<p className="text-gray-500 mb-4">{description}</p>
			</div>

			<div className="bg-white p-6 rounded-lg shadow-md mt-6">
				<h3 className="text-lg font-bold mb-6">Amenities</h3>

				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
					{amenities.map((amenity, index) => (
						<li key={index} className="flex items-center mb-2">
							<FaCheck className="text-green-500 mr-2" />
							{amenity}
						</li>
					))}
				</ul>
			</div>
			{/* <!-- Map --> */}
			<div className="bg-white p-6 rounded-lg shadow-md mt-6">
				<PropertyMap property={serializedProperty} />
			</div>
		</main>
	);
};

export default PropertyDetails;
