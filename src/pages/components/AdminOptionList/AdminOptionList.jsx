import React from "react";
import { OptionItem } from "../OptionItem/OptionItem";
import "./styles/main.css";
export const AdminOptionList = ({
  handleAddOption,
  options,
  handleRemoveOption,
  handleOptionChange,
}) => {
  return (
    <div className="option">
      {options.map((option) => (
        <OptionItem
          handleAddOption={handleAddOption}
          handleRemoveOption={handleRemoveOption}
          handleOptionChange={handleOptionChange}
          key={option.id}
          option={option}
        />
      ))}
    </div>
  );
};
