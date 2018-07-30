import React from "react";
import { observer } from "mobx-react";

("use strict");

export class HideWarning extends React.Component {
	constructor(props) {
		super(props);
	}

	render() { return ""; }
}

@observer
export class ShowMeaning extends React.Component {
	constructor(props) {
		super(props);
		this.meanings = [
			htmlDecode(props.no),
			htmlDecode(props.some),
			htmlDecode(props.yes)
		];
		this.drinks = props.user_data.drinks;
		document.querySelector(
			"input[name=" + props.fieldname + "]"
		).oninput = this.onChange.bind(this);
		this.currentMeaning = this.currentMeaning.bind(this);
	}

	onChange(evt) {
		this.drinks[this.props.id] = evt.target.value;
	}

	currentMeaning() {
		return this.meanings[this.drinks[this.props.id] || this.props.initialvalue];
	}

	render() {
		return <span dangerouslySetInnerHTML={{ __html: this.currentMeaning() }} />;
	}
}

function htmlDecode(input) {
	var doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
}
