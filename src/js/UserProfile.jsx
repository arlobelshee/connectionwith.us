import React from "react";
import ReactModal from "react-modal";
import { action } from "mobx";
import { observer } from "mobx-react";

("use strict");

@observer
export class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.user_data = this.props.user_data;
		this.logOut = this.logOut.bind(this);
	}

	@action.bound
	onChange(evt) {
		this.user_data.name = evt.target.value;
	}

	logOut(evt) {
		evt.preventDefault();
		this.user_data.log_out();
	}

	@action.bound
	closeDialog(evt) {
		evt.preventDefault();
		this.user_data.name = evt.target.querySelector("input[name=name]").value;
		this.user_data.accepted_data_tracking = evt.target.querySelector(
			"input[name=consent]"
		).checked;
	}

	render() {
		if (this.user_data.needsName) {
			return (
				<ReactModal
					isOpen={this.user_data.needsName}
					appElement={document.body}
					className="open-modal"
					overlayClassName="open-modal-overlay"
				>
					<h2>So, I forgot to ask...</h2>
					<p>Who is this?</p>
					<p>
						If this is multiple people, then come back multiple times! We need
						personal info from each of you!
					</p>
					<p>
						If you need to log out later, just click on your name in the nav
						(it'll appear as soon as you are done here).
					</p>
					<form onSubmit={this.closeDialog}>
						<p>
							<input name="name" type="text" placeholder="Your name" />
						</p>
						<p>
							<input name="consent" type="checkbox" id="consent" />
							<label htmlFor="consent">
								As per GDPR, I consent to let you gather info about me in order
								to organize this event, especially to ensure we have the right
								drinks and to make gratuitous analyses of how you use the site.
								We will totally track you on this site &mdash; both directly,
								and via third-party cookies!
							</label>
						</p>
						<p>
							You don't have to accept the tracking. But if you don't, then I
							can't save any of your data, so we'll never know what to invite
							you to. So please say yes!
						</p>
						<button type="submit">OK, let's go!</button>
					</form>
				</ReactModal>
			);
		}
		if (this.user_data.name) {
			return (
				<a onClick={this.logOut} title="log out and become someone else">
					<i className="fas fa-user-astronaut">&nbsp;</i> Hi,{" "}
					{this.user_data.name}
				</a>
			);
		} else {
			return "";
		}
	}
}
