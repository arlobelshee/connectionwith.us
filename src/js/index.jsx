import React from "react";
import ReactDOM from "react-dom";
import FlickrGallery from "./flickr/FlickrGallery";
import "./flickr/index.css";

("use strict");

document.querySelectorAll(".photo-gallery").forEach(domContainer =>
	ReactDOM.render(
		<div style={{ height: "100%", width: "100%" }}>
			<FlickrGallery {...domContainer.dataset} />
		</div>,
		domContainer
	)
);

class ShowMeaning extends React.Component {
	constructor(props) {
		super(props);
		this.meanings = [props.no, props.some, props.yes];
		this.state = { value: props.initialvalue };
		document.querySelector(
			"input[name=" + props.fieldname + "]"
		).oninput = this.onChange.bind(this);
		this.currentMeaning = this.currentMeaning.bind(this);
	}

	onChange(evt) {
		this.setState({ value: evt.target.value });
	}

	currentMeaning() {
		return this.meanings[this.state.value];
	}

	render() {
		return <span>{this.currentMeaning()}</span>;
	}
}

document
	.querySelectorAll(".meaning")
	.forEach(domContainer =>
		ReactDOM.render(<ShowMeaning {...domContainer.dataset} />, domContainer)
	);
