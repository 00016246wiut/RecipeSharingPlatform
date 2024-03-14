const mockDb = require('../../../data/mock_db.json'); // Make sure the path is correct
const { v4: uuidv4 } = require('uuid');

const home_controller = {
  index: async (req, res) => {
      // Pass the recipes data to the 'home/index' view
      res.render('home/index', { recipes: mockDb });
  },
  // Modify the 'add' method in controllers\web\home\index.js
add: async (req, res) => {
  // Pass an empty array for recipesData when rendering 'home/add_update'
  res.render('home/add_update', { recipesData: [] }); // Ensure this is an array
},

update: async (req, res) => {
  // Convert the ID to a number
  const recipeId = parseInt(req.params.id);
  // Find the recipe by id from mockDb and pass it when rendering 'home/add_update'
  // Assuming each recipe has a unique 'id' field
  const recipe = mockDb.find(r => r.id === recipeId);
  res.render('home/add_update', { recipe: recipe });
},

  // New method for displaying the form to add a new recipe
  newRecipe: async (req, res) => {
      // Render the form for adding a new recipe
      res.render('home/add_update', { title: 'Add New Recipe', recipe: {} });
  },
  createRecipe: async (req, res) => {
    // Extract the recipe data from the request body
    const { name, ingredients, instructions } = req.body;

    // Create a new recipe object with a unique ID using `uuidv4()`
    const newRecipe = {
      id: uuidv4(),
      name,
      ingredients,
      instructions
    };

    // Add the new recipe to the mockDb or your actual database
    mockDb.push(newRecipe);

    // Redirect the user to the home page or display a success message
    res.redirect('/');
  }
  
};


module.exports = home_controller;
