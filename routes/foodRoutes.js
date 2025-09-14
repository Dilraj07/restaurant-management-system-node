const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodControllers');
const { route } = require('./restaurantRoutes');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router()

//create food 
router.post('/create', authMiddleware, createFoodController)

//get all foods
router.get('/getAll', getAllFoodsController)

//get food item
router.get('/get/:id', getSingleFoodController)

//get food by restaurant
router.get('/getByRestaurant/:id', getFoodByRestaurantController)

//update food
router.put('/update/:id', authMiddleware, updateFoodController)

//delete
router.delete('/delete/:id', authMiddleware, deleteFoodController)

//place order
router.post('/placeorder', authMiddleware, placeOrderController)

//order status
router.post('/orderStatus/:id', authMiddleware, adminMiddleware, orderStatusController)

module.exports = router