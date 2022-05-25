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
      <Link
        style={{ flex: 1 }}
        className="bg-[#15b4a6] text-center hover:bg-[#283e47] text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-500"
        to="/polls/add"
      >
        Add Poll
      </Link>
    </div>
  );
};
