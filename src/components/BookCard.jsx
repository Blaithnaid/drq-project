import React from "react";
import PropTypes from "prop-types";
import { Card, Dropdown } from "react-bootstrap";
import PlaceholderImg from "../assets/placeholder.png";

const BookCard = ({
	book,
	handleEdit,
	handleDeleteClick,
	formatTitleForUrl,
}) => (
	<Card className="d-flex align-items-center h-100">
		<div className="d-flex justify-content-between align-items-center">
			<Card.Img
				variant="top"
				src={book.cover ? book.cover : PlaceholderImg}
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
				<div>Year: {book.year}</div>
				<div>ISBN: {book.isbn}</div>
				<div>Owned: {book.owned ? "Yes" : "No"}</div>
			</Card.Text>
			<div className="d-flex justify-content-between">
				<Dropdown className="flex-grow-1">
					<Dropdown.Toggle variant="primary" id="dropdown-basic">
						Options
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item onClick={() => handleEdit(book._id)}>
							Edit
						</Dropdown.Item>
						<Dropdown.Item
							href="#"
							onClick={() => handleDeleteClick(book)}
						>
							Delete
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				{book.owned ? (
					<Dropdown className="flex-grow-1">
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							Search
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item
								href={`https://www.goodreads.com/search?q=${formatTitleForUrl(
									book.title
								)}`}
							>
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
						<Dropdown.Toggle variant="success" id="dropdown-basic">
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
);

BookCard.propTypes = {
	book: PropTypes.shape({
		cover: PropTypes.string,
		title: PropTypes.string,
		author: PropTypes.string,
		year: PropTypes.number,
		isbn: PropTypes.string,
		owned: PropTypes.bool,
		_id: PropTypes.string,
	}).isRequired,
	handleEdit: PropTypes.func.isRequired,
	handleDeleteClick: PropTypes.func.isRequired,
	formatTitleForUrl: PropTypes.func.isRequired,
};

export default BookCard;
