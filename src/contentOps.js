exports.addProject = function() {
	let newProject = {
		"title": "My Project",
		"color": generate.randomColor(),
		"description": "Add a description here!",
		"stages": []
	}
	projects.push(newProject);

	loading.loadLayout(projects.length - 1);
	loading.loadSidenav();
}

exports.addStage = function() {
	let newStage = {
		"title": "New stage",
		"cards": {}
	}

	currentProject["stages"].push(newStage);

	loading.loadContent();
}

exports.addCard = function() {
	let card = {
		"text": "Hello, World!"
	}

	let stageIndex = this.parentNode.cellIndex;
	let cardId;

	while (true) {
		cardId = generate.genId();


		/*
		Checking if the generated Id already exists; I feel weird
		not checking this, sorry. But what if all 340282366920938463463374607431768211456
		possible solutions are used? FUCK
		*/

		let allCardIds = [];
		for (var project of projects) {
			for (var stage of project["stages"]) {
				for (var _cardId of Object.keys(stage["cards"])) {
					allCardIds.push(_cardId);
				}
			}
		}

		if (!allCardIds.includes(cardId)) {
			break;
		}
	}


	currentProject["stages"][stageIndex]["cards"][cardId] = card;
	loading.loadContent();
}

exports.cardRemove = function(id) {
	let removed = false;
	for (var stageIndex in currentProject["stages"]) {
		for (var cardId of Object.keys(currentProject["stages"][stageIndex]["cards"])) {
			if (cardId == id) {
				delete currentProject["stages"][stageIndex]["cards"][cardId];
				removed = true;
				break
			}
		}

		if (removed) {break}
	}

	loading.loadContent();
}

exports.updateCard = function(id, text) {
	console.log(id);
	let stageIndex = misc.getStageIndex(misc.findStageFromId(id));

	console.log(stageIndex);

	currentProject["stages"][stageIndex]["cards"][id] = {
		text: text
	};
	loading.loadContent();
}

exports.updateStageTitle = function(stageIndex, title) {
	currentProject["stages"][stageIndex]["title"] = title;
}

exports.updateProjectName = function(name) {
	currentProject["name"] = name;
}

exports.updateProjectDescription = function(description) {
	currentProject["description"] = description;
}
