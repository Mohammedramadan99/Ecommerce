const express = require("express");
const projectsCtr = require("../controllers/ProjectsController");
const router = express.Router();

const {
  authorizeRoles,
  isAuthenticatedUser,
} = require("../middleware/auth.js");

const { newProject, getAllProjects, updateProduct, getProjectDetails } =
  projectsCtr;

router.route("/project/new").post(newProject);
router.route("/projects").get(getAllProjects);
router.route("/project/:id").get(getProjectDetails);
router.route("/project/:id").put(updateProduct);

module.exports = router;
