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
		<div className="rounded-xl shadow-md relative">
			<Image
				src={images[0]}
				alt=""
				height="0"
				width="0"
				sizes="100vh"
				className="w-full h-auto rounded-t-xl"
			/>
			<div className="p-4">
				<div className="text-left md:text-center lg:text-left mb-6">
					<div className="text-gray-600">{type}</div>
					<h3 className="text-xl font-bold">{name}</h3>
				</div>
				<h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
					{getRateDisplay()}
				</h3>

				<div className="flex justify-center gap-4 text-gray-500 mb-4">
					<p>
						<FaBed className="md:hidden lg:inline" /> {beds}
						<span className="md:hidden lg:inline"> </span>
					</p>
					<p>
						<FaBath className="md:hidden lg:inline" /> {baths}
						<span className="md:hidden lg:inline"> Baths</span>
					</p>
					<p>
						<FaRulerCombined className="md:hidden lg:inline" />
						{square_feet} <span className="md:hidden lg:inline">sqft</span>
					</p>
				</div>

				<div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
					<p>
						<FaMoneyBill className="md:hidden lg:inline" /> Weekly
					</p>
					<p>
						<FaMoneyBill className="md:hidden lg:inline" /> Monthly
					</p>
				</div>

				<div className="border border-gray-100 mb-5"></div>

				<div className="flex flex-col lg:flex-row justify-between mb-4">
					<div className="flex align-middle gap-2 mb-4 lg:mb-0">
						<FaMapMarker className="text-orange-700 mt-1" />
						<span className="text-orange-700">
							{" "}
							{location.city} {location.state}{" "}
						</span>
					</div>
					<Link
						href={`/properties/${_id}`}
						className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm">
						details
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PropertyCard;
