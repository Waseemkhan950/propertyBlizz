import SavedProperties from "@/app/components/SavedProperties";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function BookMarkedProperties() {
	const sessionUser = await getSessionUser();
	const { userId } = sessionUser;
	let userSavedProperties = [];

	if (userId) {
		userSavedProperties = await User.findById(userId)
			.populate("bookmarks")
			.lean();
		userSavedProperties = userSavedProperties.bookmarks;
	}
	return <SavedProperties savedProperties={userSavedProperties} />;
}

export default BookMarkedProperties;
