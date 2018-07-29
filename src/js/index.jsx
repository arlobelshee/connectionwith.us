import React from "react";
import ReactDOM from "react-dom";
import FlickrGallery from "./flickr/FlickrGallery.jsx";
import ShowMeaning from "./ShowMeaning.jsx";
import { slugify, loaded, createUserData } from "./save-user-data.js";

("use strict");

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
		ReactDOM.render(<ShowMeaning {...domContainer.dataset} />, domContainer)
	);

$(document).ready(loaded);
