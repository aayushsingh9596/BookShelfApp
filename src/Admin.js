import React, { useState } from "react";
import "./Admin.css";
import { useDispatch } from "react-redux";
import { addBook } from "./BookSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookName, setBookName] = useState("");
  const [isbn, setISBN] = useState("");
  const [category, setCategory] = useState("");
  const [rowNo, setRowNo] = useState("");
  const [bookCount, setBookCount] = useState("");
  const [bookCost, setBookCost] = useState("");
  const [availability, setAvailability] = useState("");

  const booksToCheckIsbn = useSelector((state) => state.book);

  const handleBlur=()=>{
    const isbnexists=booksToCheckIsbn.find(bk=>bk.isbn===isbn);
    if(isbnexists){
      alert("ISBN value already exists");
      setISBN("");
    }
  }

  const handleAddBook = () => {
    if (
      bookName.trim() &&
      isbn.trim() &&
      category.trim() &&
      rowNo.trim() &&
      bookCount.trim() &&
      bookCost.trim() &&
      availability.trim()
    ) {
      dispatch(
        addBook({
          bookName: bookName,
          isbn: isbn,
          category: category,
          rowNo: rowNo,
          bookCount: bookCount,
          bookCost: bookCost,
          availability: availability,
        })
      );
      setBookName("");
      setISBN("");
      setCategory("");
      setRowNo("");
      setBookCount("");
      setBookCost("");
      setAvailability("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <form
      className="addbook"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button
        onClick={() => {
          navigate("/showbooks");
        }}
      >
        ShowAddedBooks
      </button>
      <h1>Add Book To The Shelf</h1>
      <div className="addbookcomp">
        <label>Book ISBN No.</label>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setISBN(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
      <div className="addbookcomp">
        <label>Book Name</label>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
      </div>
      <div className="addbookcomp">
        <label>Book Category</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
      <div className="addbookcomp">
        <label>Row No.</label>
        <select
          id="rowNo"
          name="rowNo"
          value={rowNo}
          onChange={(e) => setRowNo(e.target.value)}
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
      </div>
      <div className="addbookcomp">
        <label>Book Count</label>
        <select
          id="bookCount"
          name="bookCount"
          value={bookCount}
          onChange={(e) => setBookCount(e.target.value)}
        >
          <option value="">Select Count</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="addbookcomp">
        <label>Book Cost</label>
        <input
          type="text"
          value={bookCost}
          onChange={(e) => setBookCost(e.target.value)}
        />
      </div>
      <div className="addbookcomp">
        <label>Availability</label>
        <select
          id="availability"
          name="availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Select Availability</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <button onClick={handleAddBook}>Add Book To The Shelf</button>
    </form>
  );
};

export default Admin;
