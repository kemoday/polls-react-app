import React from "react";
import { Logo } from "../components/Logo/Logo";
import "./styles/main.css";

export const LoaddingPage = () => {
  return (
    <div className="loadding-page">
      <div className="loadding-wrapper">
        <Logo animate />
        <p>Loadding ...</p>
      </div>
    </div>
  );
};
