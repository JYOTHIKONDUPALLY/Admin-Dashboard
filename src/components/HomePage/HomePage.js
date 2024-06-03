import React, { useState } from "react";
import MainPage from "../MainPage/MainPage";
import Sidebar from "../Sidebar/Sidebar";
import Settings from "../setting";
import InventoryPage from "../InventoryPage/InventoryPage";
import ProductsPage from "../InventoryPage/ProductsList";
import styles from "./HomePage.module.css";

const HomePage = ({ onLogout, isDarkMode, setIsDarkMode }) => {
  const [selected, setSelected] = useState("Home");

  const renderPage = () => {
    switch (selected) {
      case "Home":
        return <MainPage />;
      case "Inventory":
        return <InventoryPage />;
      case "Products":
        return <ProductsPage />;
      case "Settings":
        return <Settings />;
      case "SignOut":
        onLogout();
        break;
      default:
        return <MainPage />;
    }
  };

  return (
    <div className={styles.HomePage}>
      <div className={styles.left}>
        <Sidebar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <div className={styles.right}>{renderPage()}</div>
    </div>
  );
};

export default HomePage;
