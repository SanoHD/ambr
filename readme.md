![Ambr](https://raw.githubusercontent.com/SanoHD/ambr/master/src/res/ambrLogo.png)
# ambr

Ambr is a kanban-board styled project planner, similar to tools like Trello. The main difference
is, that it's open source.

### Getting started
- Open your terminal and use `cd` to navigate to a folder of your choice, for example `programs/`.
- Install [git](https://git-scm.com/)

- Use
```sh
$ git clone https://github.com/SanoHD/ambr.git
```
To download ambr from GitHub. It will automatically create a folder for ambr, for example `programs/ambr`.

- Navigate into that folder by typing `cd ambr`

- Install [npm](https://www.npmjs.com/) and type the following things in your terminal:
```sh
$ npm install
```
This will install all the important modules ambr will use, for example **Electron**.

- Type in the following every time you want to start (make sure you are in `programs/ambr` or whatever path you chose)
```sh
$ npm start
```


### Customizing
ambr can be customized quite easily by modifying the `.css` files in `ambr/src/css/`.

**Some examples:**
In `fonts.css`, change the paths in `url()` to modify the font families in ambr. Make
sure these fonts are in `ambr/src/fonts/`

In `main.css`, you can change all the values between `:root {` and `}` to change the main colors.
