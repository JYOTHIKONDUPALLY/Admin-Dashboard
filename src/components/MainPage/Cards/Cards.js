import React from "react";
import { CardsData } from "../../../utils";
import styles from "./Cards.module.css";
import Card from "./Card";
function Cards() {
  return (
    <div className={styles.container}>
      {CardsData.map((cardData) => (
        <Card
          title={cardData.title}
          number={cardData.number}
          icon={cardData.icon}
        />
      ))}
    </div>
  );
}

export default Cards;
