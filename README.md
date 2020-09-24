# README: ShopStop, group 1
![logo](public/media/logo.png)
[![coverage report](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/01/badges/master/pipeline.svg)](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/01/-/commits/master)
[![coverage report](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/01/badges/master/coverage.svg)](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/01/-/commits/master)

[shopstop.digitalazzi.no](http://shopstop.digitalazzi.no)

The READMEs and CONTRIBUTION files are written in English for the sake of potential contributors from different nationalities. 
The wiki pages of the project is written in Norwegian, as it is not crucial to the contribution/development process in the same way.

## Product description
The product is a web application which will help smaller groups of people to
have their collective shopping lists in one place. As a user you will be able to
register an account, create, share and administer multiple groups which may contain
multiple shoppinglists each. This will make it possible for all the members of a group
to get a real time view over which products the group needs.

## To contribute

To contribute to this project, [be sure to read this](CONTRIBUTING.md)

## Connecting to an API

You will have to set up a RESTful API for this application to work as it should. We have made this an easy task for you. The API code is already written, and there are multiple ways you can connect to a database. 
To do this, [you can use this guide](backend/README.md) located in the <i><b>/backend</i></b> directory.

You may also use the already existing API at [http://api.digitalazzi.no](http://api.digitalazzi.no) if you do not want to set up your own.

## Before you start

Before you start the application in development mode, you may need to run: <br>

```
npm install
```

This will install all the npm packages you need to run the application<br>

If this for some reason did not work for you  <br>
Here is a list of the npm packages you have to install:

Needed dependencies:
```
- npm install react
- npm install react-dom
- npm install react-router-dom
- npm install react-scripts
- npm install axios
- npm install random-key
- npm install babel
``` 
<br>

### Connecting frontend to an API

You will have to connect to the the API you want to use. This is quite simple. Navigate to the <i>Constants.js</i> file inside the <i><b>/src</i></b> directory and edit the `BASEURL` and `PORT` constants to corresponds to your API. 

Example:
```javascript
export const BASEURL = 'localhost';
export const PORT = '8000';
```

Using the already existing api:
```javascript
export const BASEURL = 'api.digitalazzi.no';
export const PORT = '80';
```

## Commands

In the project directory, you can run different commands:

### Running the application

 ```
 npm start
 ```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload when you edit the code.<br />
If the compilation failed, the error can be seen on the page

### Running test suites

```
npm test
```

Launches the test runner in the interactive watch mode. It will run any file with the .`test.js` extention in the project directory. The tests suites themselves are located inside the <i><b>/src/tests</b></i> directory.<br />

### Creating the test coverage report

```
npm run coverage
```

Runs all the test suites and creates a coverage report based on how much of the code was tested. It will still create a report even if one or more of the tests fail, but will tell which test failed and why just as a normal testrun.

The report can be found directly in the command line where the command was written, and in the <i><b>/coverage</b></i> directory as a HTML page. The <i>index.html</i> file must be opened manually to view the report.

### Building the project

```
npm run-script build
```

Builds the app for production to the <i><b>/build</b></i> directory.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

## Filestructure and desctiption

This section will cover the file structure of the project. It will describe the folders and directories and what is contained within them.

### Root project folder

This is the root project folder, and therefore houses the configuration and main directories for the project:

- <b>[.eslintrc.json](./.eslintrc.json)</b>: Houses the linter rules, we are using the babel parser for ESLint for both consistency and simpicity.<br>

- <b>[.gitlab-ci.yml](./.gitlab-ci.yml)</b>: The CI build file for the gitlab repository

- <b>[package.json](./package.json)</b>, <b>[package-lock.json](./package-lock.json)</b> and <b>[yarn.lock](./yarn.lock)</b> houses the dependencies and script rules that are used. We support both <i>npm</i> and <i>yarn</i> as package managers in this project, though <i>npm</i> is recommended.

- <b>[Contributing.md](./CONTRIBUTING.md)</b>

- <b>[SQL.sql](./SQL.sql)</b>: SQL for the structure of the database

### <b>/src</b>

This is the sourcecode folder for the project. Inside this directory all of the code for the project is written.<br>
The code includes all `.js`, `.css` and `.test.js` files included in the project.<br>

See the [readme for the src directory](src/README.md) for a more in depth description about the source code, and a roadmap of the directory.

### <b>/backend </b>

This is the directory which houses the API source code. This should of course be in its own repository, but we only have one at our disposal. Thats why it might look a little makeshift. [Click here for a deeper explanation on this directory](backend/README.md) 

### <b>/public</b>

This directory houses the files that are static and common for the whole codebase. Examples are the `index.html` and images.

### <b>/out</b>

This directory holds the HTML for the JS documentation. It is automatically generated when the <b>`jsdoc`</b> command is run. Open the `index.html` file in a browser to view.

### <b>/coverage</b>
This directory holds the HTML for the 
last test coverage report. It is automatically generated when the coverage command is run. Open the index.html file in a browser to view.

### <b>/misc</b>

This directory houses other documents and files that are not related to the code e.g. the group contract.
