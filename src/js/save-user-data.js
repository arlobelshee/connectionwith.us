import { observable, computed, action, autorun } from "mobx";

export class UserData {
	constructor() {
		autorun(() => saveToServer(this));
	}
	@observable name = "";
	@observable drinks = {};
	@observable accepted_data_tracking = false;

	@computed
	get key() {
		return slugify(this.name);
	}

	@computed
	get allDataAsFields() {
		const result = { name: this.name, key: this.key };
		Object.keys(this.drinks).forEach(
			drink => (result["drink/" + drink] = this.drinks[drink])
		);
		return result;
	}

	@computed
	get needsName() {
		return Object.keys(this.drinks).length > 0 && !this.name;
	}

	@action
	log_out() {
		this.name = "";
		const drink_names = Object.keys(this.drinks).slice();
		for (var i = 0; i < drink_names.length; ++i) {
			delete this.drinks[drink_names[i]];
		}
	}
}

function saveToServer(user_data) {
	console.log("Trying to save user_data");
	if (!user_data.key) {
		console.log("no key");
		return;
	}
	console.log("posting!");
	const url =
		"https://script.google.com/macros/s/AKfycbwjZOYoUPYSNuOV3wZ_oqatJgvh2vuH-VB7pqkJ/exec";
	$.post(url, user_data.allDataAsFields)
		.done(data => {
			console.log("success! " + data);
		})
		.fail(e => {
			console.log("Total failure! " + e);
		});
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
