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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const ActiveSales = ({ data, onEdit, onComplete, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Last Modified</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                <Tooltip
                  title={`${row.customer.location_name} (${row.customer.type})`}
                >
                  <span>{row.customer.name}</span>
                </Tooltip>
              </TableCell>
              <TableCell>{row.customer.email}</TableCell>
              <TableCell>
                {row.items.map((item) => (
                  <div key={item.sku_id}>
                    {item.name} (SKU: {item.sku_id})
                  </div>
                ))}
              </TableCell>
              <TableCell>{row.totalPrice}</TableCell>
              <TableCell>{row.lastModified}</TableCell>
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
