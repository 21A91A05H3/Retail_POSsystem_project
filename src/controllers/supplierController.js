import Supplier from "../models/supplierModel.js";

// ADD SUPPLIER
export const addSupplier = async (req, res) => {
  try {

    const supplier = await Supplier.create(req.body);

    res.status(201).json({
      success: true,
      message: "Supplier Added Successfully",
      supplier
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET SUPPLIERS
export const getSuppliers = async (req, res) => {
  try {

    const suppliers = await Supplier.find();

    res.status(200).json({
      success: true,
      count: suppliers.length,
      suppliers
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE SUPPLIER
export const updateSupplier = async (req, res) => {
  try {

    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Supplier Updated Successfully",
      supplier
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE SUPPLIER
export const deleteSupplier = async (req, res) => {
  try {

    await Supplier.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Supplier Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};