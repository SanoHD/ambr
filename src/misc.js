exports.getChildIndex = function(child) {
	var i = 0;
	while ((child = child.previousSibling) != null) {
		i++;
	}

	return i;
}

exports.setFooterInfo = function(text) {
	let footer = document.getElementById("footer");

	let idsInFooter = [];
	for (var tn of footer.children) {
		idsInFooter.push(tn.id);
	}

	if (idsInFooter.includes("footer-info")) {
		// If there already is text in the footer, wait until its gone
		// and try again after some time. A delay is given by the second setTimeout function
		setTimeout(function() {
			misc.setFooterInfo(text);
		}, 500);

	} else {
		let infoText = document.createElement("p");
		infoText.id = "footer-info";
		infoText.innerHTML = text;
		footer.appendChild(infoText);

		// Remove the text after 2 seconds (2000 milliseconds, duh!)
		setTimeout(function() {
			footer.removeChild(infoText);
		}, 2000);
	}
}

exports.findStageFromId = function(id) {
	if (id.startsWith("card-")) {
		id = id.slice(5);
	}

	for (var stage of currentProject["stages"]) {
		for (var card of Object.keys(stage["cards"])) {
			if (card == id) {
				return stage["title"];
			}
		}
	}
	return false;
}

exports.getCardsFromStage = function(stageTitle) {
	for (var stage of currentProject["stages"]) {
		if (stage["title"] == stageTitle) {
			return stage["cards"];
		}
	}
}

exports.getStageIndex = function(stageTitle) {
	for (var stageIndex in currentProject["stages"]) {
		if (currentProject["stages"][stageIndex]["title"] == stageTitle) {
			return stageIndex;
		}
	}

	return false;
}

exports.calcCursorDistance = function(element, mx, my) {
	// From https://www.kirupa.com/html5/get_element_position_using_javascript.htm

	var xPos = 0;
	var yPos = 0;

	let _element = element;
	while (element) {
		xPos += (element.offsetLeft - element.scrollLeft + element.clientLeft);
		yPos += (element.offsetTop - element.scrollTop + element.clientTop);
		element = element.offsetParent;
	}

	// Positions of element
	let x1 = xPos;
	let y1 = yPos;

	// Positions of mouse
	let x2 = mx - (_element.clientWidth / 2);
	let y2 = my - (_element.clientHeight / 2);

	// Calculate distance
	let dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

	return dist;
}

exports.insertCardIntoStage = function(stage, cardId, card, index, goingUp=false) {
	// Mostly from https://stackoverflow.com/questions/63030107/insert-property-into-object-at-specific-index-in-vanilla-js

	if (Object.keys(stage).length == 0) {
		return {cardId: card};
	}

	var cardsArray = Object.entries(stage);
	if (index == 0) {
		var newStagesObject = Object.fromEntries([
			...[[cardId, card]],
			...cardsArray
		]);
	} else {
		if (goingUp) {
			index--;
		}

		var newStagesObject = Object.fromEntries([
			...cardsArray.slice(0, index - 1),
			cardsArray[index - 1],
			...[[cardId, card]],
			...cardsArray.slice(index)
		]);
	}

	return newStagesObject;
}
