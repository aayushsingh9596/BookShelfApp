import Admin from "./Admin";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowBooks from "./ShowBooks";
import ShowBook from "./ShowBook";
import { Provider } from "react-redux";
import store from "./Store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/showbooks" element={<ShowBooks />} />
            <Route path="/showbook/:isbn" element={<ShowBook />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
