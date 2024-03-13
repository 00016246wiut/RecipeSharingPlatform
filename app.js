// Express web app instance
const express = require('express');

// Parse request body to JSON
const bodyParser = require('body-parser');

// For File I/O
const path = require('path');

// For web routing
const webRoute = require('./routes/web');

// Make mock database (raw .json file) available globally in app
global.mockDb = require(path.join(__dirname, './data/mock_db.json'));

const app = express();

// Set the view engine for web routes
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.use(bodyParser.json());

// Serve static files from public directory
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));

// Use web routes
app.use('/', webRoute);

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
