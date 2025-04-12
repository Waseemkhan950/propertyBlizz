"use client";
import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	EmailShareButton,
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
	EmailIcon,
} from "react-share";
function ShareButton({ property }) {
	const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
	return (
		<>
			<h3 className="text-xl font-semibold text-blue-800 mb-4 pt-2">
				Share This Property
			</h3>
			<div className="flex gap-4 justify-center pb-6 transition-all duration-300 hover:gap-5">
				<FacebookShareButton
					url={shareUrl}
					quote={property.name}
					hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}>
					<FacebookIcon size={40} round={true} />
				</FacebookShareButton>
				<TwitterShareButton
					url={shareUrl}
					title={property.name}
					hashtags={[`#${property.type.replace(/\s/g, "")}ForRent`]}>
					<TwitterIcon size={40} round={true} />
				</TwitterShareButton>
				<WhatsappShareButton
					url={shareUrl}
					title={property.name}
					separator="::">
					<WhatsappIcon size={40} round={true} />
				</WhatsappShareButton>
				<EmailShareButton
					url={shareUrl}
					subject={property.name}
					body={`Check out this property: ${shareUrl}`}>
					<EmailIcon size={40} round={true} />
				</EmailShareButton>
			</div>
		</>
	);
}

export default ShareButton;
