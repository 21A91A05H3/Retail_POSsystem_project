import productModel from "../models/productModel.js";


// ADD PRODUCT
export const addProductService = async (productData) => {

  const product = await productModel.create(productData);

  return product;
};



// GET ALL PRODUCTS
export const getProductsService = async () => {

  const products = await productModel.find();

  return products;
};



// UPDATE PRODUCT
export const updateProductService = async (id, updateData) => {

  const product = await productModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );

  return product;
};



// DELETE PRODUCT
export const deleteProductService = async (id) => {

  const product = await productModel.findByIdAndDelete(id);

  return product;
};