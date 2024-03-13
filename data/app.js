// Express web app instance
const express = require('express');

// Parse request body to JSON
const bodyParser = require('body-parser');

// For File I/O
const path = require('path');

// Make mock database (raw .json file) available globally in app
global.mockDb = require(path.join(__dirname, './data/mock_db.json'));

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define routes
app.get('/', function(req, res) {
  return res.json({
    message: 'Welcome to Recipe Sharing Platform!'
  });
});

// Define other routes here...

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
