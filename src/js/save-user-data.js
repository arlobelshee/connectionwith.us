import { observable, computed, action, autorun } from "mobx";

export class UserData {
	constructor() {
		tryToLoadFromLocalStorage(this);
		autorun(() => saveToServer(this));
		autorun(() => saveToLocalStorage(this));
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

	setFromDataFields(data) {
		this.name = data.name;
		Object.keys(data)
			.filter(k => k.startsWith("drink/"))
			.forEach(drink_field => {
				const drink = drink_field.split("/", 2);
				this.drinks[drink[1]] = data[drink_field];
			});
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

function tryToLoadFromLocalStorage(user_data) {
	console.log("Trying to laod from local storage");
	const key = localStorage.getItem("most-recent-key");
	if (!key) {
		console.log("No recent key");
		return;
	}
	let data = null;
	try {
		data = JSON.parse(localStorage.getItem("user/" + key));
	} catch (e) {
		console.log(JSON.stringify(e));
	}
	if (!data) {
		console.log("No valid data matching key " + key);
		return;
	}
	console.log("Loading from data " + JSON.stringify(data));
	user_data.setFromDataFields(data);
}

function saveToLocalStorage(user_data) {
	console.log("Trying to save to local storage");
	const key = user_data.key || "(anonymous)";
	localStorage.setItem("most-recent-key", key);
	const data = JSON.stringify(user_data.allDataAsFields);
	localStorage.setItem("user/" + key, data);
	console.log("stored " + data);
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
