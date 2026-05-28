import invoiceModel from "../models/invoiceModel.js";

// ======================================
// CREATE INVOICE
// ======================================

export const createInvoice = async (req, res) => {

  try {

    const {
      customerName,
      products,
    } = req.body;

    // calculate total amount
    let totalAmount = 0;

    const updatedProducts = products.map((item) => {

      const subtotal =
        item.quantity * item.price;

      totalAmount += subtotal;

      return {
        ...item,
        subtotal,
      };

    });

    // create invoice
    const invoice = await invoiceModel.create({
      customerName,
      products: updatedProducts,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Invoice Generated Successfully",
      invoice,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================================
// GET ALL INVOICES
// ======================================

export const getInvoices = async (req, res) => {

  try {

    const invoices =
      await invoiceModel.find();

    res.status(200).json({
      success: true,
      invoices,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================================
// GET SINGLE INVOICE
// ======================================

export const getSingleInvoice = async (
  req,
  res
) => {

  try {

    const invoice =
      await invoiceModel.findById(
        req.params.id
      );

    if (!invoice) {

      return res.status(404).json({
        success: false,
        message: "Invoice Not Found",
      });

    }

    res.status(200).json({
      success: true,
      invoice,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};