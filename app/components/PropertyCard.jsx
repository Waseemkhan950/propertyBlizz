import Image from "next/image";
import Link from "next/link";
import {
	FaBed,
	FaBath,
	FaRulerCombined,
	FaMoneyBill,
	FaMapMarker,
} from "react-icons/fa";

const PropertyCard = ({ property }) => {
	const {
		images,
		baths,
		beds,
		square_feet,
		type,
		_id,
		description,
		location,
		is_Featured,
		rates,
		seller_info,
		name,
	} = property;
	const getRateDisplay = () => {
		if (rates.monthly) {
			return `$${rates.monthly.toLocaleString()}/Month`;
		} else if (rates.weekly) {
			return `$${rates.weekly.toLocaleString()}/Week`;
		} else if (rates.nightly) {
			return `$${rates.nightly.toLocaleString()}/Night`;
		} else if (rates.daily) {
			return `$${rates.daily.toLocaleString()}/Day`;
		}
		return "Contact for Rates";
	};

	return (
		<div className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden">
			<div className="relative overflow-hidden group">
				<Link href={`/properties/${_id}`}>
					<Image
						src={images[0]}
						alt=""
						height="0"
						width="0"
						sizes="100vh"
						className="w-full h-[250px] object-cover rounded-t-xl transform transition-transform duration-300 group-hover:scale-105"
					/>
				</Link>

				<div className="absolute top-4 right-4">
					<h3 className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg text-blue-600 font-bold text-sm shadow-lg">
						{getRateDisplay()}
					</h3>
				</div>
			</div>
			<div className="p-6">
				<div className="mb-4">
					<div className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-1">
						{type}
					</div>
					<h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">
						{name}
					</h3>
				</div>

				<div className="flex justify-between items-center gap-4 text-gray-600 mb-6">
					<div className="flex items-center gap-2">
						<FaBed className="text-blue-500 text-lg" />
						<span className="text-sm">{beds} Beds</span>
					</div>
					<div className="flex items-center gap-2">
						<FaBath className="text-blue-500 text-lg" />
						<span className="text-sm">{baths} Baths</span>
					</div>
					<div className="flex items-center gap-2">
						<FaRulerCombined className="text-blue-500 text-lg" />
						<span className="text-sm">{square_feet} sqft</span>
					</div>
				</div>

				<div className="flex justify-center gap-6 text-sm text-gray-700 mb-6">
					<div className="flex items-center gap-2">
						<FaMoneyBill className="text-green-600" />
						<span>Weekly</span>
					</div>
					<div className="flex items-center gap-2">
						<FaMoneyBill className="text-green-600" />
						<span>Monthly</span>
					</div>
				</div>

				<div className="border-t border-gray-100 my-4"></div>

				<div className="flex flex-col lg:flex-row justify-between items-center gap-4">
					<div className="flex items-center gap-2">
						<FaMapMarker className="text-orange-600" />
						<span className="text-gray-700 font-medium">
							{location.city}, {location.state}
						</span>
					</div>
					<Link
						href={`/properties/${_id}`}
						className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-center text-sm font-medium transition-colors duration-300 hover:shadow-lg">
						Details
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PropertyCard;
