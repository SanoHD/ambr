exports.cardContextMenu = function(event) {
	let clickedCard;
	// Check if the user clicked on the text. If so, it should
	// work the same as when the user clicked its outer box (its parent)
	if (event.target.tagName != "TD") {
		clickedCard = event.target.parentNode;
	} else {
		clickedCard = event.target
	}

	let cm = document.getElementById("context-menu-card");

	// Reset context menu
	cm.style.display = "none";

	// Open context menu
	if (settings["slide-context-menu-card"]) {
		cm.style.display = "block";
		cm.style.left = event.clientX + "px";
		cm.style.top = event.clientY + "px";
	} else {
		setTimeout(function() {
			cm.style.display = "block";
			cm.style.left = event.clientX + "px";
			cm.style.top = event.clientY + "px";
		}, 0);
	}

	/*
	<p style="background-color: #ffeeee">Delete Card</p>
	*/

	let optionCopyText = document.createElement("p");
	optionCopyText.innerHTML = "Copy Text";
	optionCopyText.onclick = function() {
		copy(clickedCard.firstElementChild.value);
		misc.setFooterInfo("Copied Text to Clipboard");
	}

	let optionCopyCardId = document.createElement("p");
	optionCopyCardId.innerHTML = "Copy Card ID";
	optionCopyCardId.onclick = function() {
		copy(clickedCard.id.slice(5));
		misc.setFooterInfo("Copied Card ID to Clipboard");
	}

	let optionDeleteCard = document.createElement("p");
	optionDeleteCard.innerHTML = "Delete Card";
	optionDeleteCard.style.backgroundColor = "#ffeeee";
	optionDeleteCard.onclick = function() {
		contentOps.cardRemove(clickedCard.id.slice(5));
	}

	cm.innerHTML = ""; // Clear context menu first
	cm.appendChild(optionCopyText);
	cm.appendChild(optionCopyCardId);
	cm.appendChild(optionDeleteCard);
}

exports.cardContextMenuClose = function() {
	document.getElementById("context-menu-card").style.display = "none";
}
