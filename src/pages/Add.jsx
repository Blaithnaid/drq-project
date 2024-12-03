import axios from "axios";
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Add.css";

// Function to fetch book cover and ISBN from Open Library API
const fetchBookInfo = async (title, author) => {
	try {
		const response = await axios.get(
			`https://openlibrary.org/search.json?title=${encodeURIComponent(
				title
			)}&author=${encodeURIComponent(author)}`
		);

		if (response.data.docs && response.data.docs.length > 0) {
			const book = response.data.docs[0];
			const isbn = book.isbn ? book.isbn[0] : null;
			const year = book.publish_year ? book.publish_year[0] : null;

			if (isbn) {
				const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}.jpg`;
				console.log("Fetched book cover URL:", coverUrl);
				return { coverUrl, isbn, year };
			}
		}
		console.log("No ISBN found");
		return { coverUrl: null, isbn: null };
	} catch (error) {
		console.error("Error fetching book cover:", error);
		return { coverUrl: null, isbn: null };
	}
};

const Add = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [year, setYear] = useState("");
	const [owned, setOwned] = useState(true);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { coverUrl, isbn, year } = await fetchBookInfo(title, author);
		console.log(
			`Title: ${title}, Author: ${author}, Year: ${year}, ISBN: ${isbn}, Owned: ${owned}, Cover: ${coverUrl}`
		);
		const book = {
			title,
			author,
			cover: coverUrl,
			year: year,
			isbn: isbn,
			owned,
		};

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
