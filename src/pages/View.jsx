import React, { useState, useEffect } from "react";
import axios from "axios";
import {
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

	const handleDelete = (bookId) => {
		console.log("Attempting to delete book with id:", bookId);
		if (window.confirm("Are you sure you want to delete this book?")) {
			axios
				.delete(`http://localhost:4000/api/books/${bookId}`)
				.then((response) => {
					console.log("Book deleted successfully:", response.data);
					setBooks(books.filter((book) => book._id !== bookId));
				})
				.catch((error) => {
					console.error("Error deleting book:", error);
					alert("Failed to delete the book. Please try again.");
				});
		}
	};

	const formatTitleForUrl = (title) => {
		return encodeURIComponent(title.trim());
	};

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
								<Card.Img
									variant="top"
									src={book.cover}
									style={{
										maxHeight: "400px",
										width: "auto",
									}}
								/>
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
											<Dropdown.Item href="#">
												Edit
											</Dropdown.Item>
											<Dropdown.Item
												href="#"
												onClick={() =>
													handleDelete(book._id)
												}
											>
												Delete
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
									{book.owned ? (
										<Dropdown className="flex-grow-1">
											<Dropdown.Toggle
												variant="success"
												id="dropdown-basic"
											>
												Search
											</Dropdown.Toggle>
											<Dropdown.Menu>
												<Dropdown.Item href="#">
													Goodreads
												</Dropdown.Item>
												<Dropdown.Item
													href={`https://app.thestorygraph.com/browse?search_term=${formatTitleForUrl(
														book.title
													)}`}
												>
													TheStorygraph
												</Dropdown.Item>
												<Dropdown.Item
													href={`https://www.librarything.com/search.php?search=${formatTitleForUrl(
														book.title
													)}`}
												>
													LibraryThing
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									) : (
										<Dropdown className="flex-grow-1">
											<Dropdown.Toggle
												variant="success"
												id="dropdown-basic"
											>
												Buy
											</Dropdown.Toggle>
											<Dropdown.Menu>
												<Dropdown.Item
													href={`https://www.amazon.co.uk/s?k=${formatTitleForUrl(
														book.title
													)}`}
												>
													Amazon
												</Dropdown.Item>
												<Dropdown.Item
													href={`https://www.ebay.com/sch/261186/i.html?_nkw=${formatTitleForUrl(
														book.title
													)}`}
												>
													Ebay
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									)}
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
