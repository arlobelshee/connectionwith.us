import React from "react";

("use strict");

function htmlDecode(input) {
	var doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
}

export default class ShowMeaning extends React.Component {
	constructor(props) {
		super(props);
		this.meanings = [htmlDecode(props.no), htmlDecode(props.some), htmlDecode(props.yes)];
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
		return <span dangerouslySetInnerHTML={{ __html: this.currentMeaning() }} />;
	}
}
