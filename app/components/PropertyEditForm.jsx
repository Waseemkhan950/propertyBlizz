"use client";

import { toast } from "react-toastify";
import { editProperty } from "../actions/propertyActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
			<h2 className="text-3xl text-center font-semibold mb-6">
				Update Property
			</h2>

			<div className="mb-4">
				<label htmlFor="type" className="block text-gray-700 font-bold mb-2">
					Property Type
				</label>
				<select
					id="type"
					defaultValue={type}
					name="type"
					className="border rounded w-full py-2 px-3"
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
			<div className="mb-4">
				<label className="block text-gray-700 font-bold mb-2">
					Listing Name
				</label>
				<input
					type="text"
					id="name"
					defaultValue={name}
					name="name"
					className="border rounded w-full py-2 px-3 mb-2"
					placeholder="eg. Beautiful Apartment In Miami"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="description"
					className="block text-gray-700 font-bold mb-2">
					Description
				</label>
				<textarea
					id="description"
					name="description"
					className="border rounded w-full py-2 px-3"
					rows="4"
					defaultValue={description}
					placeholder="Add an optional description of your property"></textarea>
			</div>

			<div className="mb-4 bg-blue-50 p-4">
				<label className="block text-gray-700 font-bold mb-2">Location</label>
				<input
					type="text"
					id="street"
					defaultValue={street}
					name="location.street"
					className="border rounded w-full py-2 px-3 mb-2"
					placeholder="Street"
				/>
				<input
					type="text"
					id="city"
					defaultValue={city}
					name="location.city"
					className="border rounded w-full py-2 px-3 mb-2"
					placeholder="City"
					required
				/>
				<input
					type="text"
					id="state"
					defaultValue={state}
					name="location.state"
					className="border rounded w-full py-2 px-3 mb-2"
					placeholder="State"
					required
				/>
				<input
					type="text"
					id="zipcode"
					defaultValue={zipcode}
					name="location.zipcode"
					className="border rounded w-full py-2 px-3 mb-2"
					placeholder="Zipcode"
				/>
			</div>

			<div className="mb-4 flex flex-wrap">
				<div className="w-full sm:w-1/3 pr-2">
					<label htmlFor="beds" className="block text-gray-700 font-bold mb-2">
						Beds
					</label>
					<input
						type="number"
						id="beds"
						defaultValue={beds}
						name="beds"
						className="border rounded w-full py-2 px-3"
						required
					/>
				</div>
				<div className="w-full sm:w-1/3 px-2">
					<label htmlFor="baths" className="block text-gray-700 font-bold mb-2">
						Baths
					</label>
					<input
						type="number"
						id="baths"
						name="baths"
						defaultValue={baths}
						className="border rounded w-full py-2 px-3"
						required
					/>
				</div>
				<div className="w-full sm:w-1/3 pl-2">
					<label
						htmlFor="square_feet"
						className="block text-gray-700 font-bold mb-2">
						Square Feet
					</label>
					<input
						type="number"
						id="square_feet"
						name="square_feet"
						defaultValue={square_feet}
						className="border 
                                    rounded w-full py-2 px-3"
						required
					/>
				</div>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700 font-bold mb-2">Amenities</label>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
					<div>
						<input
							type="checkbox"
							id="amenity_wifi"
							name="amenities"
							value="Wifi"
							defaultChecked={amenities.includes("Wifi")}
							className="mr-2"
						/>
						<label htmlFor="amenity_wifi">Wifi</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_kitchen"
							defaultChecked={amenities.includes("Full kitchen")}
							name="amenities"
							value="Full kitchen"
							className="mr-2"
						/>
						<label htmlFor="amenity_kitchen">Full kitchen</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_washer_dryer"
							defaultChecked={amenities.includes("Washer & Dryer")}
							name="amenities"
							value="Washer & Dryer"
							className="mr-2"
						/>
						<label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_free_parking"
							defaultChecked={amenities.includes("Free Parking")}
							name="amenities"
							value="Free Parking"
							className="mr-2"
						/>
						<label htmlFor="amenity_free_parking">Free Parking</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_pool"
							defaultChecked={amenities.includes("Swimming Pool")}
							name="amenities"
							value="Swimming Pool"
							className="mr-2"
						/>
						<label htmlFor="amenity_pool">Swimming Pool</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_hot_tub"
							defaultChecked={amenities.includes("Hot Tub")}
							name="amenities"
							value="Hot Tub"
							className="mr-2"
						/>
						<label htmlFor="amenity_hot_tub">Hot Tub</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_24_7_security"
							defaultChecked={amenities.includes("24/7 Security")}
							name="amenities"
							value="24/7 Security"
							className="mr-2"
						/>
						<label htmlFor="amenity_24_7_security">24/7 Security</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_wheelchair_accessible"
							defaultChecked={amenities.includes("Wheelchair Accessible")}
							name="amenities"
							value="Wheelchair Accessible"
							className="mr-2"
						/>
						<label htmlFor="amenity_wheelchair_accessible">
							Wheelchair Accessible
						</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_elevator_access"
							defaultChecked={amenities.includes("Elevator Access")}
							name="amenities"
							value="Elevator Access"
							className="mr-2"
						/>
						<label htmlFor="amenity_elevator_access">Elevator Access</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_dishwasher"
							defaultChecked={amenities.includes("Dishwasher")}
							name="amenities"
							value="Dishwasher"
							className="mr-2"
						/>
						<label htmlFor="amenity_dishwasher">Dishwasher</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_gym_fitness_center"
							defaultChecked={amenities.includes("Gym/Fitness Center")}
							name="amenities"
							value="Gym/Fitness Center"
							className="mr-2"
						/>
						<label htmlFor="amenity_gym_fitness_center">
							Gym/Fitness Center
						</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_air_conditioning"
							defaultChecked={amenities.includes("Air Conditioning")}
							name="amenities"
							value="Air Conditioning"
							className="mr-2"
						/>
						<label htmlFor="amenity_air_conditioning">Air Conditioning</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_balcony_patio"
							defaultChecked={amenities.includes("Balcony/Patio")}
							name="amenities"
							value="Balcony/Patio"
							className="mr-2"
						/>
						<label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_smart_tv"
							defaultChecked={amenities.includes("Smart TV")}
							name="amenities"
							value="Smart TV"
							className="mr-2"
						/>
						<label htmlFor="amenity_smart_tv">Smart TV</label>
					</div>
					<div>
						<input
							type="checkbox"
							id="amenity_coffee_maker"
							defaultChecked={amenities.includes("Coffee Maker")}
							name="amenities"
							value="Coffee Maker"
							className="mr-2"
						/>
						<label htmlFor="amenity_coffee_maker">Coffee Maker</label>
					</div>
				</div>
			</div>

			<div className="mb-4 bg-blue-50 p-4">
				<label className="block text-gray-700 font-bold mb-2">
					Rates (Leave blank if not applicable)
				</label>
				<div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
					<div className="flex items-center">
						<label htmlFor="weekly_rate" className="mr-2">
							Weekly
						</label>
						<input
							defaultValue={weekly}
							type="number"
							id="weekly_rate"
							name="rates.weekly"
							className="border rounded w-full py-2 px-3"
						/>
					</div>
					<div className="flex items-center">
						<label htmlFor="monthly_rate" className="mr-2">
							Monthly
						</label>
						<input
							type="number"
							id="monthly_rate"
							defaultValue={monthly}
							name="rates.monthly"
							className="border rounded w-full py-2 px-3"
						/>
					</div>
					<div className="flex items-center">
						<label htmlFor="nightly_rate" className="mr-2">
							Nightly
						</label>
						<input
							type="number"
							id="nightly_rate"
							defaultValue={nightly}
							name="rates.nightly"
							className="border rounded w-full py-2 px-3"
						/>
					</div>
				</div>
			</div>

			<div className="mb-4">
				<label
					htmlFor="seller_name"
					className="block text-gray-700 font-bold mb-2">
					Seller Name
				</label>
				<input
					type="text"
					defaultValue={sellerName}
					id="seller_name"
					name="seller_info.name"
					className="border rounded w-full py-2 px-3"
					placeholder="Name"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="seller_email"
					className="block text-gray-700 font-bold mb-2">
					Seller Email
				</label>
				<input
					type="email"
					id="seller_email"
					defaultValue={sellerEmail}
					name="seller_info.email"
					className="border rounded w-full py-2 px-3"
					placeholder="Email address"
					required
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="seller_phone"
					className="block text-gray-700 font-bold mb-2">
					Seller Phone
				</label>
				<input
					type="tel"
					id="seller_phone"
					defaultValue={sellerPhone}
					name="seller_info.phone"
					className="border rounded w-full py-2 px-3"
					placeholder="Phone"
				/>
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

			<div>
				<button
					className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline ${
						loading
							? "opacity-50 cursor-not-allowed 25000"
							: "hover:bg-blue-600"
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
