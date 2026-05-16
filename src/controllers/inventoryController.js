import {
  increaseStockService,
  decreaseStockService,
} from "../services/inventoryService.js";



// INCREASE STOCK
export const increaseStock = async (req, res) => {

  try {

    const product = await increaseStockService(
      req.params.id,
      req.body.quantity
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stock Increased Successfully",
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



// DECREASE STOCK
export const decreaseStock = async (req, res) => {

  try {

    const product = await decreaseStockService(
      req.params.id,
      req.body.quantity
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Stock Decreased Successfully",
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};