const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Food title is required"]
  },
  description: {
    type: String,
    required: [true, 'Food description is required']
  },
  price: {
    type: Number,
    required: [true, 'Food price is required']
  },
  imageUrl: {
    type: String,
    default: 'https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg'
  },
  foodTags: {
    type: String,
  },
  category: {
    type: String
  },
  code: {
    type: String
  },
  isAvaliable: {
    type: Boolean,
    default: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5
  },
  ratingCount: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Foods', foodSchema);