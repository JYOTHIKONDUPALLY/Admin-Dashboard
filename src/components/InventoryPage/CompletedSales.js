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
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";

const CompletedSales = ({ data }) => {
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
            <TableCell>Customer</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Invoice No</TableCell>
            <TableCell>Invoice Date</TableCell>
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
              <TableCell>{row.invoice_no}</TableCell>
              <TableCell>{row.invoice_date}</TableCell>
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
