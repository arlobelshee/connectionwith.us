import React from "react";
import ReactDOM from "react-dom";
import { loaded, UserData } from "./save-user-data.js";
import FlickrGallery from "./flickr/FlickrGallery.jsx";
import { DrinkOption, HideWarning } from "./DrinkOption.jsx";
import { UserProfile } from "./UserProfile.jsx";

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
	.querySelectorAll(".meaning")
	.forEach(domContainer =>
		ReactDOM.render(
			<DrinkOption user_data={user_data} {...domContainer.dataset} />,
			domContainer
		)
	);

ReactDOM.render(<UserProfile user_data={user_data} />, document.getElementById("user-profile"));

document
	.querySelectorAll(".no-react")
	.forEach(domContainer => ReactDOM.render(<HideWarning />, domContainer));
$(document).ready(()=> $("#no-old-browsers-warning").removeClass("hidden"));
