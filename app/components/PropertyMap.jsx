"use client";
import { useEffect, useState } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import image from "../assets/images/pin.svg";
import Spinner from "./Spinner";
import Image from "next/image";

function PropertyMap({ property }) {
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);
	const [viewport, setViewport] = useState({
		latitude: 0,
		longitude: 0,
		zoom: 12,
		width: "100%",
		height: "600px",
		margin: "0 auto",
	});
	const [loading, setLoading] = useState(true);
	const [gecodeError, setGecodeError] = useState(false);
	setDefaults({
		key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
		language: "en",
		region: "US",
	});
	useEffect(() => {
		const fetchCoordinates = async () => {
			try {
				const res = await fromAddress(
					`${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`
				);
				// check geocode results
				if (res.results.length === 0) {
					setGecodeError(true);
					return;
				}
				const { lat, lng } = res.results[0].geometry.location;
				setLat(lat);
				setLng(lng);
				setViewport({
					latitude: lat,
					longitude: lng,
					...viewport,
				});
			} catch (error) {
				console.error("Error fetching coordinates:", error);
				setGecodeError(true);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};
		fetchCoordinates();
	}, []);
	if (loading) return <Spinner />;
	if (gecodeError) return <p>Geocode Error</p>;
	return (
		!loading && (
			<Map
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
				initialViewState={{
					latitude: lat,
					longitude: lng,
					zoom: 15,
				}}
				style={{ width: "100%", height: "600px" }}
				mapStyle="mapbox://styles/mapbox/streets-v12">
				<Marker latitude={lat} longitude={lng} anchor="bottom">
					<Image src={image} alt="location" width={40} height={40} />
				</Marker>
			</Map>
		)
	);
}

export default PropertyMap;
