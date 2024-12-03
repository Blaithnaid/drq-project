import axios from "axios";
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Add.css";

// Function to fetch book metadata from open library API using title, or title and author
const fetchBookInfo = async (title, formAuthor) => {
	try {
		// Use formAuthor in URL if provided
		const searchUrl = formAuthor
			? `https://openlibrary.org/search.json?title=${encodeURIComponent(
					title
			  )}&author=${encodeURIComponent(formAuthor)}`
			: `https://openlibrary.org/search.json?title=${encodeURIComponent(
					title
			  )}`;

		const response = await axios.get(searchUrl);

		if (response.data.docs && response.data.docs.length > 0) {
			const book = response.data.docs[0];
			// Use provided author or get from API
			const finalAuthor =
				formAuthor || (book.author_name ? book.author_name[0] : null);
			const isbn = book.isbn ? book.isbn[0] : null;
			const year = book.publish_year ? book.publish_year[0] : null;

			if (isbn) {
				const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}.jpg`;
				console.log("Fetched book cover URL:", coverUrl);
				return { coverUrl, isbn, year, finalAuthor };
			}
		}
		return { coverUrl: null, isbn: null, year: null, finalAuthor: null };
	} catch (error) {
		console.error("Error fetching book cover:", error);
		return { coverUrl: null, isbn: null, year: null, finalAuthor: null };
	}
};

const Add = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [owned, setOwned] = useState(true);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { coverUrl, isbn, year, finalAuthor } = await fetchBookInfo(
			title,
			author
		);

		// Use entered author if available, otherwise use API author
		const bookAuthor = author || finalAuthor;

		console.log(
			`Title: ${title}, Author: ${bookAuthor}, Year: ${year}, ISBN: ${isbn}, Owned: ${owned}, Cover: ${coverUrl}`
		);

		const book = {
			title,
			author: bookAuthor,
			cover: coverUrl,
			year,
			isbn,
			owned,
		};

		// post the book to our API
		axios
			.post("http://localhost:4000/api/books", book)
			.then((res) => console.log("Book added successfully:", res.data))
			.catch((err) => console.error("Error adding book:", err));
	};

	return (
		<Container>
			<br />
			<h1>Add a Book</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label className="form-label">Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter title"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="form-label">Author</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter author"
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="form-label">Owned</Form.Label>
					<Form.Select
						aria-label="Default select example"
						onChange={(e) => setOwned(e.target.value === "1")}
					>
						<option>Do you own this book?</option>
						<option value="1">I own it</option>
						<option value="2">I want to buy it</option>
					</Form.Select>
				</Form.Group>
				<Button variant="primary" type="submit">
					Add Book
				</Button>
			</Form>
		</Container>
	);
};

export default Add;
