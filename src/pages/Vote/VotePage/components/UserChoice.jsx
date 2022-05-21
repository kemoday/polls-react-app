import React from "react";

export const UserChoice = ({ choice, index }) => {
  return (
    <div>
      <input
        type="radio"
        id={"Choice" + index}
        name="choice"
        value={choice.text}
        required
      />
      <label htmlFor={"Choice" + index}>{choice.text}</label>
    </div>
  );
};
