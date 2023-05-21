const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const errorMiddleware = require("./middleware/error");

// installing cookie-parser used in auth.js
const cookieParser = require("cookie-parser");

// cloudinary
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
// product route
const product = require("./routes/productRoute");

// user route
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
