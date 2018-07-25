$(function () {
	Galleria.loadTheme("/vendor/galleria/themes/classic/galleria.classic.min.js");

	Galleria.run("#galleria", {
		flickr: "search:galleria",
		flickrOptions: {
			sort: "interestingness-desc"
		}
	});
});
