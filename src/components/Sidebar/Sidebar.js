import React, { useState } from "react";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import styles from "./Sidebar.module.css";
import { SidebarData } from "../../utils";
const Sidebar = () => {
  const [expandSidebar, setExpandSidebar] = useState(true);
  const [selected, setSelected] = useState(0);

  const handleSelect = (index) => {
    setSelected(index);
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <BubbleChartIcon sx={{ width: "40px", color: "orange" }} />
        <span>
          Apex<span>P</span>ro
        </span>
      </div>
      <div className={styles.navbar}>
        {SidebarData.map((ele, index) => (
          <div
            className={
              selected === index ? `${styles.active}` : `${styles.navitem}`
            }
            onClick={() => handleSelect(index)}
          >
            <div className={styles.icon}>{ele.icon}</div>
            <div className={styles.name}>{ele.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
