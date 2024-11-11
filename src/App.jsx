import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Add from "./pages/add";
import View from "./pages/view";

import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<Router>
			<Navbar bg="light" expand="lg">
				<Container fluid>
					<Navbar.Brand>Book Manager</Navbar.Brand>
					<Navbar id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/view">View</Nav.Link>
							<Nav.Link href="/add">Add</Nav.Link>
						</Nav>
					</Navbar>
				</Container>
			</Navbar>
			<Routes>
				<Route path="/add" element={<Add />} />
				<Route path="/list" element={<View />} />
			</Routes>
		</Router>
	);
}

export default App;
