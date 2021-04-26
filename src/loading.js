exports.loadLayout = function(projectIndex) {
	currentProject = projects[projectIndex];

	let content = document.getElementById("content");
	content.innerHTML = "";  // Clear content div

	let projectName = document.createElement("input");  // Project Name
	projectName.onchange = function() {
		contentOps.updateProjectName(projectName.value);
	}
	projectName.id = "content-title";
	projectName.value = currentProject["name"];
	projectName.spellcheck = false;

	let description = document.createElement("input");  // Description
	description.onchange = function() {
		contentOps.updateProjectDescription(description.value);
	}
	description.id = "content-description";
	description.value = currentProject["description"];
	description.spellcheck = false;

	// Add "add stage" button
	let addStageButton = document.createElement("div");
	addStageButton.classList.add("add-button");
	addStageButton.innerHTML = "+ Stage";
	addStageButton.style.float = "right";
	addStageButton.style.marginTop = "100px";
	addStageButton.style.marginRight = "50px";
	addStageButton.onclick = contentOps.addStage;

	let board = document.createElement("div");  // The board itself
	board.id = "board";

	let boardTable = document.createElement("table");  // The board table

	// For the "add stage" button
	boardTable.style.width = "80%";
	boardTable.style.float = "left";

	board.appendChild(addStageButton);
	board.appendChild(boardTable);  // Add board table to table div

	// Combine all
	content.appendChild(projectName);
	content.appendChild(description);
	content.appendChild(board);

	exports.loadSidenav()
	exports.loadContent();
}

exports.loadSidenav = function() {
	// Add all available projects
	let sidenav = document.getElementById("sidenav");
	sidenav.innerHTML = "";
	for (var pi in projects) {
		let snproj = document.createElement("a");
		snproj.innerHTML = projects[pi]["name"];

		snproj.style.borderLeft = "10px solid " + projects[pi]["color"];

		snproj.onmouseover = function() {
			snproj.style.borderLeftWidth = "30px";
			snproj.style.filter = "contrast(0.9)";
		};

		snproj.onclick = function() {
			exports.loadLayout(misc.getChildIndex(this));
		}

		snproj.onmouseleave = function() {
			snproj.style.borderLeftWidth = "10px";
			snproj.style.filter = "contrast(1)";
		};

		snproj.classList.add("sidenav-project");
		sidenav.appendChild(snproj);
	}

	// Add "add project" button
	let addProjectButton = document.createElement("div");
	addProjectButton.classList.add("add-button");
	addProjectButton.innerHTML = "+ Project";
	addProjectButton.onclick = contentOps.addProject;
	sidenav.appendChild(addProjectButton);
}

exports.loadContent = function() {
	let table = document.getElementById("board").getElementsByTagName("table")[0];
	table.innerHTML = "";

	let stageRow = document.createElement("tr");
	for (var stageIndex in currentProject["stages"]) {
		let stageTitle = document.createElement("th");

		let stageTitleInput = document.createElement("input");
		stageTitleInput.onchange = function() {
			contentOps.updateStageTitle(stageIndex, stageTitleInput.value);
		}
		stageTitleInput.classList.add("content-table-title");
		stageTitleInput.value = currentProject["stages"][stageIndex]["title"];
		stageTitleInput.spellcheck = false;

		stageTitle.appendChild(stageTitleInput);
		stageRow.appendChild(stageTitle);
	}

	table.appendChild(stageRow);

	// Add the row for all the "add card" buttons
	let stageButtonsRow = document.createElement("tr");
	stageButtonsRow.id = "buttons-table-row"
	for (var stageIndex in currentProject["stages"]) {
		// Add "add card" button
		let addCardButtonElement = document.createElement("td");

		let addCardButton = document.createElement("div");
		addCardButton.classList.add("add-button");
		addCardButton.style.display = "block";
		addCardButton.style.marginLeft = "auto";
		addCardButton.style.marginRight = "auto";
		addCardButton.style.marginTop = "0px";

		addCardButton.innerHTML = "+ Card";
		addCardButton.onclick = contentOps.addCard;
		addCardButtonElement.appendChild(addCardButton);

		stageButtonsRow.appendChild(addCardButtonElement);

	}

	table.appendChild(stageButtonsRow);


	var dropAreaRow = document.createElement("tr");
	for (var i = 0; i < Object.keys(currentProject["stages"]).length; i++) {
		let dropArea = document.createElement("td");
		dropArea.classList.add("drop-area");

		dropArea.addEventListener("dragenter", dragging.dragEnter);
		dropArea.addEventListener("dragover", dragging.dragOver);
		dropArea.addEventListener("drop", dragging.dragDrop);
		dropArea.addEventListener("dragleave", dragging.dragLeave);
		dropAreaRow.appendChild(dropArea);
	}
	table.appendChild(dropAreaRow);

	let level = 0;
	while (true) {
		let allUndefined = true;
		let elementsList = [];
		let row = document.createElement("tr");
		row.classList.add("content-table-row");

		for (var stage of currentProject["stages"]) {
			let card = document.createElement("td");
			card.classList.add("card");
			card.draggable = true;
			card.ondragstart = dragging.dragStart;
			card.ondragend = dragging.dragEnd;
			card.oncontextmenu = contextMenu.cardContextMenu;

			let textContentKey = Object.keys(stage["cards"])[level];

			let textElement = document.createElement("input");
			textElement.classList.add("card-content")

			if (textContentKey !== undefined) {
				let textContent = stage["cards"][textContentKey]["text"];
				card.id = "card-" + textContentKey;

				textElement.onchange = function() {
					contentOps.updateCard(textContentKey, textElement.value);
				}

				allUndefined = false;
				textElement.value = textContent;
				elementsList.push(textContent);
			} else {
				textElement.value = "";
				card.style.opacity = 0;
				elementsList.push(undefined);
			}

			card.appendChild(textElement);

			row.appendChild(card);
		}

		table.appendChild(row);

		var dropAreaRow = document.createElement("tr");
		for (var i = 0; i < Object.keys(currentProject["stages"]).length; i++) {
			/*
			if (currentProject["stages"][i].length == 0) {
				continue;
			}
			*/

			let dropArea = document.createElement("td");
			dropArea.classList.add("drop-area");

			if (elementsList[i] !== undefined) {
				dropArea.addEventListener("dragenter", dragging.dragEnter);
				dropArea.addEventListener("dragover", dragging.dragOver);
				dropArea.addEventListener("drop", dragging.dragDrop);
				dropArea.addEventListener("dragleave", dragging.dragLeave);
			}
			dropAreaRow.appendChild(dropArea);
		}
		table.appendChild(dropAreaRow);

		level++;
		if (allUndefined) {
			break;
		}
	}

	let dropArea = document.createElement("div");
	dropArea.addEventListener("dragEnter", dragging.dragEnter);
	dropArea.addEventListener("dragOver", dragging.dragOver);
	dropArea.addEventListener("dragDrop", dragging.dragDrop);
	dropArea.addEventListener("dragLeave", dragging.dragLeave);

	if (droppedCard != null) {
		try {
			let tempCard = document.getElementById("card-" + droppedCard);
			let tempCardContent = tempCard.firstElementChild;
			tempCard.classList.add("card-drop-animation");
			tempCardContent.classList.add("card-content-drop-animation");
			setTimeout(function() {
				tempCard.classList.remove("card-drop-animation");
				tempCardContent.classList.remove("card-content-drop-animation");
			}, 1500);
		} catch (e) {

		}
	}
}
