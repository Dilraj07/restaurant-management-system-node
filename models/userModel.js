const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'user name is require']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  address: {
    type: Array,
  },
  phone: {
    type: String,
    required: [true, 'phone number is required']
  },
  usertype: {
    type: String,
    required: [true, 'user type is required'],
    default: 'client',
    enum: ['client', 'admin', 'vendor', 'driver']
  },
  profile: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2025/08/26/11/57/icon-9798059_1280.png'
  },
  answer: {
    type: String,
    required: [true, 'Answer is required']
  },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);