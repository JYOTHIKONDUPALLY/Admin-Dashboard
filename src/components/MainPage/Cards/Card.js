import React from "react";
import styles from "./Cards.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Card({ title, number, icon }) {
  const isPercentage = typeof number === "string" && number.endsWith("%");

  // Custom styles for the CircularProgressbar
  const customStyles = {
    path: {
      transition: "stroke-dashoffset 0.5s ease 0s",
      stroke: "#ff919d",
      strokeWidth: "12px",
    },
    text: {
      fill: "black",
      fontSize: "25px",
      fontWeight: 600,
    },
  };

  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <h2>{title}</h2>
      {isPercentage ? (
        <CircularProgressbar
          styles={customStyles}
          value={parseFloat(number)}
          text={number}
        />
      ) : (
        <div className={styles.number}>{number}</div>
      )}
    </div>
  );
}

export default Card;
