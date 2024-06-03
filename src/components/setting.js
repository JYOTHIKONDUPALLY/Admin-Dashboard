import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Slider,
  Switch,
  FormGroup,
  FormControlLabel,
  Paper,
  Tabs,
  Tab,
  AppBar,
} from "@mui/material";

const SettingsPage = () => {
  const [tab, setTab] = useState(0);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [customization, setCustomization] = useState({
    brightness: 100,
    fontSize: 14,
    darkMode: false,
  });

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleUserDetailChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleCustomizationChange = (e, newValue) => {
    const { name } = e.target;
    if (name === "darkMode") {
      setCustomization({ ...customization, darkMode: e.target.checked });
    } else {
      setCustomization({ ...customization, [name]: newValue });
    }
  };

  const handleSave = () => {
    // Logic to save settings, e.g., sending data to backend
    console.log("User Details:", userDetails);
    console.log("Customization:", customization);
    alert("Settings saved successfully.");
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <AppBar position="static">
        <Tabs value={tab} onChange={handleTabChange} aria-label="settings tabs">
          <Tab label="User Details" />
          <Tab label="Customization" />
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <Paper sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h6">User Details</Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={userDetails.name}
              onChange={handleUserDetailChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Email"
              name="email"
              value={userDetails.email}
              onChange={handleUserDetailChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel htmlFor="role-select">Role</InputLabel>
            <Select
              id="role-select"
              name="role"
              value={userDetails.role}
              onChange={handleUserDetailChange}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
              <MenuItem value="Viewer">Viewer</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Paper>
      )}
      {tab === 1 && (
        <Paper sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h6">Customization</Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Typography gutterBottom>Brightness</Typography>
            <Slider
              name="brightness"
              value={customization.brightness}
              onChange={handleCustomizationChange}
              aria-labelledby="brightness-slider"
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <Typography gutterBottom>Font Size</Typography>
            <Slider
              name="fontSize"
              value={customization.fontSize}
              onChange={handleCustomizationChange}
              aria-labelledby="font-size-slider"
              valueLabelDisplay="auto"
              min={10}
              max={30}
            />
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  name="darkMode"
                  checked={customization.darkMode}
                  onChange={handleCustomizationChange}
                />
              }
              label="Dark Mode"
            />
          </FormGroup>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default SettingsPage;
