import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deletePoll } from "../../../API/poll-api";
import { UserContext } from "../../../Context/UserContextProvider";

export const PollItem = ({ poll }) => {
  const { user, setUser } = React.useContext(UserContext);

  const [itemState, setItemState] = useState({
    showMenu: false,
    deleting: false,
  });

  const date = new Date(poll.createdAt);
  const createdAt = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  const handleDeletePoll = (pollId) => {
    setItemState({ ...itemState, deleting: true });
    deletePoll(pollId)
      .then(() => {
        setItemState({ ...itemState, deleting: false });
        //dispatch({ type: "DELETE_POLL", payload: pollId });
        setUser({
          ...user,
          polls: user.polls.filter((p) => p._id !== poll._id),
        });
      })
      .catch(() => {
        setItemState({ ...itemState, deleting: false });
        alert("Error while deleting poll");
      });
  };

  if (!poll?.options) {
    return null;
  }

  return (
    <article>
      <div className="content">
        <ul>
          <li>
            <Link target={"_blank"} to={`/vote/${poll._id}`}>
              {poll.title}{" "}
            </Link>
          </li>
        </ul>
        <ul>
          <li>{poll.views}</li>
          <li>{poll.options.reduce((acc, curr) => acc + curr.votes, 0)}</li>
          <li>{createdAt}</li>
          <li>
            {itemState.deleting ? (
              "..."
            ) : (
              <button onClick={(e) => handleDeletePoll(poll._id)}>
                <span className="fa fa-trash"></span>
              </button>
            )}
          </li>
          <li>
            <button
              onClick={() =>
                setItemState({ ...itemState, showMenu: !itemState.showMenu })
              }
            >
              <span
                className={`fas fa-angle-${
                  itemState.showMenu ? "down" : "left"
                }`}
              ></span>
            </button>
          </li>
        </ul>
      </div>
      {itemState.showMenu && (
        <section>
          {poll.options.map((op) => (
            <li key={op._id}>
              [{op.votes} votes] {op.text}
            </li>
          ))}
        </section>
      )}
    </article>
  );
};
