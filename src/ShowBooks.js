import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./ShowBooks.css";
import Book from "./Book";

const ShowBooks = () => {
  const navigate = useNavigate();
  const books = useSelector((state) => state.book);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleSearch = () => {
    const sisbn = searchTerm.trim().toLowerCase();
    const filtered = books.filter((book) => book.isbn.toLowerCase().includes(sisbn));
    setFilteredBooks(filtered);
  };
  
  

  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Add a Book
      </button>
      <h2>All Books</h2>
      <div>
        <input
          type="text"
          placeholder="Enter ISBN"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {filteredBooks.length > 0
          ? filteredBooks.map((book, index) => (
              <div className="books" key={book.isbn}>
                <Book book={book} />
                <button
                  onClick={() => {
                    navigate(`/showbook/${book.isbn}`);
                  }}
                >
                  Show Complete Book Details
                </button>
              </div>
            ))
          : books.map((book, index) => (
            <div className="books" key={book.isbn}>
            <Book book={book} />
            <button
              onClick={() => {
                navigate(`/showbook/${book.isbn}`);
              }}
            >
              Show Complete Book Details
            </button>
          </div>
            ))}
      </ul>
    </div>
  );
};

export default ShowBooks;
