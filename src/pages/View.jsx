import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Form,
	Button,
	Container,
	InputGroup,
	Card,
	Dropdown,
	Row,
	Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./View.css";

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
			<Row>
				{books.map((book) => (
					<Col
						key={book._id}
						xs={12}
						sm={6}
						md={4}
						style={{ marginBottom: "20px" }}
					>
						<Card>
							<div className="d-flex justify-content-between align-items-center">
								<Card.Img variant="top" src={book.cover} />
							</div>
							<Card.Body>
								<Card.Title>{book.title}</Card.Title>
								<Card.Subtitle>{book.author}</Card.Subtitle>
								<Card.Text as="div">
									<div>ID: {book._id}</div>
									<div>Year: {book.year}</div>
									<div>ISBN: {book.isbn}</div>
									<div>
										Owned: {book.owned ? "Yes" : "No"}
									</div>
								</Card.Text>
								<div className="d-flex justify-content-between">
									<Dropdown className="flex-grow-1">
										<Dropdown.Toggle
											variant="primary"
											id="dropdown-basic"
										>
											Options
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item
												href="#"
												onClick={() => {
													console.log(
														"Attempting to delete book with id:",
														book._id
													); // Add this line
													if (
														window.confirm(
															"Are you sure you want to delete this book?"
														)
													) {
														axios
															.delete(
																`http://localhost:4000/api/books/${book._id}`
															)
															.then(() => {
																setBooks(
																	books.filter(
																		(b) =>
																			b.id !==
																			book._id
																	)
																);
															})
															.catch((error) => {
																console.error(
																	"Error deleting book:",
																	error
																);
																alert(
																	"Failed to delete the book. Please try again."
																);
															});
													}
												}}
											>
												Delete
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
									<Dropdown className="flex-grow-1">
										<Dropdown.Toggle
											variant="secondary"
											id="dropdown-basic"
										>
											Search
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item
												href={`https://www.amazon.com/s?k=${book.title}`}
											>
												Amazon
											</Dropdown.Item>
										</Dropdown.Menu>
										<Dropdown.Menu>
											<Dropdown.Item
												href={`https://www.goodreads.com/search?q=${book.title}`}
											>
												Goodreads
											</Dropdown.Item>
										</Dropdown.Menu>
										<Dropdown.Menu>
											<Dropdown.Item
												href={`https://www.google.com/search?udm=36&q=${book.title}`}
											>
												Google Books
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default View;
