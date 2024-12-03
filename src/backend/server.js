// imports
import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const port = 4000;

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
	cover: String,
	year: Number,
	isbn: String,
	owned: Boolean,
});

// model
const Book = mongoose.model("Book", bookSchema);

// route to add a new book
app.post("/api/books", async (req, res) => {
	const newBook = new Book({ ...req.body });
	await newBook.save();
	res.status(201).json({
		message: "Book created successfully",
		book: newBook,
	});
});

// route to get all movies
app.get("/api/books", async (req, res) => {
	try {
		const books = await Book.find({});
		res.status(200).json({ books });
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch books" });
	}
});

// route to remove a book
app.delete("/api/books/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) {
			return res.status(404).json({ error: "Book not found" });
		}
		await book.remove();
		res.status(200).json({ message: "Book deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: "Failed to delete book" });
	}
});

// error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});

// listen on port 4000, respond to requests
app.listen(port, () => {
	// log a message to the console
	console.log(`Server is running on http://localhost:${port}`);
});
