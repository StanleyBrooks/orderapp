## Supply Order App - Code Louisville FSJS Project
Stanley Brooks

***

## 1. Project Purpose

This project is a supply ordering application for a small business with multiple locations that order supplies from a centralized location.  In this specific example the company has 3 locations and one kitchen.  Each day the stores put in a order to the kitchen that then brings the daily supplies that they require.

In this app it is not possible to create more than one entry in the database with the same store location, this is a feature and not an error.  I built the app this way to make sure that each location can only put in one order per day.  As this application evolves that part will be expanded upon.

Orders can be placed, viewed, edited and deleted and listed.  For example data goto localhost:3030/orders/seed or click on the "Seed DB" button located at localhost:3030/orders.  Remember that orders should not share a "Store Location" as any other entries, instead edit the correct one that already exist. alternatively you can add any other store name that is not currently in the database.


## 2. Install / Run instructions

1. Go to root directory of project

2. Run ‘npm install’ to install necessary packages (sudo npm install on linux based)

3. Run ‘npm start’ to begin the app server

4. Open a localhost windows to the port it’s running on (localhost:3030)


***

#### Project dependencies that are installed with 'npm install' command:

+ express
+ express-ejs-layouts
+ mongoose
+ body-parser
+ express-session
+ cookie-parser
+ connect-flash
+ express-validator
+ dotenv


***

# Project Requirements:

1. **Your project is responsive to different devices and/or browser sizes or screen resolutions.**

    This project is built using Bootstrap 3.3.7 and is fully responsive.


2. **our project is written primarily using the JavaScript MEAN stack (ie: don’t write a PHP or .Net application that utilizes some JavaScript). Note: for the 'A' in MEAN, you can use any framework or library, it does not need to be Angular.**

    This project was built completely using node.js, express and mongoose and uses the open-source JavaScript software stack to build a dynamic web application.  All programming involves server-side or client-side JavaScript.


3. **Must implement both a front-end component using HTML, CSS, JavaScript and a front-end JavaScript framework or library**

    This project uses bootstrap, jQuery and the ejs templating engine.


4. **Must implement a back-end component using Node.js and build/use a NoSQL database with MongoDB.**

    This project uses mongoose and mLab to accomplish this.


5. **Must implement all four CRUD functions on your database**

    This projects fulfills all of these functions as well as list upon the mLab database.


6. **Your code has comments**

    This project is still a work in progress and has lots of comments to help me go back and implement new features in the future.


7. **It must include a README file located at the top level directory.**

    ...


8. **Have fun! Your project should be something you're proud of, and that adequately demonstrates your base knowledge in the concepts you've learned.**

    This project has been the most complicated and satisfying Code Louisville project that I have done to date.  The class has been great, and although I followed a separate approach (mostly due to ejs templating), it really helped me figure out some dense core components that helped me to get my app up and running.  I've had a blast the whole way through the learning experience.


***

## Additional functionality to add in future versions:


1. #### Add authentication


2. #### Take the storeOrder variable and break it apart into multiple variables

##### Possible Solutions:
+ break storeOrder variable into multiple quantity / item variables
+ use regular expressions to take the storeOrder string and break it into individual variables AFTER it is entered

3. #### Add createDate and employeeName

+ createDate is top priority in next version
+ employeeName would be useful to tell who made the list for management

4. #### Add way to mark an order as complete without deleting it forever

+ it would be useful to keep past supply orders, perhaps even use them to generate a generic one each day that can be edited


5. #### Error Handling

+ build out error handling in orders.controller.js  replaces the parts that just throw err and replace it with a varient of:

`req.flash('errors', errors.map(err => err.msg)); return res.redirect('/');`

+ This redirects the user upon hitting an error and displays the error using flash

## Things to Fix:

1. Creating a new entry that shares the name as one that already exists breaks the app.  This was done for the specific reason to make sure that there aren't lots of orders from the same store on the same day.  It would be much more useful if the app redirects to the update route for the given storeLocation

2.  Get rid of express-validator, it throws the following error: (kind of fixed for now, will need more work in the future)

    `DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html`
