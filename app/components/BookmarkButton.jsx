"use client";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { bookmarkProperty } from "../actions/userActions";
import { toast } from "react-toastify";

function BookmarkButton({ property, isBookmarked }) {
	const handleBookmark = async (propertyId) => {
		const response = await bookmarkProperty(propertyId);
		if (response.removed) toast.success("Property Unbookmarked Successfully.");
		if (response.added) toast.success("Property Bookmarked Successfully.");
	};
	return (
		<button
			className={`${
				isBookmarked ? "bg-red-500 hover:bg-red-600" : ""
			} bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
			onClick={() => handleBookmark(property._id)}>
			{isBookmarked ? (
				<>
					<FaRegBookmark className="fas fa-reg-bookmark mr-2" />
					Unbookmark
				</>
			) : (
				<>
					<FaBookmark className="fas fa-bookmark mr-2" />
					Bookmark
				</>
			)}
		</button>
	);
}

export default BookmarkButton;
