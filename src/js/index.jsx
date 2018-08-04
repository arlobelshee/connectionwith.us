import React from "react";
import ReactDOM from "react-dom";
import { UserData } from "./save-user-data.js";
import FlickrGallery from "./flickr/FlickrGallery.jsx";
import { DrinkOption, HideWarning } from "./DrinkOption.jsx";
import { UserProfile } from "./UserProfile.jsx";
import { EventInvitation } from "./EventInvitation.jsx";

("use strict");

const user_data = new UserData();

document.querySelectorAll(".photo-gallery").forEach(domContainer =>
	ReactDOM.render(
		<div style={{ height: "100%", width: "100%" }}>
			<FlickrGallery {...domContainer.dataset} />
		</div>,
		domContainer
	)
);

document
	.querySelectorAll(".drink-choice")
	.forEach(domContainer =>
		ReactDOM.render(
			<DrinkOption user_data={user_data} {...domContainer.dataset} />,
			domContainer
		)
	);

document
	.querySelectorAll(".event-invitation")
	.forEach(domContainer =>
		ReactDOM.render(
			<EventInvitation user_data={user_data} {...domContainer.dataset} />,
			domContainer
		)
	);

ReactDOM.render(
	<UserProfile user_data={user_data} />,
	document.getElementById("user-profile")
);

document
	.querySelectorAll(".no-react")
	.forEach(domContainer => ReactDOM.render(<HideWarning />, domContainer));
$(document).ready(() => $(".no-react").removeClass("hidden"));
