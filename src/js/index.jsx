"use strict";

class LikeButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = { liked: false };
	}

	render() {
		if (this.state.liked) {
			return "You liked this.";
		}

		return <button onClick={() => this.setState({ liked: true })}>Like</button>;
	}
}

class ShowMeaning extends React.Component {
	constructor(props) {
		props.meanings = [props.no, props.some, props.yes];
		super(props);
		this.state = { value: this.props.initialvalue };
	}

	render() {
		return (
			<div>
				<input
					type="range"
					name={this.props.fieldname}
					min="0"
					max="2"
					value={this.state.value}
					onChange={evt => this.setState({ value: evt.target.value })}
				/>
				<span class="meaning">{this.props.meanings[this.state.value]}</span>
			</div>
		);
	}
}

let domContainer = document.querySelectorAll(".meanings");
for (let i = 0; i < domContainer.length; i++) {
	ReactDOM.render(
		<ShowMeaning {...domContainer[i].dataset} />,
		domContainer[i]
	);
}
