const {app, BrowserWindow, Menu, MenuItem} = require("electron");
const url = require("url");
const path = require("path");
const fs = require("fs");

const contentOps = require("./src/contentOps.js");


const menu = new Menu();
menu.append(new MenuItem({
	label: "File",
	submenu: [{
		role: "Open project",
		accelerator: "Ctrl+O",
		click: () => {}
	},
	{
		role: "Save project",
		accelerator: "Ctrl+S",
		click: () => {}
	}]
}))


let win;
function createWindow() {
	win = new BrowserWindow({
		show: false,
		width: 1280,
		height: 720,

		webPreferences: {
			contextIsolation: false,
			enableRemoteModule: true,
			nodeIntegration: true
		}
	});

	win.maximize();

	win.loadURL(url.format({
		pathname: path.join(__dirname, "src/index.html"),
		protocol: "file:",
		slashes: true
	}));
}

Menu.setApplicationMenu(menu);
app.on("ready", createWindow);
