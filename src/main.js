const contentOps = require("./contentOps.js");
const contextMenu = require("./contextMenu.js");
const dragging = require("./dragging.js");
const generate = require("./generate.js");
const loading = require("./loading.js");
const misc = require("./misc.js");

const copy = require("copy-to-clipboard");
const fs = require("fs");
const {shell} = require("electron");


let projects = [
	{
		"title": "Creating ambr",
		"color": "#ffaa66",
		"description": "uwu",
		"stages": [
			{
				"title": "To-do",
				"cards": {
					"5cdb8cb0e5e6cc4a78a72d2b47e23fba": {
						"text": "do something"
					},
					"150961aba3e1a4aded166b688eb59649": {
						"text": "do another thing"
					}
				}
			},
			{
				"title": "Finished",
				"cards": {
					"195673556ba1cf8efc507bba480ec046": {
						"text": "nothing lol"
					},
					"cb3ba35f40fa0edbd353f63cc6824fc6": {
						"text": "heeyyy Vsauce, Michael here. This is a pretty long sentence. Or is it?"
					},
					"05b70f0ba3ccb6259ac0cb4bc1c2375a": {
						"text": "(Bottom text)"
					},
					"b05f1451fbed4e7cbf57cfb511077c2d": {
						"text": "PROGRESS!"
					}
				}
			}
		]
	}
];

var currentProject;
var settings = {
	"slide-context-menu-card": true
}

var draggedCard = null;
var droppedCard = null;  // Id

document.body.ondrag = dragging.dragging;
document.body.onclick = contextMenu.cardContextMenuClose;

loading.loadLayout(0);
loading.loadSidenav();
loading.loadContent();
