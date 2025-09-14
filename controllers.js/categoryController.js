const categoryModel = require("../models/categoryModel");

// create category
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: 'Please provide category title '
      })
    }
    const newCategory = new categoryModel({ title, imageUrl })
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: 'Category Created',
      newCategory
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error on Create Category API',
      error
    })
  }
};

//get all category
const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(500).send({
        succcess: false,
        message: 'No categories found'
      })
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Get All Category API',
      error
    })
  }
};

//update category
const updateCatController = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, imageUrl } = req.body;
    const updateCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true })
    if (!updateCategory) {
      return res.status(500).send({
        success: false,
        message: 'No category found'
      })
    }
    res.status(200).send({
      success: true,
      message: 'Category Updated',

    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error is Update Category API',
      error
    })
  }
}

//delete category
const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: 'Please provide Category ID'
      })
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(500).send({
        succees: false,
        message: 'No category found with this id'
      })
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: 'Category deleted'
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'error in Delete Category API',
      error
    })
  }
};

module.exports = { createCatController, getAllCatController, updateCatController, deleteCatController }