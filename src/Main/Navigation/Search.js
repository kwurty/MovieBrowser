
import React from "react";
import "./Search.css"

const Search = ({ onClick }) => (
  <div className="search-button">
    <button onClick={onClick}>Search</button>
  </div>
)

export default Search;