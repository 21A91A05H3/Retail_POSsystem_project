import {
  addCategoryService,
  getCategoriesService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/categoryService.js";



// ADD CATEGORY
export const addCategory = async (req, res) => {

  try {

    const category = await addCategoryService(req.body);

    res.status(201).json({
      success: true,
      message: "Category Added Successfully",
      category,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// GET CATEGORIES
export const getCategories = async (req, res) => {

  try {

    const categories = await getCategoriesService();

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// UPDATE CATEGORY
export const updateCategory = async (req, res) => {

  try {

    const category = await updateCategoryService(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      category,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// DELETE CATEGORY
export const deleteCategory = async (req, res) => {

  try {

    await deleteCategoryService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};