// * arr -> objs -> info(name,rating,img,...,....)
const mongoose = require("mongoose");

const ProjectsSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  desc: {
    type: String,
  },
  details: [
    {
      head: {
        type: String,
      },
      paragraph: {
        type: String,
      },
      items: {
        type: Array,
      },
    },
  ],
  githubLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("project", ProjectsSchema);
module.exports = Project;
