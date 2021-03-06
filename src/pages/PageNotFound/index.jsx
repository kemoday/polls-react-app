import React from "react";
import { Link } from "react-router-dom";
import "./styles/main.css";

export const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="wrapper">
        <div className="not-found-hero">
          <h1>404</h1>
        </div>
        <div className="not-found-text">
          <h1>
            OOPS! PAGE
            <br />
            NOT FOUND
          </h1>
          <p>we are sorry the page you requested cannot be found.</p>
          <Link
            className="mt-4 block text-center bg-[#15b4a6] hover:bg-[#283e47] text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-500"
            to="/"
          >
            GO TO HOME PAGE
          </Link>
        </div>
      </div>
    </div>
  );
};
