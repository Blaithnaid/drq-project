// imports
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Add.css";

const Add = () => {
	return (
		<Container>
			<br />
			<h1>Add a Book</h1>
			<Form>
				<Form.Group controlId="formBookTitle">
					<Form.Label>Title</Form.Label>
					<Form.Control type="text" placeholder="Enter book title" />
				</Form.Group>
				<br />
				<Form.Group controlId="formBookAuthor">
					<Form.Label>Author</Form.Label>
					<Form.Control type="text" placeholder="Enter book author" />
				</Form.Group>
				<br />
				<Form.Group controlId="formBookGenre">
					<Form.Label>Genre</Form.Label>
					<Form.Control type="text" placeholder="Enter book genre" />
				</Form.Group>
				<br />
				<Form.Group controlId="formBookDescription">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						placeholder="Enter book description"
					/>
				</Form.Group>
				<br />
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default Add;
