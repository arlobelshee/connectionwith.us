import React from "react";

("use strict");

export default class ShowMeaning extends React.Component {
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
