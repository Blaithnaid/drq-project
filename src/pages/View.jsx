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
	Modal,
	Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./View.css";
import { useNavigate } from "react-router-dom";

import BookCard from "../components/BookCard.jsx";

const View = () => {
	const data = [];
	const [books, setBooks] = useState(data);
	const navigate = useNavigate();
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [bookToDelete, setBookToDelete] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredBooks = books.filter((book) => {
		if (!book || (!book.title && !book.author)) return false;

		const search = searchTerm.toLowerCase();
		const title = book.title?.toLowerCase() || "";
		const author = book.author?.toLowerCase() || "";

		return title.includes(search) || author.includes(search);
	});

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

	const handleEdit = (bookId) => {
		navigate(`/edit/${bookId}`);
	};

	const formatTitleForUrl = (title) => {
		return encodeURIComponent(title.trim());
	};

	const handleDeleteClick = (book) => {
		setBookToDelete(book);
		setShowDeleteModal(true);
	};

	const confirmDelete = async () => {
		if (bookToDelete) {
			try {
				await axios.delete(
					`http://localhost:4000/api/books/${bookToDelete._id}`
				);
				setBooks(books.filter((book) => book._id !== bookToDelete._id));
				setShowDeleteModal(false);
			} catch (error) {
				console.error("Error deleting book:", error);
				alert("Failed to delete the book. Please try again.");
			}
		}
	};

	return (
		<Container fluid className="books-container">
			{/* search bar */}
			<InputGroup className="search-bar">
				<InputGroup.Text id="search-prompt">Search</InputGroup.Text>
				<Form.Control
					type="text"
					placeholder="Search by title or author"
					aria-label="Search"
					aria-describedby="basic-addon1"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</InputGroup>

			<Row>
				{filteredBooks.map((book) => (
					<Col
						key={book._id}
						xs={12}
						sm={6}
						md={4}
						className="book-card"
					>
						<BookCard
							book={book}
							handleEdit={handleEdit}
							handleDeleteClick={handleDeleteClick}
							formatTitleForUrl={formatTitleForUrl}
						/>
					</Col>
				))}
			</Row>

			<Modal
				show={showDeleteModal}
				onHide={() => setShowDeleteModal(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Deletion</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete "{bookToDelete?.title}"?
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => setShowDeleteModal(false)}
					>
						Cancel
					</Button>
					<Button variant="danger" onClick={confirmDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default View;
