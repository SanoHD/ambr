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
	//
	//   SAVE
	//

	if ("projsrc" in currentProject) {
		let srcFilePath = currentProject["projsrc"];

		try {
			fs.writeFileSync(srcFilePath, JSON.stringify(currentProject, null, 4), function(err) {
				if (err) {
					dialog.showMessageBoxSync({
						message: "Could not write '" + srcFilePath + "' | " + e,
						type: "error"
					});
					// Don't return, instead do 'save as'

				} else {
					return true;  // Saved
				}
			});

			return true;  // Saved

		} catch (e) {
			dialog.showMessageBoxSync({
				message: "Could not parse '" + srcFilePath + "' | " + e,
				type: "error"
			});

			  // Don't return, instead do 'save as'
		}
	}



	//
	//   SAVE AS
	//

	let filePath = dialog.showSaveDialogSync({
		title: "Save an ambr project file",
		filters: [
			{
				name: "Ambr Project file",
				extensions: ["ambrpro"]
			}
		]
	});

	if (filePath === undefined) {
		// User canceled
		return;
	}

	filePath = filePath.replaceAll("\\", "/");

	currentProject["projsrc"] = filePath;

	try {
		fs.writeFileSync(filePath, JSON.stringify(currentProject, null, 4), function(err) {
			if (err) {
				dialog.showMessageBoxSync({
					message: "Could not write '" + filePath + "' | " + e,
					type: "error"
				});
				return;
			}
		});
	} catch (e) {
		dialog.showMessageBoxSync({
			message: "Could not parse '" + filePath + "' | " + e,
			type: "error"
		});
		return;
	}

	if (filePath === undefined) {
		return;

	} else {
		try {
			let allProjectsFile = fs.readFileSync("projects/.allProjects.json", "utf8", function(err) {
				if (err) {
					dialog.showMessageBoxSync({
						message: "Could not load 'ambr/projects/.allProjects.json' | " + e,
						type: "error"
					});
					return;
				}
			});

			allProjectsArray = JSON.parse(allProjectsFile);

		} catch (e) {
			dialog.showMessageBoxSync({
				message: "Could not parse 'ambr/projects/.allProjects.json' | " + e,
				type: "error"
			});
			return;
		}

		if (!allProjectsArray.includes(filePath)) {
			allProjectsArray.push(filePath);
		}

		let fileString = JSON.stringify(allProjectsArray, null, 4);
		fs.writeFileSync("projects/.allProjects.json", fileString, function(err) {
			if (err) {
				dialog.showMessageBoxSync({
					message: "Could not save 'ambr/projects/.allProjects.json' | " + e,
					type: "error"
				});
				return;
			}
		})
	}

	return true;
}

exports.openProject = function() {
	let filePaths = dialog.showOpenDialogSync({
		title: "Open an ambr project file",
		filters: [
			{
				name: "Ambr Project file",
				extensions: ["ambrpro"]
			}
		],
		properties: ["multiSelections"]
	});

	for (var filePath of filePaths) {
		if (filePath === undefined) {
			// User canceled
			return;
		}

		filePath = filePath.replaceAll("\\", "/");

		try {
			let allProjectsFile = fs.readFileSync("projects/.allProjects.json", "utf8", function(err) {
				if (err) {
					dialog.showMessageBoxSync({
						message: "Could not load 'ambr/projects/.allProjects.json' | " + e,
						type: "error"
					});
					return;
				}
			});

			allProjectsArray = JSON.parse(allProjectsFile);

		} catch (e) {
			dialog.showMessageBoxSync({
				message: "Could not parse 'ambr/projects/.allProjects.json' | " + e,
				type: "error"
			});
			return;
		}

		if (allProjectsArray.includes(filePath)) {
			dialog.showMessageBoxSync({
				message: "This project is already loaded",
				type: "error"
			});

			return;
		} else {
			allProjectsArray.push(filePath);
		}

		let apFileString = JSON.stringify(allProjectsArray, null, 4);
		fs.writeFileSync("projects/.allProjects.json", apFileString, function(err) {
			if (err) {
				dialog.showMessageBoxSync({
					message: "Could not save 'ambr/projects/.allProjects.json' | " + e,
					type: "error"
				});
				return;
			}
		})

		let fileString = fs.readFileSync(filePath, "utf8", function(err) {
			if (err) {
				dialog.showMessageBoxSync({
					message: "Could not load '" + filePath + "' | " + e,
					type: "error"
				});
				return;
			}
		})

		let projectObject;
		try {
			projectObject = JSON.parse(fileString);
		} catch (e) {
			dialog.showMessageBoxSync({
				message: "Could not parse '" + filePath + "' | " + e,
				type: "error"
			});
			return;
		}

		projectObject["projsrc"] = filePath;
		projects.push(projectObject);
	}

	console.log(projects);

	loading.loadLayout(projects.length - 1);
	return true;
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
	loading.loadSidenav();
}

exports.updateProjectDescription = function(description) {
	currentProject["description"] = description;
}
