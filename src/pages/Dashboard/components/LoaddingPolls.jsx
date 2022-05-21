import React from "react";
import { Logo } from "./../../components/Logo/Logo";

const styles = {
  backgroundColor: "rgba(238, 238, 238, 0.8)",
  textAlign: "center",
  padding: "1rem",
};

export const LoaddingPolls = () => {
  return (
    <div style={styles}>
      <Logo animate />
      <p style={{ fontWeight: "bold", marginBottom: "0" }}>Loadding Polls</p>
    </div>
  );
};
