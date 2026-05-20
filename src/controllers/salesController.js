import {
  createSaleService,
  getAllSalesService,
} from "../services/salesService.js";


export const createSale = async (req, res) => {

  try {

    const sale = await createSaleService(req.body);

    res.status(201).json({
      success: true,
      message: "Sale Created Successfully",
      sale,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const getAllSales = async (req, res) => {

  try {

    const sales = await getAllSalesService();

    res.status(200).json({
      success: true,
      count: sales.length,
      sales,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};