import React from 'react';
import ReactDOM from 'react-dom';
import { ResizableBox } from "react-resizable";
import FlickrGallery from "./flickr/src/FlickrGallery";
import "./flickr/src/index.css";
import "react-resizable/css/styles.css";

"use strict";


document.querySelectorAll(".photo-gallery").forEach(domContainer =>
	ReactDOM.render(
		<ResizableBox width={640} height={320}>
			<FlickrGallery {...domContainer.dataset} />
		</ResizableBox>,
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
