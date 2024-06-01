import React from "react";
import styles from "./MainPage.module.css";
import Cards from "./Cards/Cards";
function MainPage() {
  return (
    <div className={styles.mainpage}>
      <div>
        <h1>Dashboard</h1>
        <p>
          Welcome back, Your progress this week is Awesome.let's keep it up.
        </p>
      </div>

      <Cards />
    </div>
  );
}

export default MainPage;
