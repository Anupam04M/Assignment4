import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { useCart, type Product } from "../context/CartContext";

const DUMMY_PRODUCTS: Product[] = [
  { id: 1, name: "Wireless Headphones", price: 99.99 },
  { id: 2, name: "Mechanical Keyboard", price: 129.5 },
  { id: 3, name: "Gaming Mouse", price: 59.99 },
  { id: 4, name: "4K Monitor", price: 399.0 },
];

const ProductList: React.FC = () => {
  const { dispatch } = useCart();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      
      {/* Grid properties moved inside sx={{}} to resolve 
        the TypeScript Overload error 
      */}
      <Box 
        sx={{
          display: "grid",
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(4, 1fr)' 
          },
          gap: 3
        }}
      >
        {DUMMY_PRODUCTS.map((product) => (
          <Box key={product.id}>
            <Card 
              sx={{ 
                height: "100%", 
                display: "flex", 
                flexDirection: "column" 
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="text.secondary">
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    dispatch({ type: "ADD_ITEM", payload: product })
                  }
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ProductList;