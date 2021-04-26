const contentOps = require("./contentOps.js");
const contextMenu = require("./contextMenu.js");
const dragging = require("./dragging.js");
const generate = require("./generate.js");
const loading = require("./loading.js");
const misc = require("./misc.js");

const copy = require("copy-to-clipboard");
const dialog = require("electron").remote.dialog;
const fs = require("fs");
const path = require("path");
const {shell} = require("electron");

var projects = [];

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
