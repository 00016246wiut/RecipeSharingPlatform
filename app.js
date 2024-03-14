// Express web app instance
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webRoute = require('./routes/web');
global.mockDb = require(path.join(__dirname, './data/mock_db.json'));

const app = express();

// Set the view engine for web routes
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());

// Serve static files from public directory
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));

// Use web routes
app.use('/', webRoute);

// Here's the added code for the /recipes route handler
const mockDb = require('./data/mock_db.json'); // Adjust the path as per your project structure

app.get('/recipes', (req, res) => {
    // Retrieve recipes data
    const recipesData = mockDb.recipes; // Access the recipes array directly from mockDb

    // Check if recipesData is defined and is an array
    if (!Array.isArray(recipesData)) {
        console.error('recipesData is not an array:', recipesData);
        // Handle the error appropriately
        return res.status(500).send('Server Error: Unable to retrieve recipes.');
    }

    // Render the view and pass the recipes data to it
    res.render('home/index', { recipes: recipesData });
});

const methodOverride = require('method-override');

// ... other app setup ...

// Use methodOverride with a query value
app.use(methodOverride('_method'));



const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
