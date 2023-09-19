// Import required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Import Sequelize configuration and session store
const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Configure session settings
const sess = {
  secret: 'Super secret secret', // Secret for session encryption
  cookie: {
    maxAge: 300000, // Maximum session age (in milliseconds)
    httpOnly: true, // HTTP only flag for security
    secure: false, // Set to true in a production environment with HTTPS
    sameSite: 'strict', // CSRF protection setting
  },
  resave: false, // Don't save session data if not modified
  saveUninitialized: true, // Save uninitialized sessions
  store: new SequelizeStore({
    db: sequelize, // Use Sequelize to store sessions in the database
  }),
};

// Use session middleware
app.use(session(sess));

// Create Handlebars engine with custom helpers
const hbs = exphbs.create({ helpers });

// Set Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Include routes defined in 'controllers' module
app.use(require('./controllers/'));

// Start the Express server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  
  // Sync Sequelize models with the database (if 'force' is set to false)
  sequelize.sync({ force: false });
});