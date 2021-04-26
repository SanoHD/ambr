exports.genId = function() {
	/*
	This function generates a 32-character long hex id used
	for cards. Their HTML-Ids will look like this: "card-ba8732..."
	*/

	let id = "";
	let hex = "0123456789abcdef".split("");
	for (var i = 0; i < 32; i++) {
		id += hex[Math.floor(Math.random() * hex.length)];
	}
	return id;
}


exports.randomColor = function() {
	let hue = Math.floor(Math.random() * 361);
	let sat = 100;
	let light = 60;

	return "hsl("+hue+", "+sat+"%, "+light+"%)";
}
