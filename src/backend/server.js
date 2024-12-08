// imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 4000;

// create an express app
const app = express();

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

// route to get all books
app.get("/api/books", async (req, res) => {
	try {
		const books = await Book.find({});
		res.status(200).json({ books });
	} catch (err) {
		console.error("Error fetching books:", err);
		res.status(500).json({ error: "Failed to fetch books" });
	}
});

// Get single book by ID
app.get("/api/books/:id", async (req, res) => {
	try {
		console.log("Fetching book with ID:", req.params.id);
		const book = await Book.findById(req.params.id);

		if (!book) {
			console.log("Book not found");
			return res.status(404).json({ error: "Book not found" });
		}

		console.log("Book found:", book);
		res.status(200).json({ book });
	} catch (err) {
		console.error("Error fetching book:", err);
		res.status(500).json({ error: "Failed to fetch book" });
	}
});

// route to remove a book
app.delete("/api/books/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) {
			return res.status(404).json({ error: "Book not found" });
		}
		await Book.deleteOne({ _id: req.params.id });
		res.status(200).json({ message: "Book deleted successfully" });
	} catch (err) {
		console.error("Error deleting book:", err);
		res.status(500).json({ error: "Failed to delete book" });
	}
});

// edit a book by ID
app.put("/api/books/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		if (!book) {
			return res.status(404).json({ error: "Book not found" });
		}
		book.set(req.body);
		await book.save();
		res.status(200).json({ message: "Book updated successfully" });
	} catch (err) {
		console.error("Error updating book:", err);
		res.status(500).json({ error: "Failed to update book" });
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
