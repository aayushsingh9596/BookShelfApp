import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Book from "./Book";

const ShowBook = () => {
  const { isbn } = useParams();
  const book = useSelector((state) =>
    state.book.find((book) => book.isbn === isbn)
  );

  if (!book) {
    return <div>Book not found</div>;
  }

  return <Book book={book} />;
};

export default ShowBook;
