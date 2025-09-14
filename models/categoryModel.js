const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Category is required']
  },
  imageUrl: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Hamburger_%2812164386105%29.jpg/1200px-Hamburger_%2812164386105%29.jpg'
  }
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema);