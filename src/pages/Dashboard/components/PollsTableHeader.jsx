import React from "react";

export const PollsTableHeader = ({ sortBy }) => {
  return (
    <>
      <div className="all-polls">
        <p>All Your Polls</p>
      </div>
      <div className="polls-header">
        <header id="myHeader">
          <ul>
            <li style={{ fontWeight: "600" }}>Poll Name</li>
          </ul>
          <ul>
            <li>
              <button onClick={(e) => sortBy("views")}>Views</button>
            </li>
            <li>
              <button onClick={(e) => sortBy("votes")}>Votes</button>
            </li>
            <li>
              <button onClick={(e) => sortBy("date")}>Date</button>
            </li>
            <li>
              <button disabled>Action</button>
            </li>
            <li>
              <button disabled>Expand</button>{" "}
            </li>
          </ul>
        </header>
      </div>
    </>
  );
};
