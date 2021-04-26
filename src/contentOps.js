exports.addProject = function() {
	let newProject = {
		"name": "My Project",
		"color": generate.randomColor(),
		"description": "Add a description here!",
		"stages": []
	}
	projects.push(newProject);

	loading.loadLayout(projects.length - 1);
	loading.loadSidenav();
}

exports.loadProjects = function() {
	let allProjectsFile;  // projects/.allProjects.json

	try {
		allProjectsFile = fs.readFileSync("projects/.allProjects.json", "utf8", function(err){
			if (err) {
				dialog.showMessageBoxSync({
					message: "Could not load 'ambr/projects/.allProjects.json' | " + err,
					type: "error"
				});
				return false;
			}
		});
	} catch (e) {
		dialog.showMessageBoxSync({
			message: "Could not load 'ambr/projects/.allProjects.json' | " + e,
			type: "error"
		});

		return false;
	}

	if (allProjectsFile.trim() == "") {
		allProjectsFile = "[]";
	}

	// Load all projects from ambr/projects/.allProjects.json
	try {
		allProjectsArray = JSON.parse(allProjectsFile);
		for (var file of allProjectsArray) {
			if (!file.endsWith(".ambrpro")) {continue}

			// Make it an absolute path (projects/example.ambrpro -> /home/user/.../projects/example.ambrpro)
			fileAbs = path.resolve(file);

			let proj = JSON.parse(fs.readFileSync(fileAbs, "utf8", function(err) {
				if (err) {
					dialog.showMessageBoxSync({
						message: "Could not load '" + fileAbs + "' | Error: " + e,
						type: "error"
					});
				}
			}));



			projects.push(proj);
		}

	} catch (e) {
		dialog.showMessageBoxSync({
			message: "Could not load projects out of 'ambr/projects/.allProjects.json' | " + e,
			type: "error"
		});
	}
}

exports.saveProject = function() {
	console.log(dialog);

	let filePath = dialog.showOpenDialogSync({
		properties: ["openFile"]
	});

	console.log(filePath);
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
