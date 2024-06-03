import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Modal,
  TextField,
  IconButton,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ActiveSales from "./ActiveSales";
import CompletedSales from "./CompletedSales";
import axios from "axios";
import ProductList from "./ProductsList";

const InventoryPage = () => {
  const [selectedTab, setSelectedTab] = useState("active");
  const [openModal, setOpenModal] = useState(false);
  const [activeSales, setActiveSales] = useState([]);
  const [paid, setPaid] = useState("unPaid");
  const [completedSales, setCompletedSales] = useState([]);
  const [newSale, setNewSale] = useState({
    customerId: "",
    skuId: "",
    price: "",
    quantity: "",
    invoiceNo: "",
    invoiceDate: "",
  });
  const [editingSale, setEditingSale] = useState(null);

  const fetchActiveSalesData = async () => {
    const response = await axios.get(
      "https://mocki.io/v1/4d314b64-4cd2-4ea6-8964-8419ed143ebf"
    );
    setActiveSales(response.data);
  };

  const fetchCompletedSalesData = async () => {
    const response = await axios.get(
      "https://mocki.io/v1/2a43105f-e7ef-4672-bf41-56002cfff1b6"
    );
    setCompletedSales(response.data);
  };
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingSale(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSale({ ...newSale, [name]: value });
  };

  const handlePaymentChange = (e) => {
    setPaid(e.target.value);
  };

  const handleSubmitNewSale = () => {
    const newId = activeSales.length + completedSales.length + 1;
    const newSaleEntry = {
      id: newId,
      customer: {
        name: `Customer ${newSale.customerId}`,
        email: "new@example.com",
        location_name: "New City",
        type: "C",
      },
      items: [
        {
          sku_id: newSale.skuId,
          name: `Product ${newSale.skuId}`,
          price: newSale.price,
          quantity: newSale.quantity,
        },
      ],
      totalPrice: newSale.price * newSale.quantity,
      lastModified: new Date().toISOString().split("T")[0],
      paid: paid === "paid", // Set paid status based on selected option
    };
    setActiveSales([...activeSales, newSaleEntry]);
    handleCloseModal();
  };

  const handleEditSale = (sale) => {
    setEditingSale(sale);
    setNewSale({
      customerId: sale.customer.name.split(" ")[1],
      skuId: sale.items[0].sku_id,
      price: sale.items[0].price,
      quantity: sale.items[0].quantity,
      invoiceNo: sale.invoice_no || "",
      invoiceDate: sale.invoice_date || sale.lastModified,
    });
    setPaid(sale.paid ? "paid" : "unpaid"); // Set paid status based on editing sale
    handleOpenModal();
  };

  const handleUpdateSale = () => {
    const updatedSales = activeSales.map((sale) =>
      sale.id === editingSale.id
        ? {
            ...editingSale,
            customer: {
              ...editingSale.customer,
              name: `Customer ${newSale.customerId}`,
            },
            items: [
              {
                ...editingSale.items[0],
                sku_id: newSale.skuId,
                price: newSale.price,
                quantity: newSale.quantity,
              },
            ],
            totalPrice: newSale.price * newSale.quantity,
            lastModified: newSale.invoiceDate,
            paid: paid === "paid", // Set paid status based on selected option
          }
        : sale
    );
    setActiveSales(updatedSales);
    handleCloseModal();
  };

  const handleCompleteSale = () => {
    const updatedActiveSales = activeSales.filter(
      (sale) => sale.id !== editingSale.id
    );
    const completedSale = {
      ...editingSale,
      customer: {
        ...editingSale.customer,
        name: `Customer ${newSale.customerId}`,
      },
      items: [
        {
          ...editingSale.items[0],
          sku_id: newSale.skuId,
          price: newSale.price,
          quantity: newSale.quantity,
        },
      ],
      totalPrice: newSale.price * newSale.quantity,
      invoice_no: newSale.invoiceNo,
      invoice_date: newSale.invoiceDate,
      paid: paid === "paid", // Set paid status based on selected option
    };
    setCompletedSales([...completedSales, completedSale]);
    setActiveSales(updatedActiveSales);
    handleCloseModal();
  };

  const handleDeleteSale = (sale) => {
    const updatedActiveSales = activeSales.filter((s) => s.id !== sale.id);
    setActiveSales(updatedActiveSales);
  };

  useEffect(() => {
    fetchActiveSalesData();
    fetchCompletedSalesData();
  }, []);

  useEffect(() => {}, [activeSales]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Inventory Management
          </Typography>
          <Button
            color="inherit"
            sx={{ marginRight: "10px" }}
            onClick={() => handleTabChange("active")}
          >
            Active Sale Orders
          </Button>
          <Button
            sx={{ marginRight: "10px" }}
            color="inherit"
            onClick={() => handleTabChange("completed")}
          >
            Completed Sale Orders
          </Button>
          <Button
            sx={{ marginRight: "10px" }}
            color="inherit"
            onClick={handleOpenModal}
          >
            New Sale Order
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        {selectedTab === "active" && (
          <ActiveSales
            data={activeSales}
            onEdit={handleEditSale}
            onComplete={handleCompleteSale}
            onDelete={handleDeleteSale}
          />
        )}
        {selectedTab === "completed" && (
          <CompletedSales data={completedSales} />
        )}
      </Box>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            {editingSale ? "Edit Sale Order" : "New Sale Order"}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Customer ID"
            name="customerId"
            value={newSale.customerId}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="SKU ID"
            name="skuId"
            value={newSale.skuId}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            value={newSale.price}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Quantity"
            name="quantity"
            value={newSale.quantity}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Invoice No"
            name="invoiceNo"
            value={newSale.invoiceNo}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Invoice Date"
            name="invoiceDate"
            value={newSale.invoiceDate}
            onChange={handleInputChange}
          />

          <RadioGroup
            value={paid}
            onChange={handlePaymentChange}
            sx={{ flexDirection: "row" }}
          >
            <FormControlLabel
              value="unpaid"
              control={<Radio />}
              label="Unpaid"
            />
            <FormControlLabel value="paid" control={<Radio />} label="Paid" />
          </RadioGroup>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            {editingSale ? (
              <>
                <Button
                  onClick={handleUpdateSale}
                  variant="contained"
                  color="primary"
                >
                  Update
                </Button>
                <Button
                  onClick={handleCompleteSale}
                  variant="contained"
                  color="secondary"
                >
                  Complete Sale
                </Button>
              </>
            ) : (
              <Button
                onClick={handleSubmitNewSale}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            )}
            <IconButton onClick={handleCloseModal} sx={{ ml: 2 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>
      <div style={{ display: "none" }}>
        <ProductList
          activeSales={activeSales}
          setActiveSales={setActiveSales}
        />
      </div>
    </Box>
  );
};

export default InventoryPage;
