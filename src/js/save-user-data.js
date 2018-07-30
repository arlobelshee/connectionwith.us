import { observable, computed, action, autorun } from "mobx";

export class UserData {
	constructor() {
		autorun(() => saveToServer(this));
	}
	@observable name = "";
	@observable drinks = {};
	@observable accepted_data_tracking = false;
	@observable network_problem = "";

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
	if (!user_data.key) {
		return;
	}
	console.log("posting!");
	const url =
		"https://script.google.com/macros/s/AKfycbwjZOYoUPYSNuOV3wZ_oqatJgvh2vuH-VB7pqkJ/exec";
	$.post(url, user_data.allDataAsFields)
		.done(data => {
			user_data.network_problem = "";
			console.log("success! " + JSON.stringify(data));
		})
		.fail(e => {
			user_data.network_problem = JSON.stringify(e);
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
