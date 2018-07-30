import { observable, computed, action } from "mobx";

export class UserData {
	@observable name = "";

	@computed
	get key() {
		return slugify(this.name);
	}

	@action
	log_out() {
		this.name = "";
	}
}

export function loaded() {
	console.log("Contact form submission handler loaded successfully.");
	var form = document.getElementById("testForm");
	form.addEventListener("submit", handleFormSubmit, false);
}

function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.normalize("NFD") // separate accent from letter
		.replace(/[\u0300-\u036f]/g, "") // remove all separated accents
		.replace(/\s+/g, "-") // replace spaces with -
		.replace(/[^\w\-]+/g, "") // remove all non-word chars
		.replace(/\-\-+/g, "-") // replace multiple '-' with single '-'
		.replace(/^\-/g, "") // remove dash at start
		.replace(/\-$/g, ""); // remove dash at end
}

function isHuman(honeypot) {
	return !honeypot; // Human if they didn't fill up the field.
}

function getFormData(form) {
	var elements = form.elements;

	var fields = Object.keys(elements)
		.map(function(k) {
			if (elements[k].name !== undefined) {
				return elements[k].name;
				// special case for Edge's html collection
			} else if (elements[k].length > 0) {
				return elements[k].item(0).name;
			}
		})
		.filter(function(item, pos, self) {
			return self.indexOf(item) == pos && item;
		});

	var formData = {};
	fields.forEach(function(name) {
		var element = elements[name];

		formData[name] = element.value;

		// when our element has multiple items, get their values
		if (element.length) {
			var data = [];
			for (var i = 0; i < element.length; i++) {
				var item = element.item(i);
				if (item.checked || item.selected) {
					data.push(item.value);
				}
			}
			formData[name] = data.join(", ");
		}
	});

	return formData;
}

function handleFormSubmit(event) {
	event.preventDefault();
	var data = getFormData(event.target);

	if (!isHuman(data.robbiecheck)) {
		return false;
	}

	disableAllButtons(event.target);
	var url = event.target.action;
	$.post(url, data).done(() => {
		document.getElementById("testForm").style.display = "none";
		var thankYouMessage = document.getElementById("thankyou_message");
		if (thankYouMessage) {
			thankYouMessage.style.display = "block";
		}
	});
}

function disableAllButtons(form) {
	var buttons = form.querySelectorAll("button");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].disabled = true;
	}
}
