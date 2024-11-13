// imports
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import FormSelect from "react-bootstrap/FormSelect";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Add.css";

const Add = () => {
	// state variables
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [year, setYear] = useState("");
	const [isbn, setIsbn] = useState("");
	const [owned, setOwned] = useState(true);

	// handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		// log details from the form
		console.log(`Title: ${title}, Year: ${year}, Poster: ${poster}`);
		// create a new movie object
		const movie = {
			title: title,
			author: author,
			year: year,
			isbn: isbn,
			owned: owned,
		};

		axios
			.post("http://localhost:4000/api/books", movie)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err.data));
	};

	return (
		<Container>
			<br />
			<h1>Add a Book</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter title"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Author</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter author"
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Year</Form.Label>
					<Form.Control
						type="number"
						placeholder="Enter year"
						onChange={(e) => setYear(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>ISBN</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter ISBN"
						onChange={(e) => setIsbn(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Owned</Form.Label>
					<Form.Select
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
