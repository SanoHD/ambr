exports.dragStart = function(event) {
	contextMenu.cardContextMenuClose();
	draggedCard = this;
	droppedCard = null;
	setTimeout(() => (this.classList.add("card-content-invisible")), 0);
}

exports.dragEnd = function(event) {
	clearInterval(dragging);
	draggedCard = null;
	this.classList.remove("card-content-invisible");
	loading.loadContent();
}

exports.dragEnter = function(event) {}

exports.dragOver = function(event) {
	/*
	this.style.paddingBottom = "15px";

	this.classList.remove("drop-area-hover-leave");
	this.classList.add("drop-area-hover");
	*/

	event.preventDefault();
}

exports.dragDrop = function(event) {
	if (draggedCard == null) {return}

	let x = event.target.cellIndex;
	let y = misc.getChildIndex(event.target.parentNode) / 2 - 1;
	let cardId = draggedCard.id.slice(5);

	// findStageFromId can return false, add an error for this
	let stage = misc.findStageFromId(draggedCard.id);
	let newStage = currentProject["stages"][x]["title"];
	let stageIndex = misc.getStageIndex(newStage);

	var goingUp;
	if (stage == newStage) {
		if (Object.keys(misc.getCardsFromStage(stage)).indexOf(cardId) > y) {
			goingUp = false;
		} else {
			goingUp = true;
		}

		if (y == Object.keys(misc.getCardsFromStage(stage)).indexOf(cardId) || y == Object.keys(misc.getCardsFromStage(stage)).indexOf(cardId) + 1) {
			return;
		}
	} else {
		inSameStage = false;
	}

	// Temporary save card
	let card = misc.getCardsFromStage(stage)[cardId];

	// Remove card from stage
	delete misc.getCardsFromStage(stage)[cardId];

	// Add card to stage
	let newCards = misc.insertCardIntoStage(currentProject["stages"][stageIndex]["cards"], cardId, card, y, goingUp);

	currentProject["stages"][stageIndex]["cards"] = newCards;

	droppedCard = cardId;
}

exports.dragLeave = function(event) {
	/*
	this.classList.remove("drop-area-hover");
	this.classList.add("drop-area-hover-leave");
	*/
}

exports.dragging = function(event) {
	if (draggedCard == null) {return}

	var closestElement = null;  // The element
	var closestDistance = null;  // The distance of this element
	var dist;

	// Get the closest drop area element relative to mouse
	for (var dropArea of document.getElementsByClassName("drop-area")) {
		dist = misc.calcCursorDistance(dropArea, event.x, event.y);
		if ((closestDistance == null || closestElement == null) || dist < closestDistance) {
			closestDistance = dist;
			closestElement = dropArea;
		}
	}

	if (closestDistance == null || closestElement == null) {
		return;
	}

	if (closestDistance < 150) {  // Doesn't really work yet
		// Remove styles of other classes that are not near the cursor
		for (var el of document.getElementsByClassName("drop-area")) {
			if (el != closestElement) {
				el.classList.remove("drop-area-hover");
				el.classList.add("drop-area-hover-leave");
			}
		}

		closestElement.classList.remove("drop-area-hover-leave");
		closestElement.classList.add("drop-area-hover");
	}
}
