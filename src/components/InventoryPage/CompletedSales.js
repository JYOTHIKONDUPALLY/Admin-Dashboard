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
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";
import { useTheme } from "@mui/system";

const CompletedSales = ({ data }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen =
    useMediaQuery(theme.breakpoints.down("md")) && !isSmallScreen;

  const handleDownloadPdf = (rowData) => {
    const pdf = new jsPDF();
    let yPos = 10;

    // Add data of the clicked row to the PDF
    pdf.text(10, yPos, `ID: ${rowData.id}`);
    yPos += 10;
    pdf.text(10, yPos, `Total Price: ${rowData.totalPrice}`);
    yPos += 10;
    pdf.text(10, yPos, `Invoice No: ${rowData.invoice_no}`);
    yPos += 10;
    pdf.text(10, yPos, `Invoice Date: ${rowData.invoice_date}`);
    yPos += 10;

    // Add customer data
    pdf.text(10, yPos, `Customer:`);
    yPos += 10;
    Object.keys(rowData.customer).forEach((key) => {
      pdf.text(20, yPos, `${key}: ${rowData.customer[key]}`);
      yPos += 10;
    });
    yPos += 5; // Add some space between sections

    // Add items data
    pdf.text(10, yPos, `Items:`);
    yPos += 10;
    rowData.items.forEach((item, index) => {
      pdf.text(20, yPos, `Item ${index + 1}:`);
      yPos += 10;
      Object.keys(item).forEach((key) => {
        pdf.text(30, yPos, `${key}: ${item[key]}`);
        yPos += 10;
      });
      yPos += 5; // Add some space between items
    });

    // Save the PDF with a unique name
    pdf.save(`completed-sale-${rowData.id}.pdf`);
  };

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
            {!isSmallScreen && <TableCell>Invoice No</TableCell>}
            {!isSmallScreen && <TableCell>Invoice Date</TableCell>}
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
              {!isSmallScreen && <TableCell>{row.invoice_no}</TableCell>}
              {!isSmallScreen && <TableCell>{row.invoice_date}</TableCell>}
              <TableCell>
                <IconButton onClick={() => handleDownloadPdf(row)}>
                  <DownloadIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompletedSales;
