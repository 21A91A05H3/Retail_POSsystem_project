import {
  addCustomerService,
  getCustomersService,
  getCustomerByPhoneService,
  updateCustomerService,
  deleteCustomerService,
} from "../services/customerService.js";

// ==============================
// ADD CUSTOMER
// ==============================

export const addCustomer = async (req, res) => {

  try {

    const customer = await addCustomerService(
      req.body
    );

    res.status(201).json({

      success: true,

      message: "Customer Added Successfully",

      customer,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==============================
// GET ALL CUSTOMERS
// ==============================

export const getCustomers = async (req, res) => {

  try {

    const customers = await getCustomersService();

    res.status(200).json({

      success: true,

      count: customers.length,

      customers,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==============================
// GET CUSTOMER BY PHONE
// ==============================

export const getCustomerByPhone = async (req, res) => {

  try {

    const customer = await getCustomerByPhoneService(
      req.params.phone
    );

    if (!customer) {

      return res.status(404).json({

        success: false,

        message: "Customer Not Found",

      });

    }

    res.status(200).json({

      success: true,

      customer,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==============================
// UPDATE CUSTOMER
// ==============================

export const updateCustomer = async (req, res) => {

  try {

    const customer = await updateCustomerService(

      req.params.id,

      req.body

    );

    res.status(200).json({

      success: true,

      message: "Customer Updated Successfully",

      customer,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==============================
// DELETE CUSTOMER
// ==============================

export const deleteCustomer = async (req, res) => {

  try {

    await deleteCustomerService(
      req.params.id
    );

    res.status(200).json({

      success: true,

      message: "Customer Deleted Successfully",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};