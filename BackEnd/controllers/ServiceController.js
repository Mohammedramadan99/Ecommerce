const Service = require("../Model/ServicesModel");
const serviceCtrl = {
  addService: async (req, res) => {
    const { customerId } = req.body;
    try {
      const newService = await new Service(req.body);
      newService.save();
      res.status(200).json({
        success: true,
        newService,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  },
  allServices: async (req, res) => {
    try {
      const services = await Service.find({});
      res.status(200).json({
        status: true,
        services,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  },
  serviceDetails: async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) {
        res.status(500).json({
          message: "no service matches this id",
        });
      }
      res.status(200).json({
        status: true,
        service,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  },
};

module.exports = serviceCtrl;
