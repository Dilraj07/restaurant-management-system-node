const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const User = await userModel.findById(req.user.id)
    if (User.usertype !== "admin") {
      return res.status.send({
        success: false,
        message: 'Only Admin access'
      })
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Un_authorized Access',
      error
    })
  }
}