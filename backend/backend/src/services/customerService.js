import customerModel from "../models/customerModel.js";

// ==============================
// ADD CUSTOMER
// ==============================

export const addCustomerService = async (data) => {

  const existingCustomer = await customerModel.findOne({

    phone: data.phone

  });

  if (existingCustomer) {

    return existingCustomer;

  }

  return await customerModel.create(data);

};

// ==============================
// GET ALL CUSTOMERS
// ==============================

export const getCustomersService = async () => {

  return await customerModel.find();

};

// ==============================
// GET CUSTOMER BY PHONE
// ==============================

export const getCustomerByPhoneService = async (phone) => {

  return await customerModel.findOne({

    phone

  });

};

// ==============================
// UPDATE CUSTOMER
// ==============================

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

// ==============================
// DELETE CUSTOMER
// ==============================

export const deleteCustomerService = async (id) => {

  return await customerModel.findByIdAndDelete(id);

};