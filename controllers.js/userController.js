const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');


//user info
const getUserController = async (req, res) => {
  console.log(req.user.id);
  try {
    //find user
    const User = await userModel.findById({ _id: req.user.id })
    //validation
    if (!User) {
      res.status(404).send({
        success: false,
        message: 'User not found'
      })
    }
    //hide pass
    User.password = undefined;
    res.status(200).send({
      success: true,
      message: 'User data Successfull',
      User
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Get user API',
      error
    })
  }
};

//update 
const updateUserController = async (req, res) => {
  try {
    //find user
    const User = await userModel.findById({ _id: req.user.id })
    //validation
    if (!User) {
      res.status(404).send({
        success: false,
        message: 'User not found'
      })
    }
    //update
    const { userName, address, phone } = req.body;
    if (userName) User.userName = userName
    if (address) User.address = address
    if (phone) User.phone = phone
    //save user
    await User.save();
    res.status(200).send({
      success: true,
      message: 'User Data Updated Successfull',
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error
    })
  }
}
//update password
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const User = await userModel.findById({ _id: req.user.id })
    //validation
    if (!User) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      })
    }
    //get new pass
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old or new Password"
      })
    }
    const isMatch = await bcrypt.compare(oldPassword, User.password)
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: 'Invalid old password'
      });
    }
    User.password = newPassword;
    var salt = bcrypt.genSaltSync(10);
    const hashedPassord = await bcrypt.hash(newPassword, salt);
    User.password = hashedPassord;
    await User.save();
    res.status(200).send({
      success: true,
      message: "Password updated successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Update Password API',
      error
    })
  }
}


//reset password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: 'Please provide all field'
      })

    }
    const User = await userModel.findOne({ email, answer })
    if (!User) {
      return res.status(500).send({
        success: false,
        message: 'User not found or invalid answer'
      })
    }
    //hashing 
    var salt = bcrypt.genSaltSync(10);
    const hashedPassord = await bcrypt.hash(newPassword, salt);
    User.password = hashedPassord;
    await User.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error is Rest Password API',
      error
    })
  }
}

//delete account
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Profile Deleted"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Delete Profile API',
      error
    })
  }
}

module.exports = { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController };