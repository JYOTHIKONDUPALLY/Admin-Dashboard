import React from "react";
import styles from "./MainPage.module.css";
import Cards from "./Cards/Cards";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/system";

function MainPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen =
    useMediaQuery(theme.breakpoints.down("md")) && !isSmallScreen;

  const weeklyReport = [
    { day: "Monday", sales: 100, stock: 500, pendingPayments: 20, profit: 300 },
    {
      day: "Tuesday",
      sales: 120,
      stock: 550,
      pendingPayments: 25,
      profit: 320,
    },
    {
      day: "Wednesday",
      sales: 130,
      stock: 560,
      pendingPayments: 30,
      profit: 340,
    },
    {
      day: "Thursday",
      sales: 110,
      stock: 520,
      pendingPayments: 15,
      profit: 310,
    },
    { day: "Friday", sales: 140, stock: 570, pendingPayments: 18, profit: 350 },
    {
      day: "Saturday",
      sales: 150,
      stock: 580,
      pendingPayments: 22,
      profit: 360,
    },
    { day: "Sunday", sales: 160, stock: 590, pendingPayments: 24, profit: 370 },
  ];

  return (
    <div className={styles.mainpage}>
      <div>
        <h1>Dashboard</h1>
        <p>
          Welcome back, Your progress this week is Awesome.let's keep it up.
        </p>
      </div>
      <Cards />
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Weekly Report
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                    }}
                  >
                    Day
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                    }}
                  >
                    Sales
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                    }}
                  >
                    Stock in Inventory
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                    }}
                  >
                    No. of Pending Payments
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: "#fff",
                    }}
                  >
                    Profit
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {weeklyReport.map((report) => (
                  <TableRow key={report.day}>
                    <TableCell>{report.day}</TableCell>
                    <TableCell>{report.sales}</TableCell>
                    <TableCell>{report.stock}</TableCell>
                    <TableCell>{report.pendingPayments}</TableCell>
                    <TableCell>{report.profit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default MainPage;
