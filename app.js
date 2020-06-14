const express = require("express");
const projectsData = require("./data.json");
const app = express();

app.set("view engine", "pug");
app.use("/static", express.static("public"));

// index page router
app.get("/", (req, res) => {
  res.render("index", {projectsData});
});

// about page router
app.get("/about", (req, res) => {
  res.render("about", {onAbout: true}); // onAbout is used to remove a redundant link from template
});

// project page router
app.get(`/projects:id`, (req, res) => {
  const id = req.params.id; // gets the id number that is sent in the request
  const project = projectsData.projects[id] // gets the project clicked on and provides it to the template
  res.render("project", {project});
});

// Error handling
app.use((req, res, next) => {
  // any requests that make it this far without being routed will produce this error;
  const err = new Error("Sorry, page not found.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err; // this stores the error into the response object to be used anywhere the response is used.
  console.log("There was an error...")
  res.render("error");
})


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
