import categoryModel from "../models/categoryModel.js";


// ADD CATEGORY
export const addCategoryService = async (data) => {

  const category = await categoryModel.create(data);

  return category;
};


// GET CATEGORIES
export const getCategoriesService = async () => {

  const categories = await categoryModel.find();

  return categories;
};


// UPDATE CATEGORY
export const updateCategoryService = async (id, data) => {

  const category = await categoryModel.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );

  return category;
};


// DELETE CATEGORY
export const deleteCategoryService = async (id) => {

  const category = await categoryModel.findByIdAndDelete(id);

  return category;
};