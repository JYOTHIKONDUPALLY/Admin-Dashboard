import React, { useState } from "react";
import MainPage from "../MainPage/MainPage";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./HomePage.module.css";
import InventoryPage from "../InventoryPage/InventoryPage";
const HomePage = ({ onLogout, isDarkMode, setIsDarkMode }) => {
  return (
    <div className={styles.HomePage}>
      <Sidebar
        onLogout={onLogout}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <div className={styles.MainSection}>
        <MainPage />
        <InventoryPage />
      </div>
    </div>
  );
};

export default HomePage;
