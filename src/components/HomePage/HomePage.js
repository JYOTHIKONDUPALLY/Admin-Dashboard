import React from "react";
import MainPage from "../MainPage/MainPage";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./HomePage.module.css";
const HomePage = ({ onLogout, isDarkMode, setIsDarkMode }) => {
  return (
    <div className={styles.HomePage}>
      <Sidebar
        onLogout={onLogout}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <MainPage />
    </div>
  );
};

export default HomePage;
