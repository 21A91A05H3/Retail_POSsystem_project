import Supplier from "../models/supplierModel.js";

export const createSupplierService = async (data) => {
  return await Supplier.create(data);
};

export const getAllSuppliersService = async () => {
  return await Supplier.find();
};

export const getSingleSupplierService = async (id) => {
  return await Supplier.findById(id);
};

export const updateSupplierService = async (id, data) => {
  return await Supplier.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteSupplierService = async (id) => {
  return await Supplier.findByIdAndDelete(id);
};