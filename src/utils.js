import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InfoIcon from "@mui/icons-material/Info";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DvrIcon from "@mui/icons-material/Dvr";
import GppGoodIcon from "@mui/icons-material/GppGood";

export const SidebarData = [
  { name: "Home", icon: <HomeIcon /> },
  { name: "Manage Account", icon: <PersonIcon /> },
  { name: "Analytics", icon: <AnalyticsIcon /> },
  { name: "SignOut", icon: <ExitToAppIcon /> },
];

export const CardsData = [
  { title: "Hours Spent", number: "34h", icon: <DvrIcon /> },
  { title: "Test Results", number: "82%", icon: <GppGoodIcon /> },
  { title: "Course Completed", number: "12", icon: <ChecklistIcon /> },
];
