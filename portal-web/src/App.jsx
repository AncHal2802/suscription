import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Politics from "./routes/Politics";
import Entertainment from "./routes/Entertainment";
import Buisness from "./routes/Buisness";
import Sports from "./routes/Sports";
import TopHeadings from "./routes/TopHeadings";
import Login from "./components/login";
import SearchBar from "./components/SearchBar";
import Footer from "./components/footer";
import Register from "./components/register";
import ForgotPassword from "./components/forgortpassword";
import ResetPassword from "./components/reset_password";

function App() {
  const [user, setLoginUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Fetch search results and update the state
    // Example: You can use axios to fetch data from your API
    // axios.get(`your_api_url?q=${query}`).then(response => setSearchResults(response.data));
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/top-heading"
          element={<TopHeadings searchResults={searchResults} />}
        />
        <Route path="/politics" element={<Politics />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/buisness" element={<Buisness />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgortpassword" element={<ForgotPassword />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
