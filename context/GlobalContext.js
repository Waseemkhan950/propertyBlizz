"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getUnreadMessagesCount } from "@/app/actions/messageAction";
import { useSession } from "next-auth/react";
const GlobalContext = createContext();
// create provider
export const GlobalProvider = ({ children }) => {
	const [unreadCount, setUnreadCount] = useState(0);
	const { data: session } = useSession();

	useEffect(() => {
		if (session && session.user) {
			getUnreadMessagesCount(session.user.id).then((count) => {
				setUnreadCount(count);
			});
		}
	}, [session]);
	return (
		<GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
			{children}
		</GlobalContext.Provider>
	);
};
// crate custom hook to consume context
export const useGlobalContext = () => {
	return useContext(GlobalContext);
};
