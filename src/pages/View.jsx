import React from "react";
import axios from "axios";
import {
	Form,
	Button,
	Container,
	InputGroup,
	Card,
	Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./View.css";

import { useState, useEffect } from "react";

const View = () => {
	const data = [];
	const [books, setBooks] = useState(data);

	useEffect(() => {
		axios // use axios to get the data from the local server API
			.get("http://localhost:4000/api/books")
			.then((response) => {
				// once the data is retrieved, set the books state to the data
				console.log(response.data.books);
				setBooks(response.data.books);
			})
			.catch((error) => {
				// if there is an error, log it to the console
				console.log(error);
			});
	}, []);

	return (
		<Container>
			<br />
			<h1>View</h1>

			<InputGroup className="mb-3">
				<Form.Control
					placeholder="Search books..."
					aria-label="search-books"
					aria-describedby=""
				/>
				<Button id="basic-addon1">🔍</Button>
			</InputGroup>

			<Form>
				{books.map((book) => (
					<Card key={book._id} style={{ width: "18rem" }}>
						<div style={{ position: "relative" }}>
							<Card.Img
								variant="top"
								src="src/assets/react.svg"
							/>
							<div
								style={{
									position: "absolute",
									top: "10px",
									right: "10px",
								}}
							>
								<Dropdown>
									<Dropdown.Toggle
										variant="secondary"
										id="dropdown-basic"
									>
										...
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item href="#">
											Edit
										</Dropdown.Item>
										<Dropdown.Item href="#">
											Delete
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</div>
						<Card.Body>
							<Card.Title>{book.title}</Card.Title>
							<Card.Subtitle>Author: {book.author}</Card.Subtitle>
							<Card.Text>Year: {book.year}</Card.Text>
							<Card.Text>ISBN: {book.isbn}</Card.Text>
							<Card.Text>
								Owned: {book.owned ? "Yes" : "No"}
							</Card.Text>
							<Button
								variant="primary"
								href={`https://www.amazon.com/s?k=${book.title}`}
							>
								Search Amazon
							</Button>
							<Button variant="secondary">Edit</Button>
						</Card.Body>
					</Card>
				))}
			</Form>
		</Container>
	);
};

export default View;
