const mockDb = require('../../../data/mock_db.json'); // Make sure the path is correct
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const home_controller = {
  index: async (req, res) => {
    // Pass the recipes data to the 'home/index' view
    res.render('home/index', { recipes: mockDb });
  },
  add: async (req, res) => {
    // Pass an empty array for recipesData when rendering 'home/add_update'
    res.render('home/add_update', { recipesData: [] });
  },
  update: async (req, res) => {
    // Convert the ID to a number
    const recipeId = parseInt(req.params.id);
    // Find the recipe by id from mockDb and pass it when rendering 'home/add_update'
    const recipe = mockDb.find(r => r.id === recipeId);
    res.render('home/add_update', { recipe: recipe });
  },
  newRecipe: async (req, res) => {
    // Render the form for adding a new recipe
    res.render('home/add_update', { title: 'Add New Recipe', recipe: {} });
  },
  createRecipe: async (req, res) => {
    // Extract the recipe data from the request body
    const { name, ingredients, instructions, steps } = req.body;
    
    if (!ingredients || !steps) {
      return res.status(400).send('Ingredients and steps are required.');
    }

    // Create a new recipe object with a unique ID using `uuidv4()`
    const newRecipe = {
      id: uuidv4(),
      name,
      ingredients: ingredients.split(','), // Assuming ingredients are sent as a comma-separated string
      instructions,
      steps: steps.split(',') // Assuming steps are sent as a comma-separated string
    };
    // Read the existing contents of the JSON file
    const dbContents = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/mock_db.json'), 'utf8'));
    // Push the new recipe into the existing array
    dbContents.push(newRecipe);
    // Write the updated array back to the JSON file
    fs.writeFile(path.join(__dirname, '../../../data/mock_db.json'), JSON.stringify(dbContents, null, 2), (err) => {
      if (err) {
        console.error('Error writing data to file:', err);
        res.status(500).send('Error saving recipe');
      } else {
        console.log('Data written to file');
        res.redirect('/');
      }
    });
  },
  
  
  deleteRecipe: async (req, res) => {
    // Extract the recipe ID from the request parameters
    const recipeId = req.params.id;
    // Remove the recipe from mockDb
    const index = mockDb.findIndex(r => r.id === recipeId);
    if (index !== -1) {
      mockDb.splice(index, 1);
      // Write the updated mockDb array back to the mock_db.json file
      fs.writeFile(path.join(__dirname, '../../../data/mock_db.json'), JSON.stringify(mockDb, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });
    }
    // Redirect the user to the home page or display a success message
    res.redirect('/');
  }
};

module.exports = home_controller;
