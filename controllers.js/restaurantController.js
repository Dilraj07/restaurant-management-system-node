const restaurantModel = require("../models/restaurantModel");

// create 
const createRestaurantController = async (req, res) => {
  try {
    const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: 'Please provide title and address'
      })
    }
    const newRestaurant = new restaurantModel({ title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords })
    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: 'New Restaurnat created'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Create  Restaurant API',
      error
    })
  }
}

//get all restaurant
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: 'No Restaurant Avaliable'
      })
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error in Get All Restaurant API',
      error
    })
  }
}

//get restaurant by id
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: 'Please provide restaurant ID'
      })
    }
    //find restaurant on id
    const restaurant = await restaurantModel.findById(restaurantId)
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: 'Restaurant not found'
      })
    }
    res.status(200).send({
      success: true,
      restaurant
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in get restaurant API',
      error
    })
  }
}

//delete restaurant
const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: 'Please provide Restaurant ID or No restaurant found'
      })
    }
    await restaurantModel.findByIdAndDelete(restaurantId);
    res.status(200).send({
      success: true,
      message: 'Restaurant Deleted'
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error in delete restaurant API',
      error
    })
  }
}

module.exports = { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController };