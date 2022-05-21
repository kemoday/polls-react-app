import React from "react";
import { PollItem } from "./PollItem";

export const PollsList = (props) => {
  console.log(props);
  return props.polls.length === 0 ? (
    <p className="mt-4">No Items</p>
  ) : (
    <div className="polls-wrapper">
      {props.polls.map((poll) => (
        <PollItem key={poll._id} poll={poll} />
      ))}
    </div>
  );
};
