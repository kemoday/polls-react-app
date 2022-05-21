import React from "react";
import { Link } from "react-router-dom";
import "./styles/main.css";

export const Logo = ({ animate = false }) => {
  return (
    <Link to="/" className="logo">
      <div className="wrapper">
        <div className={animate ? "col-ani" : "col"}></div>
        <div className={animate ? "col-ani" : "col"}></div>
        <div className={animate ? "col-ani" : "col"}></div>
      </div>
    </Link>
  );
};
