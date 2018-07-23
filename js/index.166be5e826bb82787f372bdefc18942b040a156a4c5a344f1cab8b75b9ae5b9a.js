"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShowMeaning = function (_React$Component) {
	_inherits(ShowMeaning, _React$Component);

	function ShowMeaning(props) {
		_classCallCheck(this, ShowMeaning);

		props.meanings = [props.no, props.some, props.yes];

		var _this = _possibleConstructorReturn(this, (ShowMeaning.__proto__ || Object.getPrototypeOf(ShowMeaning)).call(this, props));

		_this.state = { value: props.initialvalue };
		document.querySelector("input[name=" + props.fieldname + "]").oninput = _this.onChange.bind(_this);
		return _this;
	}

	_createClass(ShowMeaning, [{
		key: "onChange",
		value: function onChange(evt) {
			this.setState({ value: evt.target.value });
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"span",
				null,
				this.props.meanings[this.state.value]
			);
		}
	}]);

	return ShowMeaning;
}(React.Component);

document.querySelectorAll(".meaning").forEach(function (domContainer) {
	return ReactDOM.render(React.createElement(ShowMeaning, domContainer.dataset), domContainer);
});