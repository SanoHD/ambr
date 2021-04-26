const {app, BrowserWindow, Menu, MenuItem, dialog} = require("electron");
const url = require("url");
const path = require("path");

const menu = new Menu();
menu.append(new MenuItem({
	label: "File",
	submenu: [{
		role: "Open project",
		accelerator: "Ctrl+O",
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
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	win.maximize();

	win.loadURL(url.format({
		pathname: path.join(__dirname, "src/index.html"),
		protocol: "file:",
		slashes: true
	}));
}

app.on("ready", createWindow);
//Menu.setApplicationMenu(menu);
