import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
  name: 'book',
  initialState: [],
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    removeBook: (state, action) => {
      const isbnToRemove = action.payload;
      return state.filter(book => book.isbn !== isbnToRemove);
    },
    editBook: (state, action) => {
      const { isbn, editedBook } = action.payload;
      const bookToEdit = state.find(book => book.isbn === isbn);
      
      if (bookToEdit) {
        Object.assign(bookToEdit, editedBook);
      }
    },
  },
});

export const { addBook, removeBook, editBook } = bookSlice.actions;
export default bookSlice.reducer;
