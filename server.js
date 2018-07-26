const config           = require('./config'); //  Helps to obscure login info (dotenv)
const express          = require('express');

const bodyParser       = require('body-parser');
const cookieParser     = require('cookie-parser');
const expressLayouts   = require('express-ejs-layouts');
const expressValidator = require('express-validator');
const flash            = require('connect-flash');
const mongoose         = require('mongoose');
const session          = require('express-session');

const app              = express();

// Set sessions and cookie parser
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  cookie: { maxAge: 60000 },
  resave: false,               // forces the session to be saved
  saveUninitialized: false     // dont save unmodified
}));

// This allows success and error messages to be available to the next page 
// that the user is redirected to (order created successfully from last 
// order on the /create route)
app.use(flash());

// static assets (only css here)
app.use(express.static(__dirname + '/public'));

// set ejs as templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Env is required to log into mLab and must be provided separately
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`, { useNewUrlParser: true });

// Use body parser used for parsing urls
app.use(bodyParser.urlencoded({ extended: true }));

// Validate input from user (make sure that forms are not empty)
app.use(expressValidator());

// Set routes
app.use(require('./app/routes'));

// Start server
app.listen(config.port, () => {
  console.log(`${config.appName} is up and running on port: ${config.port}`);
});