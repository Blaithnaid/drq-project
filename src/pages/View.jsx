import React from "react";
import { Form, Button, Container } from "react-bootstrap";
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
				setMovies(response.data.books);
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
		</Container>
	);
};

export default View;
