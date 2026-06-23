import customerModel from "../models/customerModel.js";

// ADD CUSTOMER
export const addCustomerService = async (data) => {
  return await customerModel.create(data);
};

// GET CUSTOMERS
export const getCustomersService = async () => {
  return await customerModel.find();
};

// UPDATE CUSTOMER
export const updateCustomerService = async (
  id,
  data
) => {
  return await customerModel.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
};

// DELETE CUSTOMER
export const deleteCustomerService = async (
  id
) => {
  return await customerModel.findByIdAndDelete(id);
};