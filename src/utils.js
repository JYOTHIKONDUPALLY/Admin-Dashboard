import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChecklistIcon from "@mui/icons-material/Checklist";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DvrIcon from "@mui/icons-material/Dvr";
import GppGoodIcon from "@mui/icons-material/GppGood";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import SettingsIcon from "@mui/icons-material/Settings";

export const SidebarData = [
  { name: "Home", icon: <HomeIcon /> },
  { name: "Inventory", icon: <Inventory2Icon /> },
  { name: "Products", icon: <StoreMallDirectoryIcon /> },
  { name: "SignOut", icon: <ExitToAppIcon /> },
  { name: "Settings", icon: <SettingsIcon /> },
];

export const CardsData = [
  { title: "Total Sales", number: "3452", icon: <DvrIcon /> },
  { title: "Profit", number: "82%", icon: <GppGoodIcon /> },
  { title: "Completed Orders", number: "12", icon: <ChecklistIcon /> },
];
