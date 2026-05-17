import {
  createSaleService,
  getSalesService,
} from "../services/saleService.js";



// CREATE SALE
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



// GET SALES
export const getSales = async (req, res) => {

  try {

    const sales = await getSalesService();

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
// sales module completed
  }
};