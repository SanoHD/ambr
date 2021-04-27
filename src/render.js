const contentOps = require("./contentOps.js");
const contextMenu = require("./contextMenu.js");
const dragging = require("./dragging.js");
const generate = require("./generate.js");
const loading = require("./loading.js");
const misc = require("./misc.js");

const dialog = require("electron").remote.dialog;

const copy = require("copy-to-clipboard");
const {shell} = require("electron");
const fs = require("fs");
const mt = require("mousetrap");
const path = require("path");

var projects = [];
var allProjectsArray;

contentOps.loadProjects();

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

mt.bind("ctrl+s", function() {
	let result = contentOps.saveProject();
	if (result === true) {
		misc.setFooterInfo("Saved Project");
	}
});

mt.bind("ctrl+o", function() {
	let result = contentOps.openProject();
	if (result === true) {
		misc.setFooterInfo("Opened Project(s)");
	}
});

mt.bind("ctrl+i", function() {
	misc.setFooterInfo("Footer Info!");
})
