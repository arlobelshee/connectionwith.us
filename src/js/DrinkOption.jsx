import React from "react";
import { action } from "mobx";
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
		this.drinker = props.user_data;
	}

	@action.bound
	onChange(evt) {
		this.drinker.drinks.set(this.props.id, evt.target.value);
	}

	currentMeaning() {
		return this.meanings[
			this.drinker.drinks.get(this.props.id) || this.props.initialvalue
		];
	}

	render() {
		return (
			<span className="use-children">
				<input
					type="range"
					name={this.props.fieldname}
					min="0"
					max="2"
					value={
						this.drinker.drinks.get(this.props.id) || this.props.initialvalue
					}
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
