import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/system";

const ActiveSales = ({ data, onEdit, onDelete }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen =
    useMediaQuery(theme.breakpoints.down("md")) && !isSmallScreen;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            {!isSmallScreen && <TableCell>Customer</TableCell>}
            {!isSmallScreen && !isMediumScreen && <TableCell>Email</TableCell>}
            <TableCell>Items</TableCell>
            {!isSmallScreen && !isMediumScreen && (
              <TableCell>Total Price</TableCell>
            )}
            {!isSmallScreen && <TableCell>Last Modified</TableCell>}
            <TableCell>Paid</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              {!isSmallScreen && (
                <TableCell>
                  <Tooltip
                    title={`${row.customer.location_name} (${row.customer.type})`}
                  >
                    <span>{row.customer.name}</span>
                  </Tooltip>
                </TableCell>
              )}
              {!isSmallScreen && !isMediumScreen && (
                <TableCell>{row.customer.email}</TableCell>
              )}
              <TableCell>
                {row.items.map((item) => (
                  <Box key={item.sku_id}>
                    {item.name} (SKU: {item.sku_id})
                  </Box>
                ))}
              </TableCell>
              {!isSmallScreen && !isMediumScreen && (
                <TableCell>{row.totalPrice}</TableCell>
              )}
              {!isSmallScreen && <TableCell>{row.lastModified}</TableCell>}
              <TableCell>
                {row.paid ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CheckCircleIcon color="disabled" />
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(row)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActiveSales;
