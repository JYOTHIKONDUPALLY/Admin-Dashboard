import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SalesOrderForm = ({
  product,
  closeModal,
  activeSales,
  setActiveSales,
}) => {
  const [selectedSKU, setSelectedSKU] = useState(product.sku[0]);
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (parseFloat(retailPrice) < parseFloat(sellingPrice)) {
      setError(
        `Retail price ($${retailPrice}) cannot be less than the selling price ($${sellingPrice}).`
      );
      return;
    }
    if (parseInt(quantity) > selectedSKU.amount) {
      setError(
        `Quantity (${quantity}) cannot be more than available inventory (${selectedSKU.amount}).`
      );
      return;
    }

    console.log(`activeSales:${activeSales}`);
    const data = {
      customer: {
        name: customerName,
        email: customerEmail,
        location_name: customerLocation,
        type: "C", // Assuming type is always 'C'
      },
      items: [
        {
          sku_id: selectedSKU.id,
          name: selectedSKU.name,
          price: parseFloat(sellingPrice),
          quantity: parseInt(quantity),
        },
      ],
      totalPrice: parseFloat(sellingPrice) * parseInt(quantity),
      lastModified: new Date().toISOString().split("T")[0], // Current date
      paid: false,
    };

    setSellingPrice("");
    setQuantity("");
    setRetailPrice("");
    setCustomerName("");
    setCustomerEmail("");
    setCustomerLocation("");
    setError("");

    // setActiveSales([...activeSales, data]);

    alert("Order placed successfully.");
    closeModal();
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        IconButtonProps={{ edge: "start" }}
      >
        <Typography variant="subtitle1">
          Product Name: {product.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", maxWidth: 400 }}>
            <FormControl sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="sku-select">Select SKU</InputLabel>
              <Select
                value={selectedSKU.id}
                onChange={(e) =>
                  setSelectedSKU(
                    product.sku.find((sku) => sku.id === e.target.value)
                  )
                }
                inputProps={{ id: "sku-select" }}
              >
                {product.sku.map((sku) => (
                  <MenuItem key={sku.id} value={sku.id}>
                    {sku.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Selling Price"
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Retail Price"
              type="number"
              value={retailPrice}
              onChange={(e) => setRetailPrice(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Customer Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Customer Location"
              value={customerLocation}
              onChange={(e) => setCustomerLocation(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            {error && (
              <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>
            )}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default SalesOrderForm;
