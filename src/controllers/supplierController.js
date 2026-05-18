import {
  createSupplierService,
  getAllSuppliersService,
  getSingleSupplierService,
  updateSupplierService,
  deleteSupplierService,
} from "../services/supplierService.js";

export const createSupplier = async (req, res) => {
  try {
    const supplier = await createSupplierService(req.body);

    res.status(201).json({
      success: true,
      supplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await getAllSuppliersService();

    res.status(200).json({
      success: true,
      suppliers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleSupplier = async (req, res) => {
  try {
    const supplier = await getSingleSupplierService(req.params.id);

    res.status(200).json({
      success: true,
      supplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const supplier = await updateSupplierService(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      supplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    await deleteSupplierService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Supplier Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    // supplier module completed
  }
};