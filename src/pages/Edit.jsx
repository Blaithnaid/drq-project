// imports
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Add.css";

const Edit = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// State for form fields
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [year, setYear] = useState("");
	const [isbn, setIsbn] = useState("");
	const [owned, setOwned] = useState(true);
	const [cover, setCover] = useState("");

	// Fetch book data on component mount
	useEffect(() => {
		const fetchBook = async () => {
			try {
				const response = await axios.get(
					`http://localhost:4000/api/books/${id}`
				);
				const book = response.data.book;

				// Populate form fields
				setTitle(book.title);
				setAuthor(book.author);
				setYear(book.year || "");
				setIsbn(book.isbn || "");
				setOwned(book.owned);
				setCover(book.cover || "");
			} catch (error) {
				console.error("Error fetching book:", error);
				alert("Error loading book data");
			}
		};

		fetchBook();
	}, [id]);

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// create book object with form data
			const updatedBook = {
				title,
				author,
				year,
				isbn,
				owned,
				cover,
			};

			// post the book to our API
			await axios.put(
				`http://localhost:4000/api/books/${id}`,
				updatedBook
			);
			alert("Book updated successfully");
			navigate("/view"); // Redirect to view page
		} catch (error) {
			console.error("Error updating book:", error);
			alert("Failed to update book");
		}
	};

	return (
		<Container>
			<br />
			<h1>Edit Book</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Author</Form.Label>
					<Form.Control
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Year</Form.Label>
					<Form.Control
						type="number"
						value={year}
						onChange={(e) => setYear(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>ISBN</Form.Label>
					<Form.Control
						type="text"
						value={isbn}
						onChange={(e) => setIsbn(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Owned</Form.Label>
					<Form.Select
						value={owned ? "1" : "2"}
						onChange={(e) => setOwned(e.target.value === "1")}
					>
						<option value="1">I own it</option>
						<option value="2">I want to buy it</option>
					</Form.Select>
				</Form.Group>

				<Button variant="primary" type="submit">
					Update Book
				</Button>
			</Form>
		</Container>
	);
};

export default Edit;
