import React from "react";
import { observer } from "mobx-react";

("use strict");

export class HideWarning extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return "";
	}
}

@observer
export class DrinkOption extends React.Component {
	constructor(props) {
		super(props);
		this.meanings = [
			htmlDecode(props.no),
			htmlDecode(props.some),
			htmlDecode(props.yes)
		];
		this.drinks = props.user_data.drinks;
		this.onChange = this.onChange.bind(this);
	}

	onChange(evt) {
		this.drinks[this.props.id] = evt.target.value;
	}

	currentMeaning() {
		return this.meanings[this.drinks[this.props.id] || this.props.initialvalue];
	}

	render() {
		return (
			<span className="use-children">
				<input
					type="range"
					name={this.props.fieldname}
					min="0"
					max="2"
					value={this.drinks[this.props.id] || this.props.initialvalue}
					onInput={this.onChange}
					onChange={this.onChange}
				/>
				<span
					className="meaning"
					dangerouslySetInnerHTML={{ __html: this.currentMeaning() }}
				/>
			</span>
		);
	}
}

function htmlDecode(input) {
	var doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
}
