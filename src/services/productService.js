import productModel from "../models/productModel.js";

// ADD PRODUCT
export const addProductService = async (
  productData
) => {

  const product = await productModel.create(
    productData
  );

  return product;
};

// GET ALL PRODUCTS
export const getProductsService = async () => {

  const products = await productModel.find();

  return products;
};

// UPDATE PRODUCT
export const updateProductService = async (
  id,
  updateData
) => {

  const product =
    await productModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

  return product;
};

// DELETE PRODUCT
export const deleteProductService = async (
  id
) => {

  const product =
    await productModel.findByIdAndDelete(id);

  return product;
};

// SEARCH PRODUCTS
export const searchProductsService = async (
  keyword,
  category,
  minPrice,
  maxPrice
) => {

  let query = {};

  // SEARCH BY NAME
  if (keyword) {

    query.name = {
      $regex: keyword,
      $options: "i",
    };
  }

  // FILTER CATEGORY
  if (category) {

    query.category = category;
  }

  // FILTER PRICE
  if (minPrice || maxPrice) {

    query.price = {};

    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  return await productModel.find(query);
};

// PAGINATED PRODUCTS
export const getPaginatedProductsService = async (
  page,
  limit
) => {

  const skip = (page - 1) * limit;

  const products = await productModel
    .find()
    .skip(skip)
    .limit(limit);

  const totalProducts =
    await productModel.countDocuments();

  return {
    products,
    totalProducts,
  };
};