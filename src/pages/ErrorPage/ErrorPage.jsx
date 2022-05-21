import React from "react";
import "./styles/main.css";

export const ErrorPage = ({ fetchData }) => {
  return (
    <div className="page-error">
      <div className="wrapper">
        <i className="material-icons">cloud_off</i>
        <h2>Network Error</h2>
        <p>Network or server error</p>
        <button
          onClick={() => {
            fetchData ? fetchData() : window.location.reload();
          }}
        >
          Reload
        </button>
      </div>
    </div>
  );
};
