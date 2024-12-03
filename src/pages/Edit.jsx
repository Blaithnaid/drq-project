// imports
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import FormSelect from "react-bootstrap/FormSelect";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Add.css";
// Get Google Books API key from environment variables
const GOOGLE_BOOKS_KEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY;

// Function to fetch book cover from Google Books API
const fetchBookCover = async (title, author) => {
	try {
		const response = await axios.get(
			`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
				`${title} ${author}`
			)}&key=${GOOGLE_BOOKS_KEY}`
		);

		if (
			response.data.items &&
			response.data.items[0].volumeInfo.imageLinks
		) {
			const coverUrl =
				response.data.items[0].volumeInfo.imageLinks.thumbnail;
			console.log("Fetched book cover URL:", coverUrl);
			return coverUrl;
		}
		console.log("No book cover found");
		return null;
	} catch (error) {
		console.error("Error fetching book cover:", error);
		return null;
	}
};

const Edit = () => {
	// state variables
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [year, setYear] = useState("");
	const [isbn, setIsbn] = useState("");
	const [owned, setOwned] = useState(true);

	// handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		// fetch book cover
		const cover = await fetchBookCover(title, author);
		// log details from the form
		console.log(
			`Title: ${title}, Author: ${author}, Year: ${year}, ISBN: ${isbn}, Owned: ${owned}, Cover: ${cover}`
		);
		// create a new book object
		const book = {
			title: title,
			author: author,
			cover: cover,
			year: year,
			isbn: isbn,
			owned: owned,
		};

		axios
			.post("http://localhost:4000/api/books", book)
			.then((res) => console.log("Book added successfully:", res.data))
			.catch((err) => console.error("Error adding book:", err));
	};

	return <></>;
};

export default Edit;
