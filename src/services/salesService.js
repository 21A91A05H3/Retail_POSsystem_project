import saleModel from "../models/saleModel.js";
import productModel from "../models/productModel.js";

export const createSaleService = async (saleData) => {

  let totalAmount = 0;

  for (const item of saleData.items) {

    const product = await productModel.findById(item.product);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for ${product.name}`);
    }

    totalAmount += product.price * item.quantity;

    product.stock -= item.quantity;

    await product.save();
  }

  saleData.totalAmount = totalAmount;

  const sale = await saleModel.create(saleData);

  return sale;
};


export const getAllSalesService = async () => {

  return await saleModel.find().populate("items.product");

};