# README: /src

This readme will be a short explanation on what each of the directories in the <i><b>/src</b></i> directory. 

## <b>/components</b>

Inside this folder you will find all the components written in JavaScript which are displayed and rendered on the web  application. These files are sorted into multiple directories with a name that describes where in the application that component is rendered. 

<i>Example:</i> <br>
The `GroupPage.js` file is located inside the `/grouppage` folder.

## <b>/media</b>

This directory hold media (pictures) which are used non-dynamically on the page. This is the ShopStop logo, and the Django Rest Framework image used in [the readme for /backend](../backend/README.md)

## <b>/tests</b>

This directory houses the test files for the project. All files inside this directory has the `.test.js` extension.
When one of these commands
``` 
npm test
npm run coverage
```
are called, it is the test suites inside this directory that will execute.
All the test suites are sorted into the same structure as in <b>/src</b>, with `App.test.js` not being in a sub-directory.

## <b>Other files</b>

- <b>[App.js](./App.js)</b>: Is the main component of the application. It holds all the routes, and much of the functionality of the application.

- <b>[Constants.js](./Constants.js)</b>: Is a important file which holds some of the constants used by a lot of the files. When you want to connect to an API, you change `BASEURL` and `PORT` to reflect your API's URL.

- <b>[index.js](./index.js)</b> and <b>[setupTests.js](./setupTests.js)</b>: These files are automatically generated when setting up the React environment.

- <b>[shopstop_main.css](./shopstop_main.css)</b>: This is the main CSS file in this project. It contains the CSS rules used.