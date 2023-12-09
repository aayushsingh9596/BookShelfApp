import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useDispatch } from "react-redux";
import { editBook, removeBook } from "./BookSlice";

const Book = (props) => {
  const dispatch = useDispatch();

  const currentBaseUrl = window.location.origin;

  const { bookName, isbn, category, rowNo, bookCount, bookCost, availability } =
    props.book;

  const [editable, setEditable] = useState(false);
  const [editedBook, setEditedBook] = useState({
    bookName,
    isbn,
    category,
    rowNo,
    bookCount,
    bookCost,
    availability,
  });

  const handleDownloadQR = () => {
    const canvas = document.getElementById(`qrcode-${isbn}`);
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `qrcode-${isbn}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    dispatch(editBook({isbn,editedBook}));
    setEditable(false);

  };

  const handleCancel = () => {
    setEditedBook({
      bookName,
      isbn,
      category,
      rowNo,
      bookCount,
      bookCost,
      availability,
    });

    setEditable(false);
  };

  const handleDelete = () => {
    dispatch(removeBook(isbn));
  };

  const handleFieldChange = (field, value) => {
    setEditedBook((prevBook) => ({
      ...prevBook,
      [field]: value,
    }));
  };

  return (
    <div>
      <h2>{editable ? "Edit Book" : bookName}</h2>
      <p>
        ISBN: <span>{isbn}</span>
      </p>
      <p>
        Book Name:{" "}
        {editable ? (
          <input
            type="text"
            value={editedBook.bookName}
            onChange={(e) => handleFieldChange("bookName", e.target.value)}
          />
        ) : (
          bookName
        )}
      </p>
      <p>
        Category:{" "}
        {editable ? (
          <select
            value={editedBook.category}
            onChange={(e) => handleFieldChange("category", e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        ) : (
          category
        )}
      </p>
      <p>
        Row No:{" "}
        {editable ? (
          <select
            value={editedBook.rowNo}
            onChange={(e) => handleFieldChange("rowNo", e.target.value)}
          >
            <option value="">Select Row</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        ) : (
          rowNo
        )}
      </p>
      <p>
        Book Count:{" "}
        {editable ? (
          <select
            value={editedBook.bookCount}
            onChange={(e) => handleFieldChange("bookCount", e.target.value)}
          >
            <option value="">Select Count</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        ) : (
          bookCount
        )}
      </p>
      <p>
        Book Cost:{" "}
        {editable ? (
          <input
            type="text"
            value={editedBook.bookCost}
            onChange={(e) => handleFieldChange("bookCost", e.target.value)}
          />
        ) : (
          bookCost
        )}
      </p>
      <p>
        Availability:{" "}
        {editable ? (
          <select
            value={editedBook.availability}
            onChange={(e) => handleFieldChange("availability", e.target.value)}
          >
            <option value="">Select Availability</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        ) : (
          availability
        )}
      </p>
      {editable && <button onClick={handleSave}>Save</button>}
      {editable ? (
        <button onClick={handleCancel}>Cancel</button>
      ) : (
        <>
          <QRCode
            id={`qrcode-${isbn}`}
            value={`${currentBaseUrl}/showbook/${isbn}`}
          />
          <button onClick={handleDownloadQR}>Download QR</button>
          <button onClick={()=>handleEdit(isbn)}>Edit Book</button>
          <button onClick={()=>handleDelete(isbn)}>Delete Book</button>
        </>
      )}
    </div>
  );
};

export default Book;
