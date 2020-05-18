const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

mongoose.Promise = global.Promise;
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Connecting to the database
// mongoose
//   .connect(dbConfig.url, {
//     useNewUrlParser: true
//   })
//   .then(() => {
//     console.log("Successfully connected to the database");
//   })
//   .catch(err => {
//     console.log("Could not connect to the database. Exiting now...", err);
//     process.exit();
//   });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes. test"
  });
});
require("./app/routes/note.routes.js")(app);
const swaggerOptions = {
  customCss: '.swagger-ui img { content:url("https://cdn.freebiesupply.com/logos/large/2x/chubb-4-logo-svg-vector.svg"); }'
};
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument,swaggerOptions));


app.use( (request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// listen for requests
app.listen(1234, () => {
  console.log("Server is listening on port 1234, yes");
});

