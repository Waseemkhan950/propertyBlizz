import Link from "next/link";

const InfoBox = ({
	children,
	heading,
	className,
	buttonInfo: { text, color, link },
}) => {
	return (
		<div className={`${className} p-6 rounded-lg shadow-md`}>
			<h2 className="text-2xl font-bold text-gray-800">{heading}</h2>
			<p className="mt-2 mb-4 text-gray-800">{children}</p>
			<Link
				href={link}
				className={`${color} inline-block  text-white rounded-lg px-4 py-2 hover:bg-gray-700`}>
				{text}
			</Link>
		</div>
	);
};

export default InfoBox;
