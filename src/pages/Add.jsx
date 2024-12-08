import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Add.css";

// check if the cover we got from the API is a valid image
const isValidCoverImage = async (url) => {
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => {
			// check if image is larger than 1x1
			resolve(img.width > 1 && img.height > 1);
		};
		img.onerror = () => {
			resolve(false);
		};
		img.src = url;
	});
};

// function to fetch book metadata from open library API using title, or title and author
const fetchBookInfo = async (title, formAuthor) => {
	try {
		// use formAuthor in URL if provided
		const searchUrl = formAuthor
			? `https://openlibrary.org/search.json?title=${encodeURIComponent(
					title
			  )}&author=${encodeURIComponent(formAuthor)}`
			: `https://openlibrary.org/search.json?title=${encodeURIComponent(
					title
			  )}`;

		const response = await axios.get(searchUrl);

		// check if we have a valid response and book data
		if (response.data.docs && response.data.docs.length > 0) {
			const book = response.data.docs[0];
			// use provided author or get from API
			const finalAuthor =
				formAuthor || (book.author_name ? book.author_name[0] : null);
			const isbn = book.isbn ? book.isbn[0] : null;
			const year = book.publish_year ? book.publish_year[0] : null;

			// check if we have an ISBN to get a cover image
			if (isbn) {
				// if we have one, get the cover image URL
				const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}.jpg`;
				// check if the cover image is valid
				const isValidCover = await isValidCoverImage(coverUrl);
				console.log("isValidCover: ", isValidCover);

				return {
					coverUrl: isValidCover ? coverUrl : null,
					isbn,
					year,
					finalAuthor,
				};
			}
		}
		return { coverUrl: null, isbn: null, year: null, finalAuthor: null };
	} catch (error) {
		console.error("Error fetching book cover:", error);
		return { coverUrl: null, isbn: null, year: null, finalAuthor: null };
	}
};

const Add = () => {
	// add state variables for form fields, loading state, and success message
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [owned, setOwned] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [isAdding, setIsAdding] = useState(false);

	useEffect(() => {
		const handleBeforeUnload = (e) => {
			if (isAdding) {
				e.preventDefault();
				e.returnValue = "";
			}
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () =>
			window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [isAdding]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// set loading state and hide success message
		setIsLoading(true);
		setShowSuccess(false);
		setIsAdding(true);

		try {
			const { coverUrl, isbn, year, finalAuthor } = await fetchBookInfo(
				title,
				author
			);

			// use entered author if available, otherwise use API author
			const bookAuthor = author || finalAuthor;

			console.log(
				`Title: ${title}, Author: ${bookAuthor}, Year: ${year}, ISBN: ${isbn}, Owned: ${owned}, Cover: ${coverUrl}`
			);

			// create book object with form data
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
				.then((res) => {
					console.log("Book added successfully:", res.data);
					setShowSuccess(true);
					setTitle("");
					setAuthor("");
					setOwned(true);
				})
				.catch((err) => console.error("Error adding book:", err));
		} catch (error) {
			console.error("Error adding book:", error);
		} finally {
			setIsLoading(false);
			setIsAdding(false);
		}
	};

	return (
		<Container>
			{showSuccess && (
				<Alert
					variant="success"
					onClose={() => setShowSuccess(false)}
					dismissible
				>
					Book successfully added!
				</Alert>
			)}
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
				<Form.Group style={{ marginBottom: "20px" }}>
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
				<Button variant="primary" type="submit" disabled={isLoading}>
					{isLoading ? "Adding Book..." : "Add Book"}
				</Button>
			</Form>
		</Container>
	);
};

export default Add;
