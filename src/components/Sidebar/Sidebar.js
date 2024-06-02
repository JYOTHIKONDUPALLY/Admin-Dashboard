import React, { useState } from "react";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { SidebarData } from "../../utils";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom"; // Correct import

const Sidebar = ({ onLogout, isDarkMode, setIsDarkMode }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate(); // Use the hook

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSelect = (index, name) => {
    setSelected(index);
    if (name === "SignOut") {
      onLogout();
    }
    if (name === "Inventory") {
      navigate("/inventory"); // Use navigate function
    }
  };

  return (
    <>
      {isSmallScreen ? (
        <>
          <IconButton
            onClick={handleToggleDrawer}
            sx={{
              position: "absolute",
              top: "30px",
              left: "30px",
              zIndex: theme.zIndex.appBar + 1,
              fontSize: "2rem",
              padding: "12px",
              color:
                theme.palette.mode === "light"
                  ? theme.palette.primary.main
                  : theme.palette.background.default,
            }}
          >
            {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Drawer
            anchor="left"
            open={isOpen}
            onClose={handleToggleDrawer}
            variant="temporary"
            sx={{
              ".MuiDrawer-paper": {
                width: 250,
              },
            }}
          >
            <SidebarContent
              isDarkMode={isDarkMode}
              theme={theme}
              handleToggleDarkMode={handleToggleDarkMode}
              handleSelect={handleSelect}
              selected={selected}
            />
          </Drawer>
        </>
      ) : (
        <Box
          className={styles.sidebar}
          sx={{
            backgroundColor: theme.palette.background.paper,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: theme.spacing(2),
            position: "relative",
          }}
        >
          <SidebarContent
            isDarkMode={isDarkMode}
            theme={theme}
            handleToggleDarkMode={handleToggleDarkMode}
            handleSelect={handleSelect}
            selected={selected}
          />
        </Box>
      )}
    </>
  );
};

const SidebarContent = ({
  isDarkMode,
  theme,
  handleToggleDarkMode,
  handleSelect,
  selected,
}) => {
  return (
    <>
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
            className={styles.navitem}
            sx={{
              gap: 0,
              "&:hover, &.Mui-selected": {
                backgroundColor: theme.palette.action.hover,
                display: "flex",
                alignItems: "center",
                margin: "5px",
                fontSize: "14px",
                borderTopRightRadius: "0.7rem",
                borderBottomRightRadius: "0.7rem",
                transition: "all 300ms ease",
                position: "relative",
                background: "var(--activeItem)",
                marginLeft: 0,
                color: "var(--active-text)",
              },
            }}
            selected={selected === index}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{ele.icon}</ListItemIcon>
            <ListItemText primary={ele.name} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
