import { configure, observable, computed, action, reaction } from "mobx";

configure({ enforceActions: "strict" });

export class UserData {
	constructor() {
		this.persistance_friend = new Persister(this);
		this.persistance_friend.initializeEmptyDataToLastKnownUser();
	}
	@observable name = "";
	@observable drinks = new Map();
	@observable invitations = new Map();
	@observable accepted_data_tracking = false;
	@observable network_problem = "";

	@computed
	get key() {
		return slugify(this.name);
	}

	@computed
	get serialize() {
		const result = {
			name: this.name,
			key: this.key,
			accepted_data_tracking: this.accepted_data_tracking
		};
		this.serializeOneMap(this.drinks, "drink/", result);
		this.serializeOneMap(this.invitations, "event/", result);
		return result;
	}

	serializeOneMap(src_map, serialized_prefix, result) {
		src_map.forEach(
			(value, name) => (result[serialized_prefix + name] = value)
		);
	}

	@action
	deserializeUnderAnyLocalEdits(data) {
		this.name = data.name;
		this.accepted_data_tracking =
			data.accepted_data_tracking || this.accepted_data_tracking;
		this.updateOneMap(data, "drink/", this.drinks);
		this.updateOneMap(data, "event/", this.invitations);
	}

	updateOneMap(data, serialized_prefix, destination_map) {
		Object.keys(data)
			.filter(k => k.startsWith(serialized_prefix))
			.forEach(matching_field => {
				const name = matching_field.split("/", 2)[1];
				if (!destination_map.has(name)) {
					destination_map.set(name, data[matching_field]);
				}
			});
	}

	@computed
	get needsName() {
		return (this.drinks.size > 0 || this.invitations.size > 0) && !this.name;
	}

	@action
	log_out() {
		this.name = "";
		this.accepted_data_tracking = false;
		this.drinks.clear();
		this.invitations.clear();
	}
}

const STORAGE = 1;
const APPLICATION = 2;

class Persister {
	constructor(user_data) {
		this.user_data = user_data;
		this.monitorLoginAndLogout = this.monitorLoginAndLogout.bind(this);
		this.source_of_truth = STORAGE;
	}

	initializeEmptyDataToLastKnownUser() {
		const key = tryToLoadMostRecentUserKeyFromLocalStorage(this.user_data);
		this.monitorLoginAndLogout(key);
		reaction(() => this.user_data.key, this.monitorLoginAndLogout);
	}

	monitorLoginAndLogout(key, obs) {
		if (key && this.source_of_truth === STORAGE) {
			if (tryToLoadSpecificUserFromLocalStorage(key, this.user_data)) {
				this.source_of_truth = APPLICATION;
				this.startSavingChanges();
			} else {
				loadFromServer(key, this);
			}
		}
	}

	@action
	onServerData(data) {
		if (!data.key && this.source_of_truth === STORAGE) {
			this.source_of_truth = APPLICATION;
			this.startSavingChanges();
		} else if (
			data.key === this.user_data.key &&
			this.source_of_truth === STORAGE
		) {
			this.user_data.deserializeUnderAnyLocalEdits(data);
			this.source_of_truth = APPLICATION;
			this.startSavingChanges();
		}
	}

	startSavingChanges() {
		const original_key = this.user_data.key;
		reaction(
			() => this.user_data.serialize,
			(data, obs) => {
				if (data.key && data.key === original_key) {
					saveToServer(data, this.user_data);
				} else {
					console.log("Stopping server posting until next login");
					obs.dispose();
				}
			},
			{
				delay: 7000,
				fireImmediately: this.user_data.key
			}
		);
		reaction(
			() => this.user_data.serialize,
			(data, obs) => {
				if (data.key) {
					saveToLocalStorage(data);
				} else {
					becomeAnonymousInLocalStorage();
					console.log("Stopping local saves until next login");
					obs.dispose();
					this.source_of_truth = STORAGE;
				}
			},
			{
				fireImmediately: this.user_data.key
			}
		);
	}
}

function tryToLoadMostRecentUserKeyFromLocalStorage(user_data) {
	const key = localStorage.getItem("most-recent-key");
	if (!key) {
		console.log("No recent key");
	}
	return key;
}

function tryToLoadSpecificUserFromLocalStorage(key, user_data) {
	let data = null;
	try {
		data = JSON.parse(localStorage.getItem("user/" + key));
	} catch (e) {
		console.log(JSON.stringify(e));
	}
	if (!data) {
		console.log("No valid data matching key " + key);
		return false;
	}
	console.log("Loading from data " + JSON.stringify(data));
	user_data.deserializeUnderAnyLocalEdits(data);
	return true;
}

function becomeAnonymousInLocalStorage() {
	localStorage.removeItem("most-recent-key");
}

function saveToLocalStorage(data) {
	localStorage.setItem("most-recent-key", data.key);
	const json_data = JSON.stringify(data);
	localStorage.setItem("user/" + data.key, json_data);
	console.log("locally stored " + json_data);
}

const SERVER_API_URL =
	"https://script.google.com/macros/s/AKfycbwjZOYoUPYSNuOV3wZ_oqatJgvh2vuH-VB7pqkJ/exec";

function saveToServer(data, user_data) {
	if (!data.accepted_data_tracking) {
		return; // Whole site will work, we just won't save anything to our servers.
	}
	$.post(SERVER_API_URL, data)
		.done(
			action(data => {
				user_data.network_problem = "";
				console.log("Posted! " + JSON.stringify(data));
			})
		)
		.fail(
			action(e => {
				const result = JSON.stringify(e);
				user_data.network_problem = result;
				console.log("error writing to server! " + result);
			})
		);
}

function loadFromServer(key, persister) {
	console.log("Asking the server...");
	$.get(SERVER_API_URL, { key: key })
		.done(
			action(data => {
				if (data.result === "success") {
					persister.onServerData(data.data);
				} else {
					console.log("error loading from server! " + JSON.stringify(data));
				}
			})
		)
		.fail(
			action(e => {
				console.log("error loading from server! " + JSON.stringify(e));
			})
		);
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
