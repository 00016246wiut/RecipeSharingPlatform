const express = require('express');
const router = express.Router();
const home_controller = require('../../../controllers/web/home');

router.get('/', home_controller.index);
router.get('/add', home_controller.add); // Route for adding a new recipe
router.get('/update', home_controller.update); // Route for updating an existing recipe
// Add this line in your routes\web\home\index.js file
router.get('/recipes/new', home_controller.newRecipe); // Route for displaying the form to add a new recipe
router.post('/recipes/create', home_controller.createRecipe);
router.delete('/recipes/:id', home_controller.deleteRecipe);
router.get('/recipes/:id/edit', home_controller.update);






module.exports = router;
