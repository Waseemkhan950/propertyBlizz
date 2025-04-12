"use client";

import { toast } from "react-toastify";
import { addProperty } from "../actions/propertyActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	FaList,
	FaChevronUp,
	FaEnvelope,
	FaPhone,
	FaUserCircle,
	FaImages,
} from "react-icons/fa";
const AddPropertyForm = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData(e.currentTarget);
		const response = await addProperty(formData);
		response.success === true;
		router.push(`/properties/${response.propertyId}`);
		toast.success("Property Added Successfully.");
		setLoading(false);
		// e.currentTarget.reset();
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2 className="text-3xl text-center font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
				Add Property
			</h2>

			<div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
				<label htmlFor="type" className="block text-gray-700 font-bold mb-4">
					Property Type
				</label>
				<div className="relative">
					<select
						id="type"
						name="type"
						className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md bg-white appearance-none cursor-pointer"
						required>
						<option value="" disabled selected>
							Select a property type
						</option>
						<option value="Apartment">Apartment</option>
						<option value="Condo">Condo</option>
						<option value="House">House</option>
						<option value="CabinOrCottage">Cabin or Cottage</option>
						<option value="Room">Room</option>
						<option value="Studio">Studio</option>
						<option value="Other">Other</option>
					</select>
					<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-600">
						<FaChevronUp className="w-4 h-4" />
					</div>
				</div>
			</div>
			<div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
				<label className="block text-gray-700 font-bold mb-4">
					Listing Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md mb-2"
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
				<div className="relative">
					<textarea
						id="description"
						name="description"
						className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
						rows="4"
						placeholder="Add an optional description of your property"></textarea>
					<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl pointer-events-none opacity-0 transition-opacity duration-200 peer-focus:opacity-100"></div>
				</div>
			</div>

			<div className="mb-4 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
				<label className="block text-gray-700 font-bold mb-4">Location</label>
				<input
					type="text"
					id="street"
					name="location.street"
					className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md mb-3"
					placeholder="Street"
				/>
				<input
					type="text"
					id="city"
					name="location.city"
					className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md mb-3"
					placeholder="City"
					required
				/>
				<input
					type="text"
					id="state"
					name="location.state"
					className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md mb-3"
					placeholder="State"
					required
				/>
				<input
					type="text"
					id="zipcode"
					name="location.zipcode"
					className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md mb-3"
					placeholder="Zipcode"
				/>
			</div>

			<div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div className="relative">
						<label
							htmlFor="beds"
							className="block text-gray-700 font-bold mb-2">
							Beds
						</label>
						<div className="relative">
							{" "}
							<input
								type="number"
								id="beds"
								name="beds"
								min="0"
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								required
							/>
							<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
								<FaChevronUp className="w-5 h-5" />
							</div>
						</div>
					</div>
					<div className="relative">
						<label
							htmlFor="baths"
							className="block text-gray-700 font-bold mb-2">
							Baths
						</label>
						<div className="relative">
							{" "}
							<input
								type="number"
								id="baths"
								name="baths"
								min="0"
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								required
							/>
							<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
								<FaChevronUp className="w-5 h-5" />
							</div>
						</div>
					</div>
					<div className="relative">
						<label
							htmlFor="square_feet"
							className="block text-gray-700 font-bold mb-2">
							Square Feet
						</label>
						<div className="relative">
							{" "}
							<input
								type="number"
								id="square_feet"
								name="square_feet"
								min="0"
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								required
							/>
							<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
								<FaChevronUp className="w-5 h-5" />
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
								name="amenities"
								value="Full kitchen"
								className="h-5 w-5 rounded border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-colors duration-200 ease-in-out cursor-pointer"
							/>
						</div>
						<label
							htmlFor="amenity_kitchen"
							className="ml-3 text-gray-700 cursor-pointer select-none hover:text-blue-500 transition-colors duration-200">
							Full Kitchen
						</label>
					</div>
					<div className="relative flex items-start">
						<div className="flex items-center h-5">
							<input
								type="checkbox"
								id="amenity_washer_dryer"
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
					Rates (Leave blank if not applicable)
				</label>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div className="relative">
						<label
							htmlFor="weekly_rate"
							className="block text-gray-700 font-bold mb-2">
							Weekly Rate
						</label>
						<div className="relative">
							<input
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
							Monthly Rate
						</label>
						<div className="relative">
							<input
								type="number"
								id="monthly_rate"
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
							Nightly Rate
						</label>
						<div className="relative">
							<input
								type="number"
								id="nightly_rate"
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
							Full Name
						</label>
						<div className="relative">
							<input
								type="text"
								id="seller_name"
								name="seller_info.name"
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								placeholder="Enter your full name"
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
							Email Address
						</label>
						<div className="relative">
							<input
								type="email"
								id="seller_email"
								name="seller_info.email"
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								placeholder="Enter your email"
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
							Phone Number
						</label>
						<div className="relative">
							<input
								type="tel"
								id="seller_phone"
								name="seller_info.phone"
								className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-500 hover:shadow-md"
								placeholder="Enter your phone number"
							/>
							<div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
								<FaPhone className="w-5 h-5" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
				<label htmlFor="images" className="block text-gray-700 font-bold mb-4">
					Images (Select up to 4 images)
				</label>
				<div className="relative">
					<input
						type="file"
						id="images"
						name="images"
						className="hidden"
						accept="image/*"
						multiple
						required
						onChange={(e) =>
							(e.target.nextElementSibling.textContent = e.target.files.length
								? `${e.target.files.length} files selected`
								: "Browse Images")
						}
					/>
					<label
						htmlFor="images"
						className="w-full py-4 px-6 text-gray-600 font-semibold rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer group">
						<FaImages className="h-6 w-6" />
						<span>Browse Images</span>
					</label>
				</div>
			</div>
			<button
				className="w-full py-4 px-6 text-white font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 "
				type="submit"
				disabled={loading}>
				<FaList className="text-white/90" />

				{loading ? <span>Adding Property ...</span> : <span>Add Property</span>}
			</button>
		</form>
	);
};

export default AddPropertyForm;
