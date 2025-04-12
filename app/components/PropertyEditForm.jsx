"use client";

import { toast } from "react-toastify";
import { editProperty } from "../actions/propertyActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	FaUserCircle,
	FaEnvelope,
	FaPhone,
	FaBed,
	FaBath,
	FaRulerCombined,
	FaMapMarkerAlt,
	FaDollarSign,
	FaWifi,
	FaUtensils,
	FaWasher,
	FaCar,
	FaSwimmingPool,
	FaHotTub,
	FaShieldAlt,
	FaWheelchair,
	FaElevator,
	FaSink,
	FaDumbbell,
	FaSnowflake,
	FaUmbrella,
	FaTv,
	FaCoffee,
	FaList,
} from "react-icons/fa";

function PropertyEditForm({ property }) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const {
		name,
		type,
		description,
		images,
		amenities,
		location: { street, city, state, zipcode },
		beds,
		baths,
		square_feet,
		seller_info: { name: sellerName, email: sellerEmail, phone: sellerPhone },
		rates: { nightly, weekly, monthly },
	} = property;
	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.currentTarget);
		const response = await editProperty(property._id, formData);
		if (response.success) toast.success("Property Updated Successfully.");
		router.push(`/properties/${response.propertyId}`);
		setLoading(false);
		// e.currentTarget.reset();
	}
	return (
		<form onSubmit={handleSubmit}>
			<h2 className="text-3xl text-center font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
				Update Property
			</h2>

			<div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
				<label htmlFor="type" className="block text-gray-700 font-bold mb-4">
					Property Type
				</label>
				<div className="relative">
					<select
						id="type"
						defaultValue={type}
						name="type"
						className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md bg-white appearance-none cursor-pointer"
						required>
						<option value="Apartment">Apartment</option>
						<option value="Condo">Condo</option>
						<option value="House">House</option>
						<option value="CabinOrCottage">Cabin or Cottage</option>
						<option value="Room">Room</option>
						<option value="Studio">Studio</option>
						<option value="Other">Other</option>
					</select>
				</div>
			</div>
			<div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
				<label className="block text-gray-700 font-bold mb-4">
					Listing Name
				</label>
				<input
					type="text"
					id="name"
					defaultValue={name}
					name="name"
					className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
					placeholder="eg. Beautiful Apartment In Miami"
					required
				/>
			</div>
			<div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
				<label
					htmlFor="description"
					className="block text-gray-700 font-bold mb-4">
					Description
				</label>
				<textarea
					id="description"
					name="description"
					className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
					rows="4"
					defaultValue={description}
					placeholder="Add an optional description of your property"></textarea>
			</div>

			<div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
				<label className="block text-gray-700 font-bold mb-4">
					<FaMapMarkerAlt className="inline mr-2" />
					Location
				</label>
				<div className="relative mb-3">
					<input
						type="text"
						id="street"
						defaultValue={street}
						name="location.street"
						className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
						placeholder="Street"
					/>
					<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
						<FaMapMarkerAlt className="w-5 h-5" />
					</div>
				</div>
				<div className="relative mb-3">
					<input
						type="text"
						id="city"
						defaultValue={city}
						name="location.city"
						className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
						placeholder="City"
						required
					/>
					<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
						<FaMapMarkerAlt className="w-5 h-5" />
					</div>
				</div>
				<div className="relative mb-3">
					<input
						type="text"
						id="state"
						defaultValue={state}
						name="location.state"
						className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
						placeholder="State"
						required
					/>
					<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
						<FaMapMarkerAlt className="w-5 h-5" />
					</div>
				</div>
				<div className="relative">
					<input
						type="text"
						id="zipcode"
						defaultValue={zipcode}
						name="location.zipcode"
						className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
						placeholder="Zipcode"
					/>
					<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
						<FaMapMarkerAlt className="w-5 h-5" />
					</div>
				</div>
			</div>

			<div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div className="relative">
						<label
							htmlFor="beds"
							className="block text-gray-700 font-bold mb-2">
							<FaBed className="inline mr-2" />
							Beds
						</label>
						<div className="relative">
							<input
								type="number"
								id="beds"
								defaultValue={beds}
								name="beds"
								min="0"
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								required
							/>
							<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
								<FaBed className="w-5 h-5" />
							</div>
						</div>
					</div>
					<div className="relative">
						<label
							htmlFor="baths"
							className="block text-gray-700 font-bold mb-2">
							<FaBath className="inline mr-2" />
							Baths
						</label>
						<div className="relative">
							<input
								type="number"
								id="baths"
								name="baths"
								min="0"
								defaultValue={baths}
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								required
							/>
							<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
								<FaBath className="w-5 h-5" />
							</div>
						</div>
					</div>
					<div className="relative">
						<label
							htmlFor="square_feet"
							className="block text-gray-700 font-bold mb-2">
							<FaRulerCombined className="inline mr-2" />
							Square Feet
						</label>
						<div className="relative">
							<input
								type="number"
								id="square_feet"
								name="square_feet"
								min="0"
								defaultValue={square_feet}
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								required
							/>
							<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
								<FaRulerCombined className="w-5 h-5" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
				<label className="block text-gray-700 font-bold mb-4">Amenities</label>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_wifi"
								name="amenities"
								value="Wifi"
								defaultChecked={amenities.includes("Wifi")}
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_wifi"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Wifi
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_kitchen"
								defaultChecked={amenities.includes("Full kitchen")}
								name="amenities"
								value="Full kitchen"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_kitchen"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Full kitchen
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_washer_dryer"
								defaultChecked={amenities.includes("Washer & Dryer")}
								name="amenities"
								value="Washer & Dryer"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_washer_dryer"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Washer & Dryer
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_free_parking"
								defaultChecked={amenities.includes("Free Parking")}
								name="amenities"
								value="Free Parking"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_free_parking"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Free Parking
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_pool"
								defaultChecked={amenities.includes("Swimming Pool")}
								name="amenities"
								value="Swimming Pool"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_pool"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Swimming Pool
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_hot_tub"
								defaultChecked={amenities.includes("Hot Tub")}
								name="amenities"
								value="Hot Tub"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_hot_tub"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Hot Tub
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_24_7_security"
								defaultChecked={amenities.includes("24/7 Security")}
								name="amenities"
								value="24/7 Security"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_24_7_security"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							24/7 Security
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_wheelchair_accessible"
								defaultChecked={amenities.includes("Wheelchair Accessible")}
								name="amenities"
								value="Wheelchair Accessible"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_wheelchair_accessible"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Wheelchair Accessible
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_elevator_access"
								defaultChecked={amenities.includes("Elevator Access")}
								name="amenities"
								value="Elevator Access"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_elevator_access"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Elevator Access
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_dishwasher"
								defaultChecked={amenities.includes("Dishwasher")}
								name="amenities"
								value="Dishwasher"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_dishwasher"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Dishwasher
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_gym_fitness_center"
								defaultChecked={amenities.includes("Gym/Fitness Center")}
								name="amenities"
								value="Gym/Fitness Center"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_gym_fitness_center"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Gym/Fitness Center
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_air_conditioning"
								defaultChecked={amenities.includes("Air Conditioning")}
								name="amenities"
								value="Air Conditioning"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_air_conditioning"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Air Conditioning
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_balcony_patio"
								defaultChecked={amenities.includes("Balcony/Patio")}
								name="amenities"
								value="Balcony/Patio"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_balcony_patio"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Balcony/Patio
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_smart_tv"
								defaultChecked={amenities.includes("Smart TV")}
								name="amenities"
								value="Smart TV"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_smart_tv"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Smart TV
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_coffee_maker"
								defaultChecked={amenities.includes("Coffee Maker")}
								name="amenities"
								value="Coffee Maker"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_coffee_maker"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Coffee Maker
						</label>
					</div>
				</div>
			</div>

			<div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
				<label className="block text-gray-700 font-bold mb-4">
					<FaDollarSign className="inline mr-2" />
					Rates (Leave blank if not applicable)
				</label>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div className="relative">
						<label
							htmlFor="weekly_rate"
							className="block text-gray-700 font-bold mb-2">
							<FaDollarSign className="inline mr-2" />
							Weekly Rate
						</label>
						<div className="relative">
							<input
								defaultValue={weekly}
								type="number"
								id="weekly_rate"
								name="rates.weekly"
								min="0"
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								placeholder="Enter weekly rate"
							/>
							<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
								<span className="text-sm font-medium">$/week</span>
							</div>
						</div>
					</div>
					<div className="relative">
						<label
							htmlFor="monthly_rate"
							className="block text-gray-700 font-bold mb-2">
							<FaDollarSign className="inline mr-2" />
							Monthly Rate
						</label>
						<div className="relative">
							<input
								type="number"
								id="monthly_rate"
								defaultValue={monthly}
								name="rates.monthly"
								min="0"
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								placeholder="Enter monthly rate"
							/>
							<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
								<span className="text-sm font-medium">$/month</span>
							</div>
						</div>
					</div>
					<div className="relative">
						<label
							htmlFor="nightly_rate"
							className="block text-gray-700 font-bold mb-2">
							<FaDollarSign className="inline mr-2" />
							Nightly Rate
						</label>
						<div className="relative">
							<input
								type="number"
								id="nightly_rate"
								defaultValue={nightly}
								name="rates.nightly"
								min="0"
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								placeholder="Enter nightly rate"
							/>
							<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
								<span className="text-sm font-medium">$/night</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
				<label className="block text-gray-700 font-bold mb-4">
					Seller Information
				</label>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div className="relative">
						<label
							htmlFor="seller_name"
							className="block text-gray-700 font-bold mb-2">
							<FaUserCircle className="inline mr-2" />
							Name
						</label>
						<div className="relative">
							<input
								type="text"
								defaultValue={sellerName}
								id="seller_name"
								name="seller_info.name"
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								placeholder="Enter seller name"
							/>
							<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
								<FaUserCircle className="w-5 h-5" />
							</div>
						</div>
					</div>
					<div className="relative">
						<label
							htmlFor="seller_email"
							className="block text-gray-700 font-bold mb-2">
							<FaEnvelope className="inline mr-2" />
							Email
						</label>
						<div className="relative">
							<input
								type="email"
								id="seller_email"
								defaultValue={sellerEmail}
								name="seller_info.email"
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								placeholder="Enter seller email"
								required
							/>
							<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
								<FaEnvelope className="w-5 h-5" />
							</div>
						</div>
					</div>
					<div className="relative">
						<label
							htmlFor="seller_phone"
							className="block text-gray-700 font-bold mb-2">
							<FaPhone className="inline mr-2" />
							Phone
						</label>
						<div className="relative">
							<input
								type="tel"
								id="seller_phone"
								defaultValue={sellerPhone}
								name="seller_info.phone"
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								placeholder="Enter phone number"
							/>
							<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
								<FaPhone className="w-5 h-5" />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <div className="mb-4">
				<label htmlFor="images" className="block text-gray-700 font-bold mb-2">
					Images (Select up to 4 images)
				</label>
				<input
					type="file"
					id="images"
					name="images"
					className="border rounded w-full py-2 px-3"
					accept="image/*"
					multiple
					required
				/>
			</div> */}

			<div className="mt-8">
				<button
					className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
						loading ? "opacity-50 cursor-not-allowed" : ""
					}`}
					type="submit"
					disabled={loading}>
					{loading ? "Updating..." : "Update Property"}
				</button>
			</div>
		</form>
	);
}

export default PropertyEditForm;
