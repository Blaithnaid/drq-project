// imports
import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// create an express app
const app = express();

// get environment variables
dotenv.config();

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

// route to add a new book
app.post("/api/books", async (req, res) => {
	const newMovie = new Book({ ...req.body });
	await newMovie.save();
	res.status(201).json({
		message: "Movie created successfully",
		movie: newMovie,
	});
});
