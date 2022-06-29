const catchAsyncError = require("../middleware/catchAsyncError.js");
const Project = require("../Model/ProjectsModel");

const customerRevCtr = {
  newProject: catchAsyncError(async (req, res) => {
    // image
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({
      success: true,
      project,
    });
  }),
  getAllProjects: catchAsyncError(async (req, res) => {
    // image
    const projects = await Project.find({});
    res.status(201).json({
      success: true,
      projects,
    });
  }),
  getProjectDetails: catchAsyncError(async (req, res) => {
    // image
    const project = await Project.findById(req.params.id);
    res.status(201).json({
      success: true,
      project,
    });
  }),
  updateProduct: catchAsyncError(async (req, res, next) => {
    let project = await Project.findById(req.params.id);

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      project,
    });
  }),
};

module.exports = customerRevCtr;
