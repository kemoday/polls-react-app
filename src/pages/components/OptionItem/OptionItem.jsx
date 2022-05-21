import React from "react";
import "./styles/main.css";

export const OptionItem = ({
  option,
  handleAddOption,
  handleRemoveOption,
  handleOptionChange,
}) => {
  return (
    <div className="option-item">
      <input
        autoFocus
        required
        onChange={(e) => handleOptionChange(e, option)}
        value={option.text}
        type="text"
        name="option"
        placeholder="Poll's option"
        id="option"
      />
      <div className="btns-wrapper">
        <button onClick={(e) => handleAddOption(option.id)} type="button">
          <li className="fa fa-plus"></li>
        </button>
        <button onClick={(e) => handleRemoveOption(option.id)} type="button">
          <li className="fa fa-minus"></li>
        </button>
      </div>
    </div>
  );
};
