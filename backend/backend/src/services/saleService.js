import saleModel from "../models/saleModel.js";
import productModel from "../models/productModel.js";


// CREATE SALE
export const createSaleService = async (saleData) => {

  let totalAmount = 0;

  for (const item of saleData.items) {

    const product = await productModel.findById(item.product);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < item.quantity) {
      throw new Error("Insufficient Stock");
    }

    // reduce stock
    product.stock -= item.quantity;

    await product.save();

    // set product price
    item.price = product.price;

    totalAmount += product.price * item.quantity;
  }

  saleData.totalAmount = totalAmount;

  const sale = await saleModel.create(saleData);

  return sale;
};



// GET SALES
export const getSalesService = async () => {

  const sales = await saleModel.find().populate("items.product");

  return sales;
};