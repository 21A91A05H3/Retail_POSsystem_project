import productModel from "../models/productModel.js";


// INCREASE STOCK
export const increaseStockService = async (id, quantity) => {

  const product = await productModel.findById(id);

  if (!product) {
    return null;
  }

  product.stock += quantity;

  await product.save();

  return product;
};


// DECREASE STOCK
export const decreaseStockService = async (id, quantity) => {

  const product = await productModel.findById(id);

  if (!product) {
    return null;
  }

  if (product.stock < quantity) {
    throw new Error("Insufficient Stock");
  }

  product.stock -= quantity;

  await product.save();

  return product;
};