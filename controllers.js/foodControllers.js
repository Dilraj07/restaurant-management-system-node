const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//create food
const createFoodController = async (req, res) => {
  try {
    const { title, description, price, imageUrl, foodTags, category, code, isAvaliable, restaurant, rating, ratingCount } = req.body;
    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: 'Please provide all fields'
      })
    }
    const newFood = new foodModel({ title, description, price, imageUrl, foodTags, category, code, isAvaliable, restaurant, rating, ratingCount });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: 'New Food Item Created',
      newFood
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error in Create Food API',
      error
    })
  }
};

//get all food items
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: 'no food items found'
      })
    }
    res.status(200).send({
      success: true,
      itemCount: foods.length,
      foods
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error in Get All Food API',
      error
    })
  }
};

//get food item
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: 'Please provide food id'
      })
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'No Food item with given id'
      })
    }
    res.status(200).send({
      success: true,
      food
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error in Get  Food API',
      error
    })
  }
};

//get food by restaurant
const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: 'Please provide food id'
      })
    }
    const food = await foodModel.find({ restaurant: restaurantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'No Food item with given id'
      })
    }
    res.status(200).send({
      success: true,
      message: 'food based on restaurant',
      food
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error in Get  Food API',
      error
    })
  }
};

//update food item
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: 'Please provide food id'
      })
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'No Food item with given id'
      })
    }
    const { title, description, price, imageUrl, foodTags, category, code, isAvaliable, restaurant, rating, ratingCount } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(foodId, { title, description, price, imageUrl, foodTags, category, code, isAvaliable, restaurant, rating, ratingCount }, { new: true })
    res.status(200).send({
      success: true,
      message: 'food item updated',
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error in Update Food API',
      error
    })
  }
}

//delete food item
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: 'Please provide food id'
      })
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'No Food item with given id'
      })
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: 'food item deleted',
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error in Update Food API',
      error
    })
  }
}

//place order
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart || cart.length === 0) {
      return res.status(400).send({
        success: false,
        message: 'Cart is empty.'
      });
    }

    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    const foodIds = cart.map(item => item.id);

    const newOrder = new orderModel({
      foods: foodIds,
      payment: total,
      buyer: req.user.id,
    });

    await newOrder.save();

    res.status(201).send({
      success: true,
      message: 'Order Placed Successfully',
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Place Order API',
      error,
    });
  }
};

//change order status
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: 'false',
        message: 'Please provide valid order ID'
      })
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).send({
      success: true,
      message: 'Order Status updated'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Order Status API',
      error,
    });
  }
}

module.exports = { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController };