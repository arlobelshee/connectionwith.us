"use strict";

class ShowMeaning extends React.Component {
	constructor(props) {
		props.meanings = [props.no, props.some, props.yes];
		super(props);
		this.state = { value: props.initialvalue };
		document.querySelector(
			"input[name=" + props.fieldname + "]"
		).oninput = this.onChange.bind(this);
	}

	onChange(evt) {
		this.setState({ value: evt.target.value });
	}

	render() {
		return <span>{this.props.meanings[this.state.value]}</span>;
	}
}

document
	.querySelectorAll(".meaning")
	.forEach(domContainer =>
		ReactDOM.render(<ShowMeaning {...domContainer.dataset} />, domContainer)
	);
