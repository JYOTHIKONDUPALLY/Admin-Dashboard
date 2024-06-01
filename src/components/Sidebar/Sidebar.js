import React, { useState } from "react";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Box,
  IconButton,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import styles from "./Sidebar.module.css";
import { SidebarData } from "../../utils";

const Sidebar = ({ onLogout, isDarkMode, setIsDarkMode }) => {
  const theme = useTheme();

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const [selected, setSelected] = useState(0);

  const handleSelect = (index, name) => {
    setSelected(index);
    if (name === "SignOut") {
      onLogout();
    }
  };

  return (
    <Box
      className={styles.sidebar}
      sx={{
        backgroundColor: theme.palette.background.paper,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
      }}
    >
      <Box
        className={styles.logo}
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: theme.spacing(4),
        }}
      >
        <BubbleChartIcon
          sx={{ width: 40, color: theme.palette.primary.main }}
        />
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.primary,
            marginLeft: theme.spacing(1),
          }}
        >
          Apex<span style={{ color: theme.palette.primary.main }}>P</span>ro
        </Typography>
      </Box>

      <IconButton
        onClick={handleToggleDarkMode}
        sx={{ marginBottom: theme.spacing(4) }}
      >
        {isDarkMode ? (
          <Brightness7Icon sx={{ color: theme.palette.primary.main }} />
        ) : (
          <Brightness4Icon sx={{ color: theme.palette.primary.main }} />
        )}
      </IconButton>

      <List className={styles.navbar} sx={{ width: "100%" }}>
        {SidebarData.map((ele, index) => (
          <ListItemButton
            key={index}
            onClick={() => handleSelect(index, ele.name)}
            className={`${styles.navitem} ${
              selected === index ? styles.active : ""
            }`}
            sx={{
              "&:hover, &.Mui-selected": {
                display: "flex",
                height: "100%",
                alignItems: "center",
                margin: "5px",
                fontSize: "14px",
                borderTopRightRadius: "0.7rem",
                borderBottomRightRadius: "0.7rem",
                transition: "all 300ms ease",
                position: "relative",
                background: "var(--orange)",
                marginLeft: 0,
                color: "var(--active-text)",
              },
            }}
          >
            <ListItemIcon className={styles.icon} sx={{ color: "inherit" }}>
              {ele.icon}
            </ListItemIcon>
            <ListItemText primary={ele.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
