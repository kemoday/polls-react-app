import React from "react";
import "./styles/main.css";

export const PublishButton = ({ loadding }) => {
  return (
    <button id="publish" className="w-full" type="submit" disabled={loadding}>
      {loadding ? (
        "Loadding..."
      ) : (
        <>
          <li className="fa fa-location-arrow"></li>Publish
        </>
      )}
    </button>
  );
};
