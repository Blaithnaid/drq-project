// imports
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// get environment variables
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());
// we need to allow any origin to access our server, so we use CORS middleware
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

// connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING);
// check if the connection is successful
mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB");
});

// schema
const bookSchema = new mongoose.Schema({
	title: String,
	author: String,
	year: Number,
	isbn: String,
	owned: Boolean,
});

// model
const Book = mongoose.model("Book", bookSchema);
