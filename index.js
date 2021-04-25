const {app, BrowserWindow} = require("electron");
const url = require("url");
const path = require("path");

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
		pathname: path.join(__dirname, "index.html"),
		protocol: "file:",
		slashes: true
	}));
}

app.on("ready", createWindow);
