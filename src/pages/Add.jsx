import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Add = () => {
	return (
		<Container>
			<h1>Add a Book</h1>
			<Form>
				<Form.Group controlId="formBookTitle">
					<Form.Label>Title</Form.Label>
					<Form.Control type="text" placeholder="Enter book title" />
				</Form.Group>

				<Form.Group controlId="formBookAuthor">
					<Form.Label>Author</Form.Label>
					<Form.Control type="text" placeholder="Enter book author" />
				</Form.Group>

				<Form.Group controlId="formBookGenre">
					<Form.Label>Genre</Form.Label>
					<Form.Control type="text" placeholder="Enter book genre" />
				</Form.Group>

				<Form.Group controlId="formBookDescription">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						placeholder="Enter book description"
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default Add;
