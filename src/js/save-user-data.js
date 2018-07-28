

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
