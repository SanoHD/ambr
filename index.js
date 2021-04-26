const {app, BrowserWindow, Menu, MenuItem} = require("electron");
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
		width: 1920,
		height: 1080,

		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	win.loadURL(url.format({
		pathname: path.join(__dirname, "src/index.html"),
		protocol: "file:",
		slashes: true
	}));
}

app.on("ready", createWindow);
//Menu.setApplicationMenu(menu);
