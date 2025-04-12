// import Image from "next/image";
// import Link from "next/link";
// import {
// 	FaMapMarker,
// 	FaBed,
// 	FaBath,
// 	FaRulerCombined,
// 	FaMoneyBill,
// } from "react-icons/fa";

// function FeaturedCard({ property }) {
// 	return (
// 		<div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative flex flex-col md:flex-row overflow-hidden group">
// 			{/* Property Image Section */}
// 			<div className="relative md:w-2/5 h-[350px] md:h-full overflow-hidden rounded-lg">
// 				<div className="relative h-full group-hover:scale-105 transition-transform duration-500 ease-in-out">
// 					<Image
// 						src={property.images[0]}
// 						alt={property.name}
// 						className="w-full h-full object-cover rounded-lg group-hover:brightness-90 transition-all duration-300"
// 						width={600} // Set appropriate width for Image
// 						height={400} // Set appropriate height for Image
// 						sizes="100vw"
// 					/>
// 					{/* Price Badge */}
// 					<div className="absolute top-4 left-4 z-10">
// 						<div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
// 							<span className="text-blue-600 font-bold text-lg">
// 								${property.price}
// 							</span>
// 						</div>
// 					</div>
// 					{/* Property Type Badge */}
// 					<div className="absolute top-4 right-4 z-10">
// 						<span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-md">
// 							{property.type}
// 						</span>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Property Details Section */}
// 			<div className="p-6 md:p-8 flex flex-col justify-between space-y-4 md:space-y-6">
// 				{/* Property Name */}
// 				<h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
// 					{property.name}
// 				</h3>

// 				<div className="grid grid-cols-3 gap-6 mb-6">
// 					<div className="flex items-center gap-2">
// 						<div className="p-2 bg-blue-50 rounded-full shadow-md">
// 							<FaBed className="text-blue-500" />
// 						</div>
// 						<span className="text-gray-600">
// 							{property.beds}
// 							<span className="hidden lg:inline"> Beds</span>
// 						</span>
// 					</div>
// 					<div className="flex items-center gap-2">
// 						<div className="p-2 bg-blue-50 rounded-full shadow-md">
// 							<FaBath className="text-blue-500" />
// 						</div>
// 						<span className="text-gray-600">
// 							{property.baths}
// 							<span className="hidden lg:inline"> Baths</span>
// 						</span>
// 					</div>
// 					<div className="flex items-center gap-2">
// 						<div className="p-2 bg-blue-50 rounded-full shadow-md">
// 							<FaRulerCombined className="text-blue-500" />
// 						</div>
// 						<span className="text-gray-600">
// 							{property.square_feet}
// 							<span className="hidden lg:inline"> sqft</span>
// 						</span>
// 					</div>
// 				</div>

// 				{/* Pricing Information Section */}
// 				<div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
// 					<p className="flex items-center gap-1">
// 						<FaMoneyBill /> Nightly
// 					</p>
// 					<p className="flex items-center gap-1">
// 						<FaMoneyBill /> Weekly
// 					</p>
// 				</div>

// 				<div className="border border-gray-200 mb-5"></div>

// 				{/* Location & View Details Button */}
// 				<div className="pt-6 mt-auto border-t border-gray-100">
// 					<div className="flex flex-col lg:flex-row items-center justify-between gap-4">
// 						<div className="flex items-center gap-2">
// 							<div className="p-2 bg-orange-50 rounded-full shadow-md">
// 								<FaMapMarker className="text-orange-600" />
// 							</div>
// 							<span className="text-gray-700 font-medium">
// 								{`${property.location.city}, ${property.location.state}`}
// 							</span>
// 						</div>
// 						<Link
// 							href={`/properties/${property._id}`}
// 							className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-center">
// 							Details
// 						</Link>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default FeaturedCard;
