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

const Sidebar = ({ isDarkMode, setIsDarkMode, selected, setSelected }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSelect = (name) => {
    setSelected(name);
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
              padding: "10px",
              border: `2px solid ${
                theme.palette.mode === "light"
                  ? theme.palette.primary.main
                  : theme.palette.primary.main
              }`,
              color:
                theme.palette.mode === "light"
                  ? theme.palette.primary.main
                  : theme.palette.primary.main,
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
            onClick={() => handleSelect(ele.name)}
            className={styles.navitem}
            sx={{
              color: "black", // Set the text color to black
              "& .MuiListItemIcon-root": {
                color: "black", // Set the icon color to black
              },
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
              "&:hover .MuiListItemIcon-root, &.Mui-selected .MuiListItemIcon-root":
                {
                  color: "black", // Ensure the icon color stays black on hover and when selected
                },
            }}
            selected={selected === ele.name}
          >
            <ListItemIcon>{ele.icon}</ListItemIcon>
            <ListItemText primary={ele.name} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
