import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Checkbox,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SalesOrderForm from "./SalesOrderForm";

const ProductList = ({ activeSales, setActiveSales }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const [expanded, setExpanded] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProductsData = async () => {
    const response = await axios.get(
      "https://mocki.io/v1/87736287-7a3f-4159-bbba-640048305ce8"
    );
    setProducts(response.data);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleCheckboxChange = (productId) => {
    const productIndex = selectedProducts.findIndex(
      (product) => product.id === productId
    );

    if (productIndex === -1) {
      // Product not found in selectedProducts, add it
      const selectedProduct = products.find(
        (product) => product.id === productId
      );
      setSelectedProducts([...selectedProducts, selectedProduct]);
    } else {
      // Product found in selectedProducts, remove it
      const updatedProducts = [...selectedProducts];
      updatedProducts.splice(productIndex, 1);
      setSelectedProducts(updatedProducts);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts([...products]);
    }
    setSelectAll(!selectAll);
  };

  const isSelected = (productId) =>
    selectedProducts.some((product) => product.id === productId);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrder = () => {
    setOpenModal(true);
  };

  const handleSingleOrder = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    setSelectedProducts([productToAdd]);
    handleOrder();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search For Products"
          sx={{
            marginBottom: "16px",
            width: "70%",

            color: theme.palette.mode === "light" ? "black" : "white",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor:
                  theme.palette.mode === "light" ? "black" : "#FFA500",
              },
              "&:hover fieldset": {
                borderColor:
                  theme.palette.mode === "light" ? "black" : "#FFA500",
              },
              "&.Mui-focused fieldset": {
                borderColor:
                  theme.palette.mode === "light" ? "black" : "#FFA500",
              },
            },
            "& .MuiInputBase-input": {
              color: theme.palette.mode === "light" ? "black" : "white",
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.mode === "light" ? "black" : "white",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  style={{
                    color: theme.palette.mode === "light" ? "black" : "#FFA500",
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                  color="primary"
                />
              </TableCell>
              <TableCell>Name</TableCell>
              {!isSmallScreen && <TableCell>Category</TableCell>}
              {!(isSmallScreen || isMediumScreen) && (
                <>
                  <TableCell>Characteristics</TableCell>
                  <TableCell>Features</TableCell>
                </>
              )}
              {!isSmallScreen && <TableCell>Brand</TableCell>}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow
                key={product.id}
                hover
                role="checkbox"
                aria-checked={isSelected(product.id)}
                selected={isSelected(product.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                    inputProps={{ "aria-labelledby": product.name }}
                  />
                </TableCell>
                <TableCell>
                  <Accordion
                    expanded={expanded === product.id}
                    onChange={handleExpandChange(product.id)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${product.id}-content`}
                      id={`panel${product.id}-header`}
                    >
                      <Typography>{product.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Table>
                        <TableBody>
                          {product.sku.map((sku) => (
                            <TableRow key={sku.id}>
                              <TableCell>SKU ID: {sku.id}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
                </TableCell>
                {!isSmallScreen && <TableCell>{product.category}</TableCell>}
                {!(isSmallScreen || isMediumScreen) && (
                  <>
                    <TableCell>{product.characteristics}</TableCell>
                    <TableCell>{product.features}</TableCell>
                  </>
                )}
                {!isSmallScreen && <TableCell>{product.brand}</TableCell>}
                <TableCell>
                  <Button
                    onClick={() => {
                      handleSingleOrder(product.id);
                    }}
                    variant="contained"
                    color="primary"
                    disabled={selectedProducts.length > 1}
                  >
                    Set Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <Button
          onClick={handleOrder}
          variant="contained"
          color="primary"
          disabled={selectedProducts.length === 0}
        >
          Set Order (Multiple)
        </Button>
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
          <h2>Sales Form</h2>
          {selectedProducts.map((product) => (
            <SalesOrderForm
              key={product.id}
              product={product}
              closeModal={handleCloseModal}
              activeSales={activeSales}
              setActiveSales={setActiveSales}
            />
          ))}
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductList;
