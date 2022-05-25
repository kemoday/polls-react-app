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
          className="bg-[#15b4a6] px-4 hover:bg-[#283e47] text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-500"
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
