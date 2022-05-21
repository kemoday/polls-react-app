import React from "react";
import { Link } from "react-router-dom";

export const PollsSearch = ({ query, onSearchChange }) => {
  return (
    <div className="search-wrapper">
      <input
        value={query}
        onChange={onSearchChange}
        type="search"
        placeholder="Search in titles..."
        name="search"
        id="search"
      />
      <Link to="/polls/add">Add Poll</Link>
    </div>
  );
};
