import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
  Grid,
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
      <Grid container spacing={3}>
        {DUMMY_PRODUCTS.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card>
              <CardContent>
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
