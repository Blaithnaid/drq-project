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
			<Form>
				<Row>
					{books.map((book) => (
						<Col
							key={book.id}
							xs={12}
							sm={6}
							md={4}
							style={{ marginBottom: "20px" }}
						>
							<Card>
								<div className="d-flex justify-content-between align-items-center">
									<Card.Img variant="top" src={book.cover} />
									<div>
										<Dropdown>
											<Dropdown.Toggle
												variant="success"
												id="dropdown-basic"
											>
												Options
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
									<Card.Text as="div">
										<div>Author: {book.author}</div>
										<div>Year: {book.year}</div>
										<div>ISBN: {book.isbn}</div>
										<div>
											Owned: {book.owned ? "Yes" : "No"}
										</div>
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
						</Col>
					))}
				</Row>
			</Form>
		</Container>
	);
};

export default View;
