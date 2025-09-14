const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController } = require('../controllers/restaurantController');

const router = express.Router()

// create restaurant
router.post('/create', authMiddleware, createRestaurantController)

//get all restaurant 
router.get('/getAll', getAllRestaurantController)

//get restaurant by id
router.get('/get/:id', getRestaurantByIdController)

//delete restaurant
router.delete('/delete/:id',authMiddleware,deleteRestaurantController)

module.exports = router