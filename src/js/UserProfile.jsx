import React from "react";
import { observer } from "mobx-react";

("use strict");

@observer
export class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		const name_control = document.querySelector("input[name=name]");
		name_control.onchange = this.onChange;
	}

	onChange(evt) {
		this.props.user_data.name = evt.target.value;
	}

	render() {
		if (this.props.user_data.name) {
			return (
				<span>
					<i class="fas fa-user-astronaut">&nbsp;</i> hi,{" "}
					{this.props.user_data.name}
				</span>
			);
		} else {
			return "lollygagging";
		}
	}
}
