import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";

("use strict");

@observer
export class EventInvitation extends React.Component {
	constructor(props) {
		super(props);
		this.user_data = this.props.user_data;
	}

	@action.bound
	onClick(evt, value) {
		evt.preventDefault();
		this.user_data.invitations.set(this.props.column, value);
	}

	render() {
		if (this.user_data.invitations.get(this.props.column)) {
			return (
				<span>
					You are totally invited to this. Unless you{" "}
					<a href="#" onClick={evt => this.onClick(evt, false)}>
						don't want to come
					</a>.
				</span>
			);
		} else {
			return (
				<button onClick={evt => this.onClick(evt, true)}>
					{this.props.text}
				</button>
			);
		}
	}
}
